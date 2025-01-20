import classes from './Header.module.scss'
import React from 'react'
import { LngSwitcher } from '../../Components/index'

export const Header = () => {
  return (
    <header className={classes.wrapper}>
      <h1 className="color-is-white">Complete Node Bootcamp</h1>

      <LngSwitcher />
    </header>
  )
}
