import * as rrweb from 'rrweb'
import type { eventWithTime } from '@rrweb/types'

export class ScreenRecorder {
  static events: eventWithTime[] = []
  static isRecording: boolean
  static stopHandler: () => void
  constructor() {}

  static toggle() {
    if (this.isRecording) this.stop()
    else this.start()
  }

  static start() {
    if (!this.isRecording) {
      this.isRecording = true
      const stop = rrweb.record({
        emit: (event: eventWithTime) => {
          this.events.push(event)
        },
        blockClass: 'rr-block',
      })
      const handler = () => {
        this.isRecording = false
        stop?.()
      }

      this.stopHandler = handler
      return handler
    }
    return () => {}
  }

  static stop() {
    this?.stopHandler?.()
  }

  static clear() {
    this.events = []
  }

  static save() {
    console.log(this.events)
  }
}
