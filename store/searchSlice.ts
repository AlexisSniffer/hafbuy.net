import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SearchState {
  filter: string
  category: string
}

const initialState: SearchState = {
  filter: '',
  category: '',
}

export const searchSlice = createSlice({
  name: 'search',
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
export const { setFilter, setCategory } = searchSlice.actions

export default searchSlice.reducer
