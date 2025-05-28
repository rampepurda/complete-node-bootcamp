import React, { MouseEventHandler, PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  classesNames?: string
  OnClick?: MouseEventHandler<HTMLSelectElement>
  options: {
    value: string
    title: string
  }[]
  name: string
  rest?: Record<string, any>
}>

export const Select = ({ options, name, classesNames, OnClick, rest, children }: Props) => {
  return (
    <select className={classesNames} onClick={OnClick} name={name} {...rest}>
      {options.map((option, idx: number) => (
        <option key={idx} value={option.value}>
          {option.title}
          {children}
        </option>
      ))}
    </select>
  )
}
