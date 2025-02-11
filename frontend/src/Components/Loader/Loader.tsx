import GridLoaderSWG from './c-grid-loader.svg'
import classNames from 'classnames'
import { PropsWithChildren } from 'react'

type Props = {
  classesNames?: string
}
export const Loader = ({ classesNames, children }: PropsWithChildren<Props>) => {
  return (
    <div className={classNames('isLoaderDark', classesNames)}>
      <img src={`${GridLoaderSWG}`} width={50} height={50} alt="loader" aria-hidden={true} />
      {children}
    </div>
  )
}
