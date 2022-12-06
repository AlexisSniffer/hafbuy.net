import { configureStore } from '@reduxjs/toolkit'
import searchProductsReducer from './searchProductsSlice'
import shoppingCartReducer from './shoppingCartSlice'

export const store = configureStore({
  reducer: {
    filters: searchProductsReducer,
    cart: shoppingCartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
