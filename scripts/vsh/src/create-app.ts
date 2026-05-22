import type { CAC } from 'cac';

import { consola } from 'consola';

const UI_FRAMEWORKS = ['antd', 'ele', 'naive', 'arco', 'tdesign'] as const;

type UIFramework = (typeof UI_FRAMEWORKS)[number];

const FRAMEWORK_DEPS: Record<UIFramework, { pkg: string; name: string }> = {
  antd: { pkg: 'ant-design-vue', name: 'Ant Design Vue' },
  ele: { pkg: 'element-plus', name: 'Element Plus' },
  naive: { pkg: 'naive-ui', name: 'Naive UI' },
  arco: { pkg: '@arco-design/web-vue', name: 'Arco Design Vue' },
  tdesign: { pkg: 'tdesign-vue-next', name: 'TDesign Vue Next' },
};

interface CreateAppOptions {
  framework?: UIFramework;
}

async function runCreateApp(_opts: CreateAppOptions) {
  consola.info('Available UI frameworks:');
  UI_FRAMEWORKS.forEach((fw, i) => {
    consola.info(`  ${i + 1}. ${FRAMEWORK_DEPS[fw].name} (web-${fw})`);
  });
  consola.warn(
    'Interactive app creation is not yet implemented.\n' +
      'Please manually copy an existing app directory and update its package.json.',
  );
}

function defineCreateAppCommand(cac: CAC) {
  cac
    .command('create-app')
    .usage('Scaffold a new app in the monorepo.')
    .option('--framework <fw>', 'UI framework (antd|ele|naive|arco|tdesign)')
    .action(runCreateApp);
}

export { defineCreateAppCommand };
