import type { HttpStatusCode } from '../error'

export const MockSettings = {
  ResponseSizeMin: 0,
  ResponseSizeMax: 4000,
  ResponseLimit: 50,
  timeout: 500,
  errorCode: null as HttpStatusCode | null,
}
