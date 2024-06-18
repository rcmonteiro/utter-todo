import { render } from '@testing-library/react'

import { NewTaskForm } from './new-task-form'

describe('NewTaskForm - unit tests', () => {
  it('should render the form', () => {
    const { getByPlaceholderText, getByRole } = render(NewTaskForm())
    expect(getByPlaceholderText('Create a new task')).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
    expect(getByRole('textbox')).toBeInTheDocument()
  })
})
