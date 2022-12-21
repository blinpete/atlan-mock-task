import type { RequestOptions } from './types'
import { request } from './mocks/request'

function getData(options: RequestOptions) {
  return request(options)
}

// mock API
export const ApiClient = {
  getData,
}
