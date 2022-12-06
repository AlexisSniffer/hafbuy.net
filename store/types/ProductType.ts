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
