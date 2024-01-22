import { resolve } from 'path'
import { defineConfig } from 'vite'
import simpleHtmlPlugin from 'vite-plugin-simple-html';
import vue from '@vitejs/plugin-vue'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
    build: {
        rollupOptions: {
            input: [
                resolve(__dirname, 'index.html'),
                resolve(__dirname, 'pages/html/sri_hash_calc.html'),
                resolve(__dirname, 'pages/net/doh_client.html'),
                resolve(__dirname, 'pages/net/subnet_table_v4.html'),
            ]
        },
    },
    plugins: [
        simpleHtmlPlugin({
            minify: true,
        }),
        vue(),
        sitemap({
            hostname: process.env['VITE_BASE_URL'] ?? 'http://localhost',
        }),
    ]
})