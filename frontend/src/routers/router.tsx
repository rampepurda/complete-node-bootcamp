import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../pages/RootLayout'
import ReactPlayerPage from '../reactPlayer'
import * as RouteSection1 from '../pages/sections/section_1/routes'
import * as RouteSection2 from '../pages/sections/section_2/routes'
import * as RouteSection3 from '../pages/sections/section_3/routes'
import * as RouteSection6 from '../pages/sections/section_6/routes'
import { Loader } from '../Components/Loader/Loader'
import ErrorBoundary from '../pages/ErrorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: 'reactPlayer',
        element: <ReactPlayerPage />,
      },
      {
        path: 'section1',
        element: <RouteSection1.IntroPage />,
      },
      {
        path: 'section2/reading-and-writing-files',
        element: <RouteSection2.ReadingWritingFilePage />,
      },
      {
        path: 'section2/creating-simple-web-server',
        element: <RouteSection2.CreatingSimpleWebServerPage />,
      },
      {
        path: 'section2/routing',
        element: <RouteSection2.RoutingPage />,
      },
      {
        path: 'section2/templateProducts',
        element: <RouteSection2.TempProductsPage />,
      },
      {
        path: 'section2/packageJSON',
        element: <RouteSection2.PackageJSONPage />,
      },
      {
        path: 'section3/backendDevIntro',
        element: <RouteSection3.IntroBackendDevPage />,
      },
      {
        path: 'section6/node_express_intro',
        element: <RouteSection6.IntroPage />,
      },
      {
        path: 'section6/api_routes_methods',
        element: <RouteSection6.ApiRoutesMethodsPage />,
      },
      {
        path: 'section6/api_routes_methods/:productName',
        element: <RouteSection6.ProductDetailPage />,
      },
    ],
  },
])
