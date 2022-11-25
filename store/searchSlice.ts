import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Prices = {
  start: number
  final: number
}

export interface SearchState {
  filters: {
    product: string
    category: string
    prices: Prices
  }
}

const initialState: SearchState = {
  filters: {
    product: '',
    category: '',
    prices: {
      start: 0.0,
      final: 0.0,
    },
  },
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<SearchState>) => {
      state.filters = action.payload.filters
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFilters } = searchSlice.actions

export default searchSlice.reducer
