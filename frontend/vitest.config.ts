import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts', // upewnij się, że ścieżka jest poprawna
    // Wykluczamy folder e2e, aby Vitest go nie skanował
    exclude: [
      ...configDefaults.exclude, 
      'src/tests/e2e/**', 
      'tests/e2e/**'
    ],
    // Opcjonalnie: wymuś skanowanie tylko plików .test.tsx/ts 
    // aby uniknąć konfliktów z .spec.ts od Playwrighta
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});