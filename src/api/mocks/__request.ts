import { ApiError } from '../error'
import type { RequestOptions, Response } from '../types'
import { myFaker } from './__faker'
import { MockSettings } from './__settings'
import { wait } from './__utils'

const __reqMap = new Map<string, { total: number; remain: number }>()

export async function request<T>(options: RequestOptions, randomItem: () => T): Response<T> {
  if (MockSettings.timeout) {
    await wait(MockSettings.timeout)
  }

  if (MockSettings.errorCode) {
    return new ApiError(MockSettings.errorCode)
  }

  // generate length -----------------------------------
  let resLength = __reqMap.get(options.query)

  if (resLength === undefined) {
    let newLength = myFaker.datatype.number({
      min: MockSettings.ResponseSizeMin,
      max: MockSettings.ResponseSizeMax,
    })

    const lengthFromQuery = parseInt(options.query)

    if (!isNaN(lengthFromQuery)) {
      newLength = lengthFromQuery
    }

    resLength = {
      total: newLength,
      remain: newLength,
    }

    __reqMap.set(options.query, resLength)
  }

  let arrLength = resLength.remain

  if (options.limit && arrLength > options.limit) {
    arrLength = options.limit
  }

  const arr = Array.from({
    length: arrLength,
  }).map(randomItem)

  resLength.remain -= arrLength
  __reqMap.set(options.query, resLength)

  const keys = (arr[0] ? Object.keys(arr[0]) : []) as (keyof T)[]

  return {
    data: arr,
    length: resLength.total,
    keys,
  }
}