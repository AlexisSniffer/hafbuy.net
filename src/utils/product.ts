import { Product } from '@/types/product'
import { Variants } from '@/types/variants'

interface ProductDisable extends Product {
  selectedVariant?: Variants | undefined
}

export const disableProduct = ({
  attributes,
  selectedVariant,
}: ProductDisable): boolean => {
  if (!attributes.variants.length && attributes.stock <= 0) return true

  if (attributes.variants.length) {
    if (selectedVariant == undefined) return true
  }

  return false
}

export const productPrice = (product: Product, selectedVariant?: Variants) => {
  if (product.attributes.variants.length && selectedVariant) {
    return getPrice(
      selectedVariant.price,
      selectedVariant.isDiscount,
      selectedVariant.discount,
      selectedVariant.until,
    )
  }

  return getPrice(
    product.attributes.price,
    product.attributes.isDiscount,
    product.attributes.discount,
    product.attributes.until,
  )
}

function getPrice(
  price: number,
  isDiscount: boolean,
  discount?: number,
  until?: Date,
): number {
  if (isDiscount && (!until || (until && new Date(until) > new Date()))) {
    return discount!
  }

  return price
}
