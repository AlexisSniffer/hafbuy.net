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
      state.view.push(product)

      return {
        view: [...state.view],
      }
    })
  },
}))

export default useViewStore
