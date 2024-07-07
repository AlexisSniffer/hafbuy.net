import { User } from './user'

export interface Address {
  id: number
  attributes: {
    createdAt: Date
    updatedAt: Date
    publishedAt?: Date
    address?: string
    coordinates?: any
    user?: { data: User }
  }
}
