import classes from './Components/eShop.module.scss'

import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '../../rtk-toolkit/hooks'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'

export function OrderPage() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()

  return (
    <>
      <title>{t('cartOrder.headline')}</title>
      <meta name="keywords" content="book, shop, eshop" />

      <div className={classes.cart}>
        <nav>
          <ul className={classNames('isHorizontal', classes.breadCrumb)}>
            <li>
              <Link to="/eShop">eShop</Link> /
            </li>
            <li>
              <Link to="/eShop/cart">cart</Link> /
            </li>
            <li>
              <strong className="color-is-darkmagenta">order</strong>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
