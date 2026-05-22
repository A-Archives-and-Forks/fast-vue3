import type { CAC } from 'cac';

import { execa } from 'execa';
import { consola } from 'consola';

interface LintOptions {
  format?: boolean;
}

async function runLint({ format }: LintOptions) {
  try {
    if (format) {
      consola.info('Running formatters...');
      await execa('pnpm', ['exec', 'oxfmt'], { stdio: 'inherit' });
      await execa('pnpm', ['exec', 'oxlint', '--fix'], { stdio: 'inherit' });
      await execa('pnpm', ['exec', 'eslint', '.', '--cache', '--fix'], { stdio: 'inherit' });
      await execa(
        'pnpm',
        ['exec', 'stylelint', '"**/*.{vue,css,less,scss}"', '--cache', '--fix'],
        { stdio: 'inherit', shell: true },
      );
      consola.success('Formatting complete!');
    } else {
      consola.info('Running linters...');
      await Promise.all([
        execa('pnpm', ['exec', 'oxfmt', '--check'], { stdio: 'inherit' }),
        execa('pnpm', ['exec', 'oxlint'], { stdio: 'inherit' }),
        execa('pnpm', ['exec', 'eslint', '.', '--cache'], { stdio: 'inherit' }),
        execa(
          'pnpm',
          ['exec', 'stylelint', '"**/*.{vue,css,less,scss}"', '--cache'],
          { stdio: 'inherit', shell: true },
        ),
      ]);
      consola.success('Lint passed!');
    }
  } catch (error) {
    consola.error('Lint failed:', error);
    process.exit(1);
  }
}

function defineLintCommand(cac: CAC) {
  cac
    .command('lint')
    .usage('Run all project linters.')
    .option('--format', 'Auto-fix and format all lint issues.')
    .action(runLint);
}

export { defineLintCommand };
