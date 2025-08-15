import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({    
    test: {
        environment: 'jsdom',
        dir: resolve(__dirname, 'src/test'),
        setupFiles: [resolve(__dirname, 'src/test/setup.ts')],
    },
})