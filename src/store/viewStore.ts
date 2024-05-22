import { Product } from '@/types/product'
import { create } from 'zustand'

interface ViewState {
  view: Product[]
  add: (product: Product) => void
}

const useViewStore = create<ViewState>()((set) => ({
  view: [],
  add: (product: Product) => {
    set((state) => {
      const productExists = state.view.some((p) => p.id === product.id)

      return !productExists
        ? {
            view: [...state.view, product],
          }
        : state
    })
  },
}))

export default useViewStore
