import { ProductCart } from '@/types/product'
import { create } from 'zustand'

interface CartState {
  cart: ProductCart[]
  count: number
  subtotal: number
  step: number
  order: string
  setStep: (step: number) => void
  setOrder: (order: string) => void
  add: (product: ProductCart) => void
  edit: (product: ProductCart) => void
  remove: (product: ProductCart) => void
}

const useCartStore = create<CartState>()((set) => ({
  cart: [],
  count: 0,
  subtotal: 0,
  step: 0,
  order: '',
  setStep: (step: number) =>
    set((state) => {
      const cleanBuy = {
        cart: [],
        count: 0,
        subtotal: 0,
      }

      return {
        step: step,
        ...(step === 2 ? cleanBuy : null),
      }
    }),
  setOrder: (order: string) =>
    set((state) => {
      return {
        order: order,
      }
    }),
  add: (product: ProductCart) => {
    set((state) => {
      const existingProduct = state.cart.find(
        (p) => p.id === product.id && p.variant?.id === product.variant?.id,
      )

      if (existingProduct) {
        existingProduct.qty += product.qty
      } else {
        state.cart.push(product)
      }

      return {
        cart: [...state.cart],
        count: setCount(state.cart),
        subtotal: setSubtotal(state.cart),
      }
    })
  },
  edit: (product: ProductCart) => {
    set((state) => {
      const existingProductIndex = state.cart.findIndex(
        (p) => p.id === product.id && p.variant?.id === product.variant?.id,
      )

      if (existingProductIndex !== -1) {
        const updatedProduct = { ...state.cart[existingProductIndex] }
        updatedProduct.qty = product.qty
        state.cart[existingProductIndex] = updatedProduct
      }

      return {
        cart: [...state.cart],
        count: setCount(state.cart),
        subtotal: setSubtotal(state.cart),
      }
    })
  },
  remove: (product: ProductCart) => {
    set((state) => {
      state.cart = state.cart.filter(
        (p) =>
          p.id !== product.id ||
          (product.variant !== undefined &&
            p.variant?.id !== product.variant.id),
      )

      return {
        cart: [...state.cart],
        count: setCount(state.cart),
        subtotal: setSubtotal(state.cart),
      }
    })
  },
}))

function setCount(cart: ProductCart[]): number {
  return cart.reduce((accumulator, current) => accumulator + current.qty, 0)
}

function setSubtotal(cart: ProductCart[]): number {
  return cart.reduce(
    (accumulator, current) => accumulator + current.price * current.qty,
    0,
  )
}

export default useCartStore
