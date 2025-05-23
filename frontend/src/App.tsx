import './styles/main.scss'
import React from 'react'
import { RouterProvider } from 'react-router'
import { router as routers } from './routers/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './i18n/config'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routers} />
    </QueryClientProvider>
  )
}

export default App
