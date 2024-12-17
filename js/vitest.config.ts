import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            reporter: ['clover'],
            reportsDirectory: 'vitest-coverage',
        },
        environment: 'happy-dom',
    },
})