import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { viteUnpluginPlugin } from '@fast-vue3/vite-config';

const root = process.cwd();
const appNames = readdirSync(resolve(root, 'apps'), { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() &&
      (entry.name.startsWith('web-') || entry.name.startsWith('site-')),
  )
  .map((entry) => entry.name);

for (const appName of appNames) {
  try {
    process.chdir(resolve(root, 'apps', appName));
    const autoImport = viteUnpluginPlugin({}).find(
      (plugin) => plugin.name === 'unplugin-auto-import',
    );
    if (typeof autoImport?.buildEnd !== 'function') {
      throw new TypeError('Auto import declaration generator is unavailable');
    }
    await autoImport.buildEnd();
  } finally {
    process.chdir(root);
  }
}
