import { ApiError } from '../error'
import type { Item, RequestOptions, Response } from '../types'
import { myFaker } from './__faker'
import { MockSettings } from './__settings'
import { wait } from './__utils'

import { randomPost } from './posts'
import { randomTask } from './tasks'
import { randomUser } from './users'

const tables = ['posts', 'tasks', 'users'] as const
type Table = typeof tables[number]

type Randomizer = () => Item

const services: Record<Table, Randomizer> = {
  posts: randomPost,
  tasks: randomTask,
  users: randomUser,
}

type CacheEntry = {
  total: number
  remain: number
  seed: number
  table: Table
}

const __reqMap = new Map<string, CacheEntry>()

export async function request(options: RequestOptions): Response<Item> {
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
      newLength = Math.min(lengthFromQuery, MockSettings.ResponseSizeMax)
    }

    resLength = {
      total: newLength,
      remain: newLength,
      seed: myFaker.datatype.number({ min: 0, max: 1000 }),
      table: myFaker.helpers.arrayElement(tables),
    }

    __reqMap.set(options.query, resLength)
  }

  // initial call or chunk request?
  if (!options.from) {
    resLength.remain = resLength.total
  }

  let arrLength = resLength.remain

  if (options.limit && arrLength > options.limit) {
    arrLength = options.limit
  }

  myFaker.seed(resLength.seed + resLength.remain)

  const randomizer = services[resLength.table]

  const arr = Array.from({
    length: arrLength,
  }).map(randomizer)

  resLength.remain -= arrLength

  // not necessary, just relying on mutation
  // __reqMap.set(options.query, resLength)

  const keys = (arr[0] ? Object.keys(arr[0]) : []) as (keyof Item)[]

  return {
    data: arr,
    length: resLength.total,
    keys,
  }
}
