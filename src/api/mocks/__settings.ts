import type { HttpStatusCode } from '../error'

export const MockSettings = {
  ResponseSizeMin: 0,
  ResponseSizeMax: 200,
  ResponseLimit: 50,
  timeout: 500,
  errorCode: null as HttpStatusCode | null,
}
