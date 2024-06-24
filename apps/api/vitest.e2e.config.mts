import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.test.ts'],
    globals: true,
    root: './',
    setupFiles: ['dotenv/config', './src/__tests__/setup-e2e.ts'],
    dir: 'src',
  },
  plugins: [tsConfigPaths()],
})
