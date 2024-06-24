import { randomUUID } from 'node:crypto'

import { expect, test } from '@playwright/test'

test('Create a new task', async ({ page }) => {
  await page.goto('/tasks', { waitUntil: 'networkidle' })
  const newTaskTitle = `Task Test - ${randomUUID()}`
  await page.getByPlaceholder('Create a new task').fill(newTaskTitle)
  await page.getByRole('button', { name: 'Create new task' }).click()
  await expect(page.getByText(newTaskTitle)).toBeVisible()
})

test('List pending tasks', async ({ page }) => {
  await page.goto('/tasks', { waitUntil: 'networkidle' })
  const newTaskTitle = `Task Test - ${randomUUID()}`
  await page.getByPlaceholder('Create a new task').fill(newTaskTitle)
  await page.getByRole('button', { name: 'Create new task' }).click()
  await page.getByRole('link', { name: 'Pending' }).click()
  await expect(page.getByText(newTaskTitle)).toBeVisible()
})

test('Complete a task', async ({ page }) => {
  await page.goto('/tasks?status=PENDING', { waitUntil: 'networkidle' })
  const newTaskTitle = `Task Test - ${randomUUID()}`
  await page.getByPlaceholder('Create a new task').fill(newTaskTitle)
  await page.getByRole('button', { name: 'Create new task' }).click()
  await page
    .locator('label')
    .filter({ hasText: newTaskTitle })
    .getByLabel('Mark as completed')
    .click()
  await page.waitForTimeout(200)
  await page.getByRole('link', { name: 'Completed' }).click()
  await expect(page.getByText(newTaskTitle)).toBeVisible()
})
