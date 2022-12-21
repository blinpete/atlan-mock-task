import type { ApiError } from './error'

type ID = string
export type RequestOptions = { query: string; from?: ID; to?: ID; limit?: number }
export type Response<T> = Promise<ResponseSqlSelect<T> | ApiError>

type ResponseSqlSelect<T> = {
  length: number
  keys: (keyof T)[]
  data: T[]
}

export type User = {
  id: ID
  name: string
  gender: 'male' | 'female'
  age: number
}

export type Post = {
  id: ID
  author: string
  title: string
  body: string
}

export type Task = {
  id: ID
  assignee: string
  reviewer: string
  completed: boolean
}

// type MapKeys = {
//   user: (keyof Required<User>)[]
// }

// export const Map: MapKeys = {
//   user: ['id', 'name', 'gender', 'age'],
//   post: ['id', 'name', 'gender', 'age'],
// }

export type Item = { id: string } & Record<string, any>

export type API = {
  getUsers: (options: RequestOptions) => Response<User>
  getPosts: (options: RequestOptions) => Response<Post>
  getTasks: (options: RequestOptions) => Response<Task>
}
