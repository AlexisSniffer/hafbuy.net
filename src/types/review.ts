import { Product } from './product'

export interface Review {
  id: number
  attributes: {
    createdAt: Date
    updatedAt: Date
    publishedAt?: Date
    ratings: number
    comment: string
    name: string
    email: string
    product?: { data: Product }
  }
}
