import { createSlice } from '@reduxjs/toolkit'

/**
 * THIS 'COUNTER SLICE' IS USED ONLY FOR TESTING PURPOSE
 */

export type InitValuesCounterT = {
  title: string
  isError: string | undefined
  count: number
  inCount: () => void
}

const initialState: InitValuesCounterT = {
  title: 'joha',
  isError: 'no matches',
  count: 10,
  inCount: () => {},
}

export const counterSlice = createSlice({
  name: 'counterSlice',
  initialState,
  reducers: {
    setErrorMessage(state, action) {
      state.isError = action.payload.SetErrorMessage
    },
    increaseCount(state, action) {
      state.count = action.payload
    },
  },
})

export const { setErrorMessage, increaseCount } = counterSlice.actions
