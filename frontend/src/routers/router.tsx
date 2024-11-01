import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../pages/RootLayout'
import * as RouteSection from '../pages/sections/routes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    children: [
      {
        path: 'Section1',
        element: <RouteSection.SectionOnePage />,
      },
      {
        path: 'Section2/reading-and-writing-files',
        element: <RouteSection.ReadingWritingFilePageSec2 />,
      },
    ],
  },
])
