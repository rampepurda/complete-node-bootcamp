import { createSlice } from '@reduxjs/toolkit'

/**
 * THIS 'COUNTER SLICE' IS USED ONLY FOR TESTING PURPOSE
 */

export type InitValuesCounterT = {
  title: string
  error: string | undefined
  count: number
  inCount: () => void
}

const initialState: InitValuesCounterT = {
  title: 'joha',
  error: '',
  count: 0,
  inCount: () => {},
}

export const counterSlice = createSlice({
  name: 'counterSlice',
  initialState,
  reducers: {
    setErrorMessage(state, action) {
      state.error = action.payload.SetErrorMessage
    },
    increaseCount(state, action) {
      state.count = action.payload
    },
  },
})

export const { setErrorMessage, increaseCount } = counterSlice.actions
