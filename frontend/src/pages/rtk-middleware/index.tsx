import React from 'react'
import { Link } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../rtk-toolkit/hooks'
import { setErrorMessage } from '../../rtk-toolkit/slices/counterSlice'

export default function RTKMiddlewarePage() {
  const dispatch = useAppDispatch()
  const { count, error } = useAppSelector((state) => state.counterSlice)

  const styles = {
    mPage: {
      margin: '2rem 10%',
    },
  }

  return (
    <div className="hasOutline" style={styles.mPage}>
      <Link to="/">← Back</Link>

      <section>
        <h2>RTK listenerMiddleware</h2>
        <p className="color-is-red">
          This part will be removed and moved in to the ReactGuide after updating to version19
        </p>
        <Link
          to="https://redux-toolkit.js.org/api/createListenerMiddleware"
          target="_blank"
          rel="external"
        >
          RTK Middlewares read more here
        </Link>
        <h4>Error message: {error !== '' ? error : 'not setup yet'}</h4>
        <h4>Count: {count}</h4>
        <button
          className="btn btn-edit"
          type="button"
          onClick={() =>
            dispatch(setErrorMessage({ SetErrorMessage: 'any middleware was not set yet' }))
          }
        >
          Create Error Message
        </button>
      </section>
    </div>
  )
}
