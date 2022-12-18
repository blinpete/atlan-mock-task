import type { API, Task } from '../types'
import { myFaker } from './__faker'
import { request } from './__request'

function randomTask(): Task {
  return {
    id: myFaker.datatype.uuid(),
    assignee: myFaker.name.fullName(),
    reviewer: myFaker.name.fullName(),
    completed: myFaker.datatype.boolean(),
  }
}

// POST /api/users
export const getTasks: API['getTasks'] = options => request(options, randomTask)
