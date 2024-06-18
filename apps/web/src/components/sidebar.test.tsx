import { render, screen } from '@testing-library/react'

import { Sidebar } from './sidebar'

describe('Sidebar - unit tests', () => {
  it('should render the sidebar', () => {
    render(<Sidebar currentStatus="ALL" />)
    expect(screen.getAllByRole('link')).toHaveLength(3)
    expect(screen.getAllByRole('button')).toHaveLength(1)
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.getByText('Log-out')).toBeInTheDocument()
  })
})
