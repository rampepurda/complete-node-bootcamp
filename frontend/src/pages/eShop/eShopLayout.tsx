import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CartSwitcher, Header } from '../../Components'
import { EShopPage } from './index'
import { useAppDispatch, useAppSelector } from '../../rtk-toolkit/hooks'
import { fetchCart } from '../../rtk-toolkit/slices/cartSlice'
import { useTranslation } from 'react-i18next'

export function EshopLayout() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const productInCart = useAppSelector((state) => state.cart.productInCart)

  useEffect(() => {
    dispatch(fetchCart())
  }, [])

  return (
    <>
      <title>eShop - Welcome</title>
      <meta name="keywords" content="shop, product, eshop" />

      <Header title={pathname === '/eShop' ? `${t('eShop.title')}` : `${t('eShop.cartTitle')}`}>
        <CartSwitcher pageURL={'/eShop/cart'} itemTotal={productInCart?.productsOrderTotal} />
      </Header>

      {pathname === '/eShop' && <EShopPage />}
      <Outlet />
    </>
  )
}
