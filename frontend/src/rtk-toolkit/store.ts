import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './slices/cartSlice'
import { counterSlice } from './slices/counterSlice'
import { listenerMiddleware } from './listenerMiddleware'

export const combinedReducer = combineReducers({
  [cartSlice.name]: cartSlice.reducer,
  [counterSlice.name]: counterSlice.reducer,
})

export const store = configureStore({
  reducer: combinedReducer,
  // During testing, I got this Error message: 'A non-serializable value'. Must add Middleware and set serializableCheck to false will solve it.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck read more: https://redux-toolkit.js.org/api/serializabilityMiddleware
      //serializableCheck: false,
    }).prepend(listenerMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
