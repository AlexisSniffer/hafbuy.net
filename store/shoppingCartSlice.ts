import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { ProductCartType } from './types/ProductType'

export interface ProductCartState {
  products: ProductCartType[]
  total: number
  qty: number
}

const initialState: ProductCartState = {
  products: [],
  total: 0.0,
  qty: 0,
}

export const ProductCartSlice = createSlice({
  name: 'productCart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ProductCartType>) {
      state.products.push(action.payload)
      state.qty = state.qty + action.payload.product.qty
    },

    removeProduct(state, action: PayloadAction<ProductCartType>) {
      state.products = state.products.filter(
        (product) => product.product.slug !== action.payload.product.slug
      )
      state.qty = state.qty + action.payload.product.qty
    },
  },
})

export const { addProduct, removeProduct } = ProductCartSlice.actions

export default ProductCartSlice.reducer
