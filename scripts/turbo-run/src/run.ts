import { cancel, isCancel, select } from '@clack/prompts';
import { execa } from 'execa';
import { consola } from 'consola';

interface AppInfo {
  name: string;
  pkg: string;
  port: number;
}

const APPS: AppInfo[] = [
  { name: 'Ant Design Vue (web-antd)', pkg: '@fast-vue3/web-antd', port: 3001 },
  { name: 'Element Plus (web-ele)', pkg: '@fast-vue3/web-ele', port: 3002 },
  { name: 'Naive UI (web-naive)', pkg: '@fast-vue3/web-naive', port: 3003 },
  { name: 'Arco Design (web-arco)', pkg: '@fast-vue3/web-arco', port: 3004 },
  { name: 'TDesign (web-tdesign)', pkg: '@fast-vue3/web-tdesign', port: 3005 },
];

interface RunOptions {
  command?: string;
}

export async function run(options: RunOptions) {
  const { command = 'dev' } = options;

  let selectedPkg: string | symbol;

  if (APPS.length > 1) {
    selectedPkg = await select<string>({
      message: `Select the app to run [${command}]:`,
      options: APPS.map((app) => ({
        label: `${app.name}  →  localhost:${app.port}`,
        value: app.pkg,
      })),
    });

    if (isCancel(selectedPkg) || !selectedPkg) {
      cancel('Operation cancelled');
      process.exit(0);
    }
  } else {
    selectedPkg = APPS[0]?.pkg ?? '';
  }

  consola.info(`Starting ${String(selectedPkg)} [${command}]...`);

  await execa(
    'pnpm',
    ['--filter', String(selectedPkg), 'run', command],
    { stdio: 'inherit' },
  );
}
