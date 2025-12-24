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
                resolve(__dirname, 'pages/net/subnet_table_v6.html'),
                resolve(__dirname, 'pages/net/ipv6_fd00_48_generator.html'),
                resolve(__dirname, 'pages/net/snmpv3_config_gen.html'),
                resolve(__dirname, 'pages/string/mojibake_resolver.html'),
                resolve(__dirname, 'pages/string/password_generator.html'),
                resolve(__dirname, 'pages/string/password_hash_node.html'),
                resolve(__dirname, 'pages/string/kana_convert.html'),
                resolve(__dirname, 'pages/string/ascii_table.html'),
                resolve(__dirname, 'pages/string/string_counter.html'),
                resolve(__dirname, 'pages/string/notepad.html'),
                resolve(__dirname, 'pages/string/multi_line_to_single_line.html'),
                resolve(__dirname, 'pages/string/docker_cred.html'),
                resolve(__dirname, 'pages/string/tab_swap.html'),
            ]
        },
        target: ['edge129'],
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