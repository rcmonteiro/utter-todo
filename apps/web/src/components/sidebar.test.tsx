import { render } from '@testing-library/react'

import { Sidebar } from './sidebar'

describe('Sidebar - unit tests', () => {
  it('should render the sidebar', () => {
    const { getAllByRole, getByText } = render(Sidebar())
    expect(getAllByRole('button')).toHaveLength(4)
    expect(getByText('All')).toBeInTheDocument()
    expect(getByText('Pending')).toBeInTheDocument()
    expect(getByText('Completed')).toBeInTheDocument()
    expect(getByText('Log-out')).toBeInTheDocument()
  })
})
