import React, { ChangeEventHandler, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * https://react.dev/reference/react-dom/components/select#providing-an-initially-selected-option
 */

type Props = PropsWithChildren<{
  id?: string
  classesNames?: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
  options: {
    value: string
    title: string
  }[]
  name: string
  rest?: Record<string, any>
}>

export const Select = ({ id, options, name, classesNames, onChange, rest, children }: Props) => {
  const { t } = useTranslation()

  return (
    <select id={id} className={classesNames} onChange={onChange} name={name} {...rest}>
      {options.map((option, idx: number) => (
        <option key={idx} value={option.value}>
          {t(option.title)}
          {children}
        </option>
      ))}
    </select>
  )
}
