import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'dist',
  clean: true,
  dts: {
    sourcemap: false,
  },
  platform: 'node',
  external: [
    'vite',
    'unocss',
    '@vitejs/plugin-vue',
    '@vitejs/plugin-vue-jsx',
    'unplugin-auto-import',
    'unplugin-vue-components',
    'unplugin-vue-router',
    'vite-plugin-mock',
    'vite-plugin-svg-icons',
    'vite-plugin-compression',
    'rollup-plugin-visualizer',
  ],
});
