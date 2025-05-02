import { createBrowserRouter } from 'react-router'
import RootLayout from '../pages/RootLayout'
import ReactPlayerPage from '../reactPlayer'
import CNBLayout from '../pages/sections/CNBLayout'
import ErrorBoundary from '../pages/ErrorPage'
import RTKMiddlewarePage from '../pages/rtk-middleware'
import * as RouteEshop from '../pages/eShop/routes'
import * as RouteSection from '../pages/sections/routes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: 'cnb',
        element: <CNBLayout />,
        children: [
          {
            path: 'section1',
            element: <RouteSection.IntroPage />,
          },
          {
            path: 'section2/reading-and-writing-files',
            element: <RouteSection.ReadingWritingFilePage />,
          },
          {
            path: 'section2/creating-simple-web-server',
            element: <RouteSection.CreatingSimpleWebServerPage />,
          },
          {
            path: 'section2/routing',
            element: <RouteSection.RoutingPage />,
          },
          {
            path: 'section2/templateProducts',
            element: <RouteSection.TempProductsPage />,
          },
          {
            path: 'section2/packageJSON',
            element: <RouteSection.PackageJSONPage />,
          },
          {
            path: 'section3/backendDevIntro',
            element: <RouteSection.IntroBackendDevPage />,
          },
          {
            path: 'section6/node_express_intro',
            element: <RouteSection.IntroNodeExpressPage />,
          },
          {
            path: 'section6/api_routes_methods',
            element: <RouteSection.ApiRoutesMethodsPage />,
          },
          {
            path: 'section6/api_routes_methods/:productName',
            element: <RouteSection.ProductDetailPage />,
          },
          {
            path: 'section13/deploy_with_heroku',
            element: <RouteSection.SetGitPage />,
          },
        ],
      },
      {
        path: 'reactPlayer',
        element: <ReactPlayerPage />,
      },
      {
        path: 'eShop',
        element: <RouteEshop.EshopLayout />,
        children: [
          {
            path: 'products',
            element: <RouteEshop.EShopPage />,
          },
          {
            path: 'cart',
            element: <RouteEshop.CartPage />,
          },
          {
            path: 'cart/order',
            element: <RouteEshop.OrderPage />,
          },
        ],
      },
      {
        path: 'rtk_middleware',
        element: <RTKMiddlewarePage />,
      },
    ],
  },
])
