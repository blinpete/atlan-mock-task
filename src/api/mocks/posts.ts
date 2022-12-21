import type { Post } from '../types'
import { myFaker } from './__faker'

export function randomPost(): Post {
  return {
    id: myFaker.datatype.uuid(),
    author: myFaker.name.fullName(),
    title: myFaker.lorem.slug(),
    body: myFaker.lorem.text(),
  }
}
