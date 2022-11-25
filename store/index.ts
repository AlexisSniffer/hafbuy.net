import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import searchReducer from './searchSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    filters: searchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
