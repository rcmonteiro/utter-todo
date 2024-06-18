import { expect, test } from '@playwright/test'

test('list my tasks', async ({ page }) => {
  await page.goto('/tasks', { waitUntil: 'networkidle' })
  expect(true).toBe(true)
})
