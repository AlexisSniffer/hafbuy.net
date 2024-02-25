import { Media } from './media'
import { Product } from './product'

export interface Category {
  id: number
  attributes: {
    createdAt: Date
    updatedAt: Date
    publishedAt?: Date
    name: string
    slug: string
    thumbnail?: { data: Media }
    category?: { data: Category }
    categories: { data: Category[] }
    isExpanded: boolean
    products?: { data: Product[] }
    locale: string
    localizations?: { data: Category[] }
  }
}
