import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Dashboard } from '../Components'

export default function RootLayout() {
  const { pathname } = useLocation()
  return (
    <>
      <title>Complete Node Bootcamp</title>
      <meta name="author" content="michal" />
      <meta name="keywords" content="node" />

      {pathname === '/' && <Dashboard />}
      <Outlet />
    </>
  )
}
