import type { API, Post } from '../types'
import { myFaker } from './__faker'
import { request } from './__request'

function randomPost(): Post {
  return {
    id: myFaker.datatype.uuid(),
    author: myFaker.name.fullName(),
    title: myFaker.lorem.slug(),
    body: myFaker.lorem.text(),
  }
}

// POST /api/users
export const getPosts: API['getPosts'] = options => request(options, randomPost)
