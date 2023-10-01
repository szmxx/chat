import workerUrl from 'modern-screenshot/worker?url'
import { createContext, destroyContext, domToPng } from 'modern-screenshot'
import dayjs from 'dayjs'
import { WEEK_MAP } from '~/config'
export async function exportImage(dom: HTMLElement, filename = '') {
  const res = await screenshot(dom)
  downloadUtil(res, filename)
}
export async function screenshot(dom: HTMLElement) {
  const context = await createContext(dom, {
    workerUrl: workerUrl as any,
    workerNumber: 1,
  })
  const url = await domToPng(dom, {
    scale: 2,
    height: dom.scrollHeight,
  })
  destroyContext(context)
  return url
}

export function downloadUtil(blobUrl: string, downloadName?: string) {
  const a = document.createElement('a')
  a.download = downloadName!
  a.href = blobUrl
  a.target = '_blank'
  a.click()
  URL.revokeObjectURL(blobUrl)
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function isWechat() {
  return /MicroMessenger/i.test(window.navigator.userAgent)
}

export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
}

function getTime(time: number) {
  const now = dayjs()
  const targetTime = dayjs(time)
  const daysDiff = now.diff(targetTime, 'day')
  if (daysDiff === 0) {
    return `${targetTime.format('HH:mm')}`
  } else if (daysDiff === 1) {
    return `昨天 ${targetTime.format('HH:mm')}`
  } else {
    const week = new Date(+time).getDay()
    return `星期${WEEK_MAP[week as keyof typeof WEEK_MAP]} ${targetTime.format(
      'HH:mm',
    )}`
  }
}

export function formatTime(currentDate: string[]) {
  const date = new Date()
  date.setDate(parseInt(currentDate?.[0]))
  date.setHours(parseInt(currentDate[1]))
  date.setMinutes(parseInt(currentDate[2]))
  const time = getTime(date.getTime())
  return time
}
