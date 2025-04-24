import { render, screen } from '../../../test-utils/rtk-providers-test-util'
import { OrderPageTest } from './orderPageTest'
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()

describe('Count', () => {
  test('After clicking, the count value increases to 20 and Error massage will be displayed', async () => {
    render(<OrderPageTest />)

    const btnInc = screen.getByRole('button', { name: /Increase/i })
    const btnSetError = screen.getByRole('button', { name: /Set Error/i })

    expect(btnInc).toBeInTheDocument()
    expect(btnSetError).toBeInTheDocument()
    expect(screen.getByLabelText('0')).toBeInTheDocument()

    await user.click(btnInc)
    expect(await screen.findByLabelText('20')).toBeInTheDocument()

    await user.click(btnSetError)
    expect(await screen.findByText('test setup error message')).toBeInTheDocument()
  })
})
