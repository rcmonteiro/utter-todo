import { expect, test } from '@playwright/test'

test('list my tasks', async ({ page }) => {
  await page.goto('/tasks', { waitUntil: 'networkidle' })

  await expect(page.getByText('Pending Task')).toBeVisible()
  await expect(page.getByText('Completed Task')).toBeVisible()

  await page.getByRole('link', { name: 'Pending' }).click()
  await expect(page.getByText('Completed Task')).not.toBeVisible()

  await page.getByRole('link', { name: 'Completed' }).click()
  await expect(page.getByText('Pending Task')).not.toBeVisible()
})
