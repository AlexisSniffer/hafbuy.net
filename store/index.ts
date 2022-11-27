import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './searchSlice'

export const store = configureStore({
  reducer: {
    filters: searchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
