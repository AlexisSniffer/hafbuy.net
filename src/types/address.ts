import { User } from './user'

export interface Address {
  id: number
  attributes: {
    createdAt: Date
    updatedAt: Date
    publishedAt?: Date
    name: string
    lastname: string
    address: string
    phone: number
    email: string
    coordinates?: any
    user?: { data: User }
  }
}
