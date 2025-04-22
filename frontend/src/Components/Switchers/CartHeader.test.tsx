import { render, screen } from '../../test-utils/all-providers-test-util'
import { CartSwitcher } from './Switcher'
import { createMemoryRouter, RouterProvider } from 'react-router'

const memoRouterCart = createMemoryRouter([
  {
    path: '/',
    element: <CartSwitcher pageURL={'/'} ariaCartStatus={false} itemTotal={10} />,
  },
])
const memoRouterCartIsEmpty = createMemoryRouter([
  {
    path: '/',
    element: <CartSwitcher pageURL={'/'} ariaCartStatus={true} itemTotal={0} />,
  },
])

describe('Cart', () => {
  test('Includes 10 products in the Cart', async () => {
    render(<RouterProvider router={memoRouterCart} />)

    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByTestId('cartIsFull')).toBeInTheDocument()
  })

  test('Cart is empty', async () => {
    render(<RouterProvider router={memoRouterCartIsEmpty} />)

    expect(screen.getByTestId('cartIsEmpty')).toBeInTheDocument()
  })
})
