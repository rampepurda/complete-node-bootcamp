import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './slices/cartSlice'
import { counterSlice } from './slices/counterSlice'

export const combinedReducer = combineReducers({
  [cartSlice.name]: cartSlice.reducer,
  [counterSlice.name]: counterSlice.reducer,
})

export const store = configureStore({
  reducer: combinedReducer,
  // During tests running I got this Error message: 'A non-serializable value'. Set serializableCheck to false solved it,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
