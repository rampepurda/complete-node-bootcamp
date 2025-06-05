import { createListenerMiddleware } from '@reduxjs/toolkit'
import { fetchCart } from './slices/cartSlice'
import { increaseCount, InitValuesCounterT, setErrorMessage } from './slices/counterSlice'
import { AppDispatch, RootState } from './store'

/**
 * RTK Middlewares:
 * https://redux-toolkit.js.org/api/createListenerMiddleware
 * https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage
 */

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch,
  InitValuesCounterT
>()
startAppListening({
  actionCreator: setErrorMessage,
  //predicate: ,
  //matcher: isCount,
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    //console.log('Todo added: ', action.payload.text)
    let state = listenerApi.getState()
    const dataCounterSlice = state.counterSlice

    // Can cancel other running instances
    listenerApi.cancelActiveListeners()

    // Run async logic
    const data = fetchCart()

    if (dataCounterSlice.count > 5) {
      listenerApi.dispatch(increaseCount(dataCounterSlice.count + 100))
    }

    /*
        // Pause until action dispatched or state changed
    if (await listenerApi.condition()) {
      // Use the listener API methods to dispatch, get state,
      // unsubscribe the listener, start child tasks, and more
      listenerApi.dispatch(setErrorMessage('Buy pet food'))

      // Spawn "child tasks" that can do more work and return results
      const task = listenerApi.fork(async (forkApi) => {
        // Can pause execution
        await forkApi.delay(5)
        // Complete the child by returning a value
        return 42
      })

      const result = await task.result
      // Unwrap the child result in the listener
      if (result.status === 'ok') {
        // Logs the `42` result value that was returned
        console.log('Child succeeded: ', result.value)
      }
    }
     */
  },
})
