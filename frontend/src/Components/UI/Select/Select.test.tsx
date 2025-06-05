import { render, screen } from '../../../test-utils/all-providers-test-util'
import userEvent from '@testing-library/user-event'
import { Select } from './Select'
import { dataMock } from '../../../__mock__/mock_data'

const user = userEvent.setup()

describe('Select Options', () => {
  test('After clicking on Select Options, expecting that selected option value will be: sortBy.', async () => {
    render(
      <Select name={'sort'} options={dataMock.options.eShop} onChange={(ev) => ev.target.value} />
    )

    const selectedOption = screen.getByRole('option', { name: /Sort by/i })

    expect(selectedOption).toBeInTheDocument()

    await user.click(selectedOption)
    expect(selectedOption).toHaveAttribute('value', 'sortBy')
  })
})
