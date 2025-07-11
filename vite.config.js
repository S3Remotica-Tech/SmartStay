import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.jsx',
     coverage: {
      reporter: ['text', 'lcov'], 
      exclude: [...configDefaults.coverage.exclude, './src/setupTests.jsx'],
    },
  },
})
