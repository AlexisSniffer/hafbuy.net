import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { qsSearchProducts } from '../store/queries/products'

export interface SearchProductsState {
  page: number
  pageSize: number
  filter: string
  categories: string[]
  query: string
}

const initialState: SearchProductsState = {
  page: 1,
  pageSize: 10,
  filter: '',
  categories: [],
  query: qsSearchProducts(1, 10, '', []),
}

export const searchProductsSlice = createSlice({
  name: 'searchProducts',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },

    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload
    },

    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload
    },

    addCategory(state, action: PayloadAction<string>) {
      state.categories.push(action.payload)
    },

    removeCategory(state, action: PayloadAction<string>) {
      state.categories = state.categories.filter((category) => {
        return category != action.payload
      })
    },

    clearCategories(state) {
      state.categories = []
    },

    setQuery(state) {
      state.query = qsSearchProducts(
        state.page,
        state.pageSize,
        state.filter,
        state.categories
      )
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setPage,
  setPageSize,
  setFilter,
  addCategory,
  removeCategory,
  clearCategories,
  setQuery,
} = searchProductsSlice.actions

export default searchProductsSlice.reducer
