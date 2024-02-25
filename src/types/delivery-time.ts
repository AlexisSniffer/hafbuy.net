import { Product } from './product'

export interface DeliveryTime {
  id: number
  attributes: {
    createdAt: Date
    updatedAt: Date
    publishedAt?: Date
    time: string
    products: { data: Product[] }
    locale: string
    localizations?: { data: DeliveryTime[] }
  }
}
