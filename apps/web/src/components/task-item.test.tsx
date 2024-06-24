import { render } from '@testing-library/react'

import { TaskItem } from './task-item'

vitest.mock('next/navigation', () => ({
  useRouter: () => ({
    pathname: '/tasks',
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}))

describe('TaskItem - unit tests', () => {
  it('should render the TaskItem', () => {
    const task = {
      id: '1',
      title: 'Task 1',
      createdAt: '2022-01-01T00:00:00.000Z',
    }
    const { getByText } = render(<TaskItem task={task} />)
    expect(getByText('Task 1')).toBeInTheDocument()
  })
})
