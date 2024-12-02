import React, { MouseEventHandler, PropsWithChildren } from 'react'
import classNames from 'classnames'

type Props = {
  className?: string
  OnClick?: MouseEventHandler<HTMLButtonElement>
  title?: string
  rest: Record<string, any>
}
/**
 * @param isSearch: Default as false, case true input type='search' get another class attribute
 */

export const Button = ({ children, className, OnClick, title, rest }: PropsWithChildren<Props>) => {
  return (
    <button className={classNames('btn', className)} onClick={OnClick} {...rest}>
      {title}
      {children}
    </button>
  )
}
