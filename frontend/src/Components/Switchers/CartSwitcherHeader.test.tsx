import { render, screen } from '@testing-library/react'
import { CartSwitcherD2 } from './SwitcherDummy'
import { createMemoryRouter, RouterProvider } from 'react-router'

/*
const memoRouterCartSwitch = createMemoryRouter([
  {
    path: '/',
    element: <CartSwitcherD pageURL={'/eShop'} ariaCartStatus={true} itemTotal={0} />,
  },
])
 */

describe('Cart ico Dummy', () => {
  test('BTN is included', () => {
    render(<CartSwitcherD2 pageURL={'/eShop'} ariaCartStatus={true} itemTotal={0} />)

    expect(screen.getByRole('button')).toHaveTextContent('dummyBTN')
  })
})
