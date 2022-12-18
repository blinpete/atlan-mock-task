export type HttpStatusCode = 403 | 500

export class ApiError {
  public message: string

  constructor(public code: HttpStatusCode) {
    switch (code) {
      case 403:
        this.message = 'Forbidden'
        break
      case 500:
        this.message = 'Server internal error'
        break
      default:
        this.message = ''
    }
  }
}
