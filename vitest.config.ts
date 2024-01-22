import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            reporter: ['clover'],
        },
        environment: 'happy-dom',
    },
})