import React, { useCallback, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CartSwitcher, Header } from '../../Components'
import { EShopPage } from './index'
import { useAppDispatch, useAppSelector } from '../../rtk-toolkit/hooks'
import { fetchCart } from '../../rtk-toolkit/slices/cartSlice'
import { useTranslation } from 'react-i18next'

enum PathNameE {
  eShop = '/eShop',
  cart = '/eShop/cart',
  order = '/eShop/cart/order',
}
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
          return `${t('cart.headline')}`
        }
        case `${PathNameE.order}`: {
          return `${t('cartOrder.headline')}`
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
      <title>{t('eShop.title')}</title>
      <meta name="keywords" content="shop, product, eshop" />

      <Header title={`${getPathName(pathname)}`}>
        <CartSwitcher pageURL={'/eShop/cart'} itemTotal={cart?.productsOrderTotal} />
      </Header>

      {pathname === '/eShop' && <EShopPage />}
      <Outlet />
    </>
  )
}
