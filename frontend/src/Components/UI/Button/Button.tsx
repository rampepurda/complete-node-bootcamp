import React, { MouseEventHandler, PropsWithChildren } from 'react'
import classNames from 'classnames'

type Props = PropsWithChildren<{
  classesName?: string
  OnClick?: MouseEventHandler<HTMLButtonElement>
  title?: string
  ariaLabel?: string
  ariaRole?: string
  rest: Record<string, any>
}>
/**
 * @param isSearch: Default as false, case true input type='search' get another class attribute
 */

export const Button = ({
  children,
  classesName,
  OnClick,
  title,
  ariaLabel,
  ariaRole,
  rest,
}: Props) => {
  return (
    <button
      className={classNames('btn', classesName)}
      onClick={OnClick}
      aria-label={ariaLabel}
      role={ariaRole}
      {...rest}
    >
      {title}
      {children}
    </button>
  )
}
