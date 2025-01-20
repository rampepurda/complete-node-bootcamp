import React, { MouseEventHandler, PropsWithChildren } from 'react'
import classNames from 'classnames'

type Props = {
  className?: string
  OnClick?: MouseEventHandler<HTMLButtonElement>
  title?: string
  ariaLabel?: string
  rest: Record<string, any>
}
/**
 * @param isSearch: Default as false, case true input type='search' get another class attribute
 */

export const Button = ({
  children,
  className,
  OnClick,
  title,
  ariaLabel,
  rest,
}: PropsWithChildren<Props>) => {
  return (
    <button
      className={classNames('btn', className)}
      onClick={OnClick}
      aria-label={ariaLabel}
      {...rest}
    >
      {title}
      {children}
    </button>
  )
}
