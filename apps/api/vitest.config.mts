import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.test.ts'],
    globals: true,
    root: './',
    setupFiles: ['dotenv/config', './tests/setup-e2e.ts'],
    dir: 'src',
  },
  plugins: [tsConfigPaths()],
})
