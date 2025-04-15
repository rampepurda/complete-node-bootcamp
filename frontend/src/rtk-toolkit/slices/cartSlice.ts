import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { environment } from '../../configuration/environment'
import { CartInt } from '../../types'

/**
 * usage with TS:
 * https://redux-toolkit.js.org/usage/usage-with-typescript
 * createAsyncThunk with TS:
 * https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * Installation:
 * yarn add @reduxjs/toolkit
 * yarn add react-redux (binaries dependencies)
 * As of React Redux v7.2.3, the react-redux package has a dependency on @types/react-redux,
 * so the type definitions will be automatically installed with the library. Otherwise, you'll need to manually
 * install them yourself (typically npm install @types/react-redux
 *
 * createAsyncThunk:
 * Basic createAsyncThunk Types
 * In the most common use cases, you should not need to explicitly declare any types for the createAsyncThunk call itself.
 * Just provide a type for the first argument to the payloadCreator argument as you would for any function argument, and the resulting thunk will accept the same type as its input parameter. The return type of the payloadCreator will also be reflected in all generated action types.
 * https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk
 *
 * thunkApi:
 * signal
 * special(authentication): Signal, JWT token
 */

export type StatusT = {
  isLoading: boolean
  error: string
}
export type InitValuesT = {
  cart: CartInt | undefined
  status: StatusT
}
const initialState: InitValuesT = {
  cart: undefined,
  status: {
    isLoading: false,
    error: '',
  },
}

export const fetchCart = createAsyncThunk<CartInt>(
  'eshop/fetchCart',
  // In Case there is not argument and you`ll call thunkApi underscore must be there. async (userId: number) => {
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${environment.localProductsCartURL}`, { method: 'GET' })
      if (response.ok) {
        return await response.json()
      }
    } catch (err: any) {
      // Await response message, if is set up
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.status.isLoading = true
    })
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status.error = 'Ops, something happened'
      state.status.isLoading = false
    })
    // Payload is redundant when fetchFn includes types
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload
      state.status.isLoading = false
    })
  },
})

/*
  export const { increment, decrement, incrementByAmount } = counterSlice.actions
  //Other code such as selectors can use the imported `RootState` type
  export const selectCount = (state: RootState) => state.counter.value
  export default counterSlice.reducer
 */
