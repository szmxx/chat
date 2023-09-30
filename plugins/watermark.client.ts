/*
 * @Author: cola
 * @Date: 2023-07-31 14:59:51
 * @LastEditors: cola
 * @Description:
 */
import { Watermark } from 'watermark-js-plus'

export default defineNuxtPlugin(() => {
  const color = useColorMode()
  const fontColor = ref('#000')

  const options = {
    content: ' ',
    width: 250,
    height: 400,
    fontColor: fontColor.value,
    globalAlpha: 0.1,
    parent: '.chat-container',
  }
  const watermark = new Watermark(options)
  watermark.create()
  return {
    provide: {
      watermark: (value: string, type = 'content') => {
        if (color.preference === 'dark') fontColor.value = '#fff'
        else fontColor.value = '#000'
        const opt: Record<string, string> = {}
        if (type === 'content') opt.content = value
        watermark?.changeOptions?.(
          {
            ...options,
            ...opt,
            fontColor: fontColor.value,
          },
          type === 'content' ? 'append' : 'overwrite',
        )
      },
    },
  }
})
