import { render, screen } from '../../../test-utils/all-providers-test-util'
import { OrderBox } from '../Components/OrderBox'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'

const piece = 2
const handleInc = () => {
  return piece * 3
}
const priceTotal = handleInc()
const user = userEvent.setup()
const orderBoxRoute = createMemoryRouter([
  {
    path: '/',
    element: (
      <OrderBox
        piece={piece}
        priceTotal={priceTotal}
        incHandler={() => piece * 3}
        decHandler={() => {}}
      />
    ),
  },
])

describe('Cart Order Box', () => {
  test('Initial values: piece: 2, priceTotal: 3, price per piece: 3. After clicking priceTotal will be 6.', async () => {
    render(<RouterProvider router={orderBoxRoute} />)

    const btnInc = screen.getByRole('spinbutton')

    expect(btnInc).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()

    await user.click(btnInc)
    expect(await screen.findByText('6')).toBeInTheDocument()
  })
})
