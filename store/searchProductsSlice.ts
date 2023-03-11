import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { qsProducts } from '../store/queries/products'

export interface SearchProductsState {
  page: number
  pageSize: number
  filter: string
  categories: string[]
  subcategories: string[]
  prices: [number, number]
  query: string
}

const initialState: SearchProductsState = {
  page: 1,
  pageSize: 10,
  filter: '',
  categories: [],
  subcategories: [],
  prices: [0, 20000],
  query: qsProducts(1, 10, '', [], [], [0, 20000]),
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

    // categories
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

    // subcategories
    addSubCategory(state, action: PayloadAction<string>) {
      state.subcategories.push(action.payload)
    },

    removeSubCategory(state, action: PayloadAction<string>) {
      state.subcategories = state.subcategories.filter((subcategory) => {
        return subcategory != action.payload
      })
    },

    clearSubCategories(state) {
      state.subcategories = []
    },

    setPrice(state, action: PayloadAction<[number, number]>) {
      state.prices = action.payload
    },

    setQuery(state) {
      state.query = qsProducts(
        state.page,
        state.pageSize,
        state.filter,
        state.categories,
        state.subcategories,
        state.prices
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
  addSubCategory,
  removeSubCategory,
  clearSubCategories,
  setPrice,
  setQuery,
} = searchProductsSlice.actions

export default searchProductsSlice.reducer
