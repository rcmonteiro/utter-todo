import { render } from '@testing-library/react'

import { Logo } from './logo'

describe('Logo - unit tests', () => {
  it('should render the logo', () => {
    const { getByText, getByRole } = render(<Logo />)
    expect(getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(getByText('Utter Todo')).toBeInTheDocument()
  })
})
