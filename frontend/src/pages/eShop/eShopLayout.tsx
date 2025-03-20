import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CartSwitcher, Header } from '../../Components'
import { EShopPage } from './index'

export function EshopLayout() {
  const { pathname } = useLocation()
  return (
    <>
      <title>eShop - Welcome</title>
      <meta name="keywords" content="shop, product, eshop" />

      <Header title={'eShop - Welcome'}>
        <CartSwitcher pageURL={'/eShop/cart'} />
      </Header>

      {pathname === '/eShop' && <EShopPage />}
      <Outlet />
    </>
  )
}
