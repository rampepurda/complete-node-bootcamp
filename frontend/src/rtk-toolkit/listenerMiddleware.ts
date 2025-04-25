import { createListenerMiddleware } from '@reduxjs/toolkit'
import { fetchCart } from './slices/cartSlice'
import { increaseCount, setErrorMessage } from './slices/counterSlice'

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.

export const listenerMiddleware = createListenerMiddleware()
listenerMiddleware.startListening({
  actionCreator: setErrorMessage,
  effect: async (action, listenerApi) => {
    let state: any = listenerApi.getState()
    const dataCounterSlice: any = state.counterSlice

    // dispatch
    const getIncCount = listenerApi.dispatch(increaseCount(5))

    // Run async logic (thunk for example, see below)
    const data = fetchCart

    if (dataCounterSlice.error === 'any middleware was not set yet') {
      listenerApi.dispatch(increaseCount(1005))
    }

    console.log('Todo added: ', action.payload.SetErrorMessage)

    // If condition
    /*
        if (await listenerApi.condition(matchSomeAction)) {
          setTimeout(() => {
            listenerApi.dispatch(increaseCount(1005))
            listenerApi.dispatch(setErrorMessage({ SetErrorMessage: 'All Errors were fixed.' }))
            alert(Object.values(dataSlice.title))

        }, 3000)
      }
     */

    // Can cancel other running instances
    listenerApi.cancelActiveListeners()
  },
})
