import classes from './Header.module.scss'
import React from 'react'
import { LngSwitcher } from '../../Components/index'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

export const Header = () => {
  return (
    <header className={classNames('display-flex', classes.wrapper)}>
      <h1 className="color-is-white">Complete Node Bootcamp</h1>

      <Link to="/reactPlayer" title="reactPlayer">
        <img src="/ico-internal.svg" width={32} height={32} aria-hidden={true} />
      </Link>

      <LngSwitcher />
    </header>
  )
}
