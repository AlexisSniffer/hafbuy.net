import { VariantType } from './variant-type'

export interface Variation {
  value: string
  type?: { data: VariantType }
}
