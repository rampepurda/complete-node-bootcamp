import React, { useCallback, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CartSwitcher, Header } from '../../Components'
import { EShopPage } from './index'
import { useAppDispatch, useAppSelector } from '../../rtk-toolkit/hooks'
import { fetchCart } from '../../rtk-toolkit/slices/cartSlice'
import { useTranslation } from 'react-i18next'
import { PathNameE } from '../../types'

export function EshopLayout() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cartSlice.cart)
  const getPathName = useCallback(
    (pName: string) => {
      switch (pName) {
        case `${PathNameE.eShop}`: {
          return `${t('eShop.headline')}`
        }
        case `${PathNameE.cart}`: {
          return `${t('eShop.cart.headline')}`
        }
        case `${PathNameE.order}`: {
          return `${t('eShop.cartOrder.headline')}`
        }
      }
    },
    [pathname]
  )

  useEffect(() => {
    dispatch(fetchCart())
  }, [])

  return (
    <>
      <title>{t('eShop.headline')}</title>
      <meta name="keywords" content="shop, product, eshop" />

      <Header title={`${getPathName(pathname)}`}>
        <CartSwitcher
          pageURL={'/eShop/cart'}
          itemTotal={cart?.productsOrderTotal}
          ariaCartStatus={cart?.productsOrdered?.length === 0}
        />
      </Header>

      {pathname === '/eShop' && <EShopPage />}
      <Outlet />
    </>
  )
}
