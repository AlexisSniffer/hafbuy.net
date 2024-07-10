import { Media } from './media'
import { Variation } from './variation'

export interface Variants {
  id: number
  images?: { data: Media[] }
  price: number
  discount?: number
  isDiscount: boolean
  until?: Date
  stock: number
  variant: Variation[]
}
