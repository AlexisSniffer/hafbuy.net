import { Product } from './product'

export interface Review {
  id: number
  attributes: {
    createdAt: Date
    updatedAt: Date
    publishedAt?: Date
    rating: number
    comment: string
    name: string
    email: string
    product?: { data: Product }
  }
}
