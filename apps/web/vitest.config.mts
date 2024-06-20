import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    dir: 'src',
    setupFiles: ['./src/__tests__/setup-unit-tests.ts'],
    environment: 'happy-dom',
  },
})
