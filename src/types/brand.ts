import { Media } from './media'
import { Product } from './product'

export interface Brand {
  id: number
  attributes: {
    createdAt: Date
    updatedAt: Date
    publishedAt?: Date
    name: string
    slug: string
    thumbnail?: { data: Media }
    products: { data: Product[] }
  }
}
