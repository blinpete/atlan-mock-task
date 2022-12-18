import type { API, User } from '../types'
import { myFaker } from './__faker'
import { request } from './__request'

function randomUser(): User {
  return {
    id: myFaker.datatype.uuid(),
    name: myFaker.name.fullName(),
    age: myFaker.datatype.number(),
    gender: myFaker.name.sexType(),
  }
}

// POST /api/users
export const getUsers: API['getUsers'] = options => request(options, randomUser)
