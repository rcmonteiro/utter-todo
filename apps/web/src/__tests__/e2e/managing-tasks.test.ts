import { randomUUID } from 'node:crypto'

import { expect, test } from '@playwright/test'

test('Create a new task', async ({ page }) => {
  await page.goto('/tasks', { waitUntil: 'networkidle' })
  const newTaskTitle = `Task Test - ${randomUUID()}`
  await page.getByPlaceholder('Create a new task').fill(newTaskTitle)
  await page.getByRole('button', { name: 'Create new task' }).click()
  await expect(page.getByText(newTaskTitle)).toBeVisible()
})
