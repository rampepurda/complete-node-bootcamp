import { createSlice } from '@reduxjs/toolkit'

/**
 * THIS 'COUNTER SLICE' IS USES ONLY FOR TESTING PURPOSE
 */

export type InitValuesCounterT = {
  title: string
  count: number
  inCount: () => void
}

const initialState: InitValuesCounterT = {
  title: 'joha',
  count: 0,
  inCount: () => {},
}

export const counterSlice = createSlice({
  name: 'counterSlice',
  initialState,
  reducers: {
    increaseCount(state, action) {
      state.count = action.payload
    },
  },
})

export const { increaseCount } = counterSlice.actions
