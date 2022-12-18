import type { API } from './types'

import { getUsers } from './mocks/users'
import { getPosts } from './mocks/posts'
import { getTasks } from './mocks/tasks'

// mock API
export const ApiClient: API = {
  getUsers,
  getPosts,
  getTasks,
}
