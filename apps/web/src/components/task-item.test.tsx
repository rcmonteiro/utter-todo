import { render } from '@testing-library/react'

import { TaskItem } from './task-item'

describe('TaskItem - unit tests', () => {
  it('should render the TaskItem', () => {
    const { getByRole } = render(<TaskItem />)
    expect(getByRole('checkbox')).toBeInTheDocument()
  })
})
