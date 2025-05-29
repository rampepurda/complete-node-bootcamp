import React, { MouseEventHandler, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * https://react.dev/reference/react-dom/components/select#providing-an-initially-selected-option
 */

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
  const { t } = useTranslation()

  return (
    <select className={classesNames} onClick={OnClick} name={name} {...rest}>
      {options.map((option, idx: number) => (
        <option key={idx} value={option.value}>
          {t(option.title)}
          {children}
        </option>
      ))}
    </select>
  )
}
