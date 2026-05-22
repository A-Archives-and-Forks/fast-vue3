import { cac } from 'cac';
import { consola } from 'consola';

import { run } from './run';

try {
  const turboRun = cac('turbo-run');

  turboRun
    .command('[script]', 'Run a turbo script interactively')
    .usage('turbo-run [script]')
    .action(async (command: string) => {
      await run({ command });
    });

  turboRun.usage('turbo-run [script]');
  turboRun.help();
  turboRun.parse();
} catch (error) {
  consola.error(error);
  process.exit(1);
}
