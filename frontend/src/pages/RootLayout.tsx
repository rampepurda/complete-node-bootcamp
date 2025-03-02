import { Header } from '../Components'
import DocsPage from './docs'
import { useLocation } from 'react-router-dom'
import ReactPlayerPage from '../reactPlayer'
import React from 'react'

export default function RootLayout() {
  const { pathname } = useLocation()

  return (
    <>
      {pathname === '/reactPlayer' ? (
        <ReactPlayerPage />
      ) : (
        <>
          <Header />

          <main>
            <DocsPage />
          </main>
        </>
      )}
    </>
  )
}
