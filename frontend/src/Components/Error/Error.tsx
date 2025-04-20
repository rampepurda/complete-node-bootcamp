import classes from './Error.module.scss'
import { useRouteError } from 'react-router'

export const message: string = 'Sorry an unexpected error has occurred'

export const Error = () => {
  const error: any = useRouteError()

  return (
    <div className={classes.cover}>
      <h2 className={classes.isRed}>Oops!</h2>
      {error.data.message === undefined ? <h4>{message}</h4> : <h4>{error.data.message}</h4>}
      {error.status === 500 && <h4>{error.data.message} Status: 500</h4>}
      {error.status === 404 && <h4>{error.data.message} Status: 404 | Page not found</h4>}
      {error.status === 400 && <h4>Status: 400 | Bad request</h4>}
    </div>
  )
}
