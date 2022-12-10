import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { ProductCartType } from './types/ProductType'

export interface ProductCartState {
  products: ProductCartType[]
}

const initialState: ProductCartState = {
  products: [],
}

export const ProductCartSlice = createSlice({
  name: 'productCart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ProductCartType>) {
      let index = state.products.findIndex(
        (product) => product.product.slug === action.payload.product.slug
      )

      if (index < 0) {
        state.products.push(action.payload)
      } else {
        const product = state.products[index].product
        product.price += action.payload.product.qty
        product.qty += action.payload.product.qty
      }
    },

    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (product) => product.product.slug != action.payload
      )
    },
  },
})

export const { addProduct, removeProduct } = ProductCartSlice.actions

export default ProductCartSlice.reducer
