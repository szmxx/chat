import path from 'node:path'
import fs from 'node:fs'
import module from 'node:module'
import { EventType } from '@rrweb/types'
import type { eventWithTime } from '@rrweb/types'
import type { RRwebPlayerOptions } from 'rrweb-player'
import { chromium } from 'playwright'
import type { H3Event } from 'h3'

const p = module.createRequire(import.meta.url).resolve('rrweb-player')
const rrwebScriptPath = path.resolve(p, '../../dist/index.js')
const rrwebStylePath = path.resolve(rrwebScriptPath, '../style.css')
const rrwebRaw = fs.readFileSync(rrwebScriptPath, 'utf-8')
const rrwebStyle = fs.readFileSync(rrwebStylePath, 'utf-8')

const MaxScaleValue = 2.5
const defaultConfig: RRvideoConfig = {
  headless: true,
  resolutionRatio: 0.8,
  onProgressUpdate: (num: number) => {
    //
  },
  rrwebPlayer: {
    mouseTail: false,
    insertStyleRules: [
      `.rr-block {
          display: none !important
        }`,
    ],
  },
  events: [],
}
export function exportVideo(event: H3Event, events: eventWithTime[]) {
  return transformToVideo(event, {
    events,
  })
}
interface RRvideoConfig {
  headless?: boolean
  // A number between 0 and 1. The higher the value, the better the quality of the video.
  resolutionRatio?: number
  // A callback function that will be called when the progress of the replay is updated.
  onProgressUpdate?: (percent: number) => void
  rrwebPlayer?: Omit<RRwebPlayerOptions['props'], 'events'>
  events: eventWithTime[]
}

function getHtml(events: Array<eventWithTime>, config?: RRvideoConfig): string {
  return `
<html>
  <head>
  <style>${rrwebStyle}</style>
  <style>
    html, body {padding: 0; border: none; margin: 0;}
    .replayer-mouse {
      display: none;
    }
  </style>
  </head>
  <body>
    <script>
      ${rrwebRaw};
      /*<!--*/
      const events = ${JSON.stringify(events).replace(
        /<\/script>/g,
        '<\\/script>',
      )};
      /*-->*/
      const userConfig = ${JSON.stringify(config?.rrwebPlayer || {})};
      window.replayer = new rrwebPlayer({
        target: document.body,
        width: userConfig.width,
        height: userConfig.height,
        props: {
          ...userConfig,
          events,
          showController: false,
        },
      });
      window.replayer.addEventListener('finish', () => window.onReplayFinish());
      window.replayer.addEventListener('ui-update-progress', (payload)=> window.onReplayProgressUpdate
      (payload));
      window.replayer.addEventListener('resize',()=>document.querySelector('.replayer-wrapper').style.transform = 'scale(${
        (config?.resolutionRatio ?? 1) * MaxScaleValue
      }) translate(-50%, -50%)');
    </script>
  </body>
</html>
`
}

function getMaxViewport(events: eventWithTime[]) {
  let maxWidth = 0
  let maxHeight = 0
  events?.forEach?.((event) => {
    if (event.type !== EventType.Meta) return
    if (event.data.width > maxWidth) maxWidth = event.data.width
    if (event.data.height > maxHeight) maxHeight = event.data.height
  })
  return {
    width: maxWidth,
    height: maxHeight,
  }
}

export async function transformToVideo(event: H3Event, options: RRvideoConfig) {
  const defaultVideoDir = 'public/videos'
  const config = { ...defaultConfig }
  Object.assign(config, options)
  if (config.resolutionRatio! > 1) config.resolutionRatio = 1 // The max value is 1.

  const events = options.events || []

  // Make the browser viewport fit the player size.
  const maxViewport = getMaxViewport(events)
  // Use the scaling method to improve the video quality.
  const scaledViewport = {
    width: Math.round(
      maxViewport.width * (config.resolutionRatio ?? 1) * MaxScaleValue,
    ),
    height: Math.round(
      maxViewport.height * (config.resolutionRatio ?? 1) * MaxScaleValue,
    ),
  }
  Object.assign(config?.rrwebPlayer || {}, scaledViewport)
  const browser = await chromium.launch({
    headless: config.headless,
  })
  const context = await browser.newContext({
    viewport: scaledViewport,
    recordVideo: {
      dir: defaultVideoDir,
      size: scaledViewport,
    },
  })
  const page = await context.newPage()
  await page.goto('about:blank')
  await page.exposeFunction(
    'onReplayProgressUpdate',
    (data: { payload: number }) => {
      config?.onProgressUpdate?.(data?.payload)
    },
  )
  await new Promise<void>((resolve) =>
    page
      .exposeFunction('onReplayFinish', () => resolve())
      .then(() => page.setContent(getHtml(events, config))),
  )
  const videoPath = (await page.video()?.path()) || ''
  await context.close()
  const stream = fs.createReadStream(videoPath)
  return sendStream(event, stream)
}

export function download(event: H3Event, path: string) {
  const stream = fs.createReadStream(path)
  return sendStream(event, stream)
}
