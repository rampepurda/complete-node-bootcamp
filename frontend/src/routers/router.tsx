import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../pages/RootLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
  },
])
