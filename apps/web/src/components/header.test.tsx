import { render } from '@testing-library/react'

import { Header } from './header'

describe('Header - unit tests', () => {
  it('should render the header', () => {
    const { getByText, getByRole } = render(<Header />)
    expect(getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
    expect(getByText('Utter Todo')).toBeInTheDocument()
  })
})
