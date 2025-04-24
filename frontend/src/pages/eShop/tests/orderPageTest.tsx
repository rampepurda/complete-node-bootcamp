import { useAppDispatch, useAppSelector } from '../../../rtk-toolkit/hooks'
import { increaseCount } from '../../../rtk-toolkit/slices/counterSlice'
import { testSetError } from '../../../rtk-toolkit/slices/cartSlice'

export function OrderPageTest() {
  const dispatch = useAppDispatch()
  const count = useAppSelector((state) => state.counterSlice.count)
  const status = useAppSelector((state) => state.cartSlice.status)

  return (
    <>
      <h3 aria-label={`${count}`}>Count: {count}</h3>
      <button
        className="btn btn-info"
        type="button"
        onClick={() => dispatch(increaseCount(count + 20))}
      >
        Increase
      </button>
      <button
        className="btn btn-info"
        type="button"
        onClick={() => dispatch(testSetError('test setup error message'))}
      >
        Set Error
      </button>
      {status.error.includes('error') && <h3>{status.error}</h3>}
    </>
  )
}
