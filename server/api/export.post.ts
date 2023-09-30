import { exportVideo } from '~/server/utils/export'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await exportVideo(event, body?.events)
})
