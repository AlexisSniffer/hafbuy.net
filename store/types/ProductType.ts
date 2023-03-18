import { CategoryType } from './CategoryType'
import { MediaType } from './MediaType'

type Variant = {
  id: number
  price: number
  isDiscount: boolean
  discount: number
  until: Date
  variant: any[]
}

export type ProductType = {
  product: {
    id: number
    attributes: {
      name: string
      slug: string
      description: string
      price: number
      isDiscount: boolean
      discount: number
      stock: number
      until: Date
      ratings: number
      deliveryTime: string
      createdBy: any
      subcategories: {
        data: CategoryType[]
      }
      images: {
        data: MediaType[]
      }
      variants: Variant[]
    }
  }
}

export type ProductCartType = {
  product: {
    id: number
    name: string
    slug: string
    qty: number
    price: number
    subtotal: number
    image: string
    detail?: string
  }
}
