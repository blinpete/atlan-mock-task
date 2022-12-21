import type { API, User } from '../types'
import { myFaker } from './__faker'

export function randomUser(): User {
  return {
    id: myFaker.datatype.uuid(),
    name: myFaker.name.fullName(),
    age: myFaker.datatype.number(),
    gender: myFaker.name.sexType(),
  }
}
