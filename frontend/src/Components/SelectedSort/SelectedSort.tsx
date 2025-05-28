import classes from './SelectedSort.module.scss'
import React, { PropsWithChildren } from 'react'
import { Button, Select } from '../UI'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

type Props = PropsWithChildren<{
  classesNames?: string
  options: {
    value: string
    title: string
  }[]
  name: string
  btnClass: string
}>

export const SelectedSort = ({ classesNames, options, name, btnClass, children }: Props) => {
  const { t } = useTranslation()

  return (
    <form className={classNames(classesNames, 'display-flex display-flex-start')} method="get">
      <Select classesNames={classes.selectSortList} options={options} name={name}>
        {children}
      </Select>

      <Button classesName={btnClass} title={t('form.submit')} rest={{ type: 'submit' }} />
    </form>
  )
}
