import { CategoryType } from './CategoryType'
import { MediaType } from './MediaType'

export type ProductType = {
  product: {
    attributes: {
      name: string
      slug: string
      description: string
      price: number
      discount: number
      stock: number
      until: Date
      ratings: number
      subcategories: {
        data: CategoryType[]
      }
      images: {
        data: MediaType[]
      }
      variants: any[]
    }
  }
}

export type ProductCartType = {
  product: {
    name: string
    slug: string
    qty: number
    price: number
    subtotal: number
    image: string
  }
}
