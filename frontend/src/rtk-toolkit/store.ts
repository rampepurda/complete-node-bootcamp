import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './slices/cartSlice'

const combinedReducer = combineReducers({
  [cartSlice.name]: cartSlice.reducer,
})
export const store = configureStore({
  reducer: combinedReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
