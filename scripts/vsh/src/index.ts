import { cac } from 'cac';
import { consola } from 'consola';

import { defineLintCommand } from './lint';
import { defineCreateAppCommand } from './create-app';

const VERSION = '1.0.0';

const COMMAND_DESCRIPTIONS = {
  lint: 'Run all linters (oxfmt + oxlint + eslint + stylelint)',
  'create-app': 'Scaffold a new app in the monorepo',
} as const;

async function main(): Promise<void> {
  try {
    const vsh = cac('vsh');

    defineLintCommand(vsh);
    defineCreateAppCommand(vsh);

    vsh.usage('vsh <command> [options]');
    vsh.help();
    vsh.version(VERSION);

    vsh.parse(undefined, { run: false });

    if (!vsh.matchedCommand && vsh.args.length > 0) {
      const unknownCmd = String(vsh.args[0]);
      consola.error(`Invalid command: ${unknownCmd}`);
      consola.info(
        'Available commands:\n' +
          Object.entries(COMMAND_DESCRIPTIONS)
            .map(([name, desc]) => `  ${name} - ${desc}`)
            .join('\n'),
      );
      process.exit(1);
    }

    await vsh.runMatchedCommand();
  } catch (error) {
    consola.error('An unexpected error occurred:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  consola.error('Failed to start CLI:', error);
  process.exit(1);
});
