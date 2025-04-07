import classes from './Switchers.module.scss'
import { Button } from '../UI'
import i18next from 'i18next'
import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'

export const LngSwitcher = () => {
  const { t } = useTranslation()
  const lngs: { en: { nativeName: string }; cz: { nativeName: string } } = {
    en: { nativeName: 'English' },
    cz: { nativeName: 'Czech' },
  }

  return (
    <>
      {Object.keys(lngs).map((lng) => (
        <div className={classes.btnWrapper} key={lng}>
          {i18next.resolvedLanguage !== lng && (
            <Button
              classesName={classes.btn}
              OnClick={() => i18next.changeLanguage(lng)}
              ariaLabel={`${t('lngSwitcher')}`}
              rest={{
                type: 'submit',
                disabled: i18next.resolvedLanguage === lng,
                lang: i18next.resolvedLanguage,
              }}
            >
              <span>{lng}</span>
            </Button>
          )}
        </div>
      ))}
    </>
  )
}

type CartPropsT = { itemTotal?: number; pageURL: string }

export const CartSwitcher = ({ itemTotal, pageURL }: CartPropsT) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (
    <div className={classNames(classes.btnWrapper, classes.cart)}>
      {pathname === '/eShop/cart' && (
        <span className={classes.hasLink_eShopPage}>
          <Link to="/eShop" aria-label="back to eshop">
            eShop
          </Link>
        </span>
      )}

      <Button
        classesName={classes.btn}
        ariaLabel={`${t('eShop.ariaLabel.cart')}`}
        rest={{
          type: 'button',
        }}
      >
        <Link className={classes.hasLink_cart} to={!itemTotal ? '' : `${pageURL}`}>
          <img src="/ico-cart.svg" width={22} height={22} aria-hidden={true} />
          <span className="display-inline-block">{!itemTotal ? null : itemTotal}</span>
        </Link>
      </Button>
    </div>
  )
}
