import { configureStore } from '@reduxjs/toolkit'
import searchProductsReducer from './searchProductsSlice'

export const store = configureStore({
  reducer: {
    filters: searchProductsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
