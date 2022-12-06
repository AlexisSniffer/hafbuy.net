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
      categories: {
        data: CategoryType[]
      }
      images: {
        data: MediaType[]
      }
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
