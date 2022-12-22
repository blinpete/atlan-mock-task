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
  let queryStats = __reqMap.get(options.query)

  if (queryStats === undefined) {
    let newLength = myFaker.datatype.number({
      min: MockSettings.ResponseSizeMin,
      max: MockSettings.ResponseSizeMax,
    })

    const lengthFromQuery = parseInt(options.query)

    if (!isNaN(lengthFromQuery)) {
      newLength = Math.min(lengthFromQuery, MockSettings.ResponseSizeMax)
    }

    queryStats = {
      total: newLength,
      remain: newLength,
      seed: myFaker.datatype.number({ min: 0, max: 1000 }),
      table: myFaker.helpers.arrayElement(tables),
    }

    __reqMap.set(options.query, queryStats)
  }

  // initial call or chunk request?
  if (!options.from) {
    queryStats.remain = queryStats.total
  }

  let arrLength = queryStats.remain

  if (options.limit && arrLength > options.limit) {
    arrLength = options.limit
  }

  myFaker.seed(queryStats.seed + queryStats.remain)

  const randomizer = services[queryStats.table]

  const arr = Array.from({
    length: arrLength,
  }).map(randomizer)

  queryStats.remain -= arrLength

  // not necessary, just relying on mutation
  // __reqMap.set(options.query, resLength)

  const keys = (arr[0] ? Object.keys(arr[0]) : []) as (keyof Item)[]

  return {
    data: arr,
    length: queryStats.total,
    keys,
  }
}
