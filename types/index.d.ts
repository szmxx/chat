/*
 * @Author: cola
 * @Date: 2023-08-22 17:01:45
 * @LastEditors: cola
 * @Description:
 */
declare global {
  interface IApi {
    pageview: number
    startAt: number
  }
  interface IItem {
    name: string
    value: unknown
  }
  interface IGroupConfig {
    name: string
    number: number
    enabled: boolean
  }
}

export {}
