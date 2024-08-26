import { Brand } from './brand'
import { Category } from './category'
import { DeliveryTime } from './delivery-time'
import { Media } from './media'
import { Variants } from './variants'

export interface Product {
  id: number
  attributes: {
    createdAt: Date
    updatedAt: Date
    publishedAt?: Date
    name: string
    slug: string
    description: string
    description2: any
    images: { data: Media[] }
    price: number
    discount: number
    isDiscount: boolean
    until?: Date
    stock: number
    ratings: number
    categories?: { data: Category[] }
    brand?: { data: Brand }
    variants: Variants[]
    deliveryTime?: { data: DeliveryTime }
    locale: string
    localizations?: { data: Product[] }
    createdBy: any
  }
}

export interface ProductCart extends Product {
  qty: number
  price: number
  variant?: Variants
}
