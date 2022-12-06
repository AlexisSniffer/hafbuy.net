import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SearchProductsState {
  filter: string
  category: string
}

const initialState: SearchProductsState = {
  filter: '',
  category: '',
}

export const searchProductsSlice = createSlice({
  name: 'searchProducts',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload
    },

    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFilter, setCategory } = searchProductsSlice.actions

export default searchProductsSlice.reducer
