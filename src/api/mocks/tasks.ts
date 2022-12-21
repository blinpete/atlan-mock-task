import type { API, Task } from '../types'
import { myFaker } from './__faker'

export function randomTask(): Task {
  return {
    id: myFaker.datatype.uuid(),
    assignee: myFaker.name.fullName(),
    reviewer: myFaker.name.fullName(),
    completed: myFaker.datatype.boolean(),
  }
}
