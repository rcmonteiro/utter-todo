import { render } from '@testing-library/react'

import { ThemeSwitcher } from './theme-switcher'

describe('ThemeSwitcher - unit tests', () => {
  it('should render the ThemeSwitcher', () => {
    const { getByRole } = render(<ThemeSwitcher />)
    expect(getByRole('button')).toBeInTheDocument()
  })
})
