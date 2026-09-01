import type { UserConfig } from 'vite';

import { resolve } from 'node:path';

async function getCommonConfig(): Promise<UserConfig> {
  const root = process.cwd();
  return {
    resolve: {
      alias: {
        '@': resolve(root, 'src'),
        '#': resolve(root, 'types'),
      },
    },
    build: {
      chunkSizeWarningLimit: 2000,
      reportCompressedSize: false,
      sourcemap: false,
    },
  };
}

export { getCommonConfig };
