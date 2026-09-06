#!/usr/bin/env node
/**
 * Build site-antd and web-antd and publish them to the `gh-pages` branch.
 *
 * GitHub Pages for this repo is configured as "Deploy from a branch", so the
 * only way to publish is to commit the built output to `gh-pages` and push it.
 *
 * Usage:
 *   pnpm deploy:pages                  # build both apps and push gh-pages
 *   pnpm deploy:pages -- --skip-build  # reuse the existing dist folders
 *   pnpm deploy:pages -- --dry-run     # build and stage, but do not push
 *   pnpm deploy:pages -- --force       # push with --force
 */

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);

const SITE_BASE = '/fast-vue3/';
const WEB_BASE = '/fast-vue3/web-antd/';
const WORKTREE_DIR = path.join(REPO_ROOT, 'dist', 'pages');

function parseArgs(argv) {
  const options = {
    branch: 'gh-pages',
    dryRun: false,
    force: false,
    message: '',
    remote: 'origin',
    skipBuild: false,
  };
  const positional = [];

  for (const arg of argv) {
    if (arg === '--') continue;
    if (!arg.startsWith('--')) {
      positional.push(arg);
      continue;
    }
    const [key, inlineValue] = arg.slice(2).split('=');
    const value = inlineValue ?? true;
    switch (key) {
      case 'branch': {
        options.branch = String(value);
        break;
      }
      case 'dry-run': {
        options.dryRun = true;
        break;
      }
      case 'force': {
        options.force = true;
        break;
      }
      case 'message': {
        options.message = String(value);
        break;
      }
      case 'remote': {
        options.remote = String(value);
        break;
      }
      case 'skip-build': {
        options.skipBuild = true;
        break;
      }
      default: {
        throw new Error(`Unknown option: --${key}`);
      }
    }
  }

  return options;
}

function capture(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? REPO_ROOT,
    encoding: 'utf8',
  });
  return { status: result.status ?? 1, stdout: (result.stdout ?? '').trim() };
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? REPO_ROOT,
    env: options.env ?? process.env,
    encoding: 'utf8',
    stdio: options.stdio ?? 'pipe',
  });
  if (result.status !== 0) {
    const detail = [result.stdout, result.stderr]
      .filter(Boolean)
      .join('\n')
      .trim();
    throw new Error(`${command} ${args.join(' ')} failed\n${detail}`);
  }
  return (result.stdout ?? '').trim();
}

function buildApp(appName, baseUrl) {
  const packageName = `@fast-vue3/${appName}`;
  console.log(`\n▶ building ${appName} (VITE_BASE_URL=${baseUrl})`);
  run('pnpm', ['-F', packageName, 'run', 'build'], {
    env: {
      ...process.env,
      VITE_APP_API_BASEURL: process.env.VITE_APP_API_BASEURL ?? '/api/v1',
      VITE_BASE_URL: baseUrl,
      VITE_STATIC_MOCK: process.env.VITE_STATIC_MOCK ?? 'true',
    },
    stdio: 'inherit',
  });

  const dist = path.join(REPO_ROOT, 'apps', appName, 'dist');
  if (!existsSync(path.join(dist, 'index.html'))) {
    throw new Error(`${appName} produced no dist/index.html at ${dist}`);
  }
  return dist;
}

/** Remove a leftover worktree directory from a previous run. */
async function resetWorktreeDir() {
  // Clear registrations whose worktree directory was removed by an aborted run.
  run('git', ['worktree', 'prune']);

  const listed = run('git', ['worktree', 'list', '--porcelain']);
  if (listed.includes(WORKTREE_DIR)) {
    run('git', ['worktree', 'remove', '--force', WORKTREE_DIR]);
  }
  if (existsSync(WORKTREE_DIR)) {
    await fs.rm(WORKTREE_DIR, { force: true, recursive: true });
  }
}

function remoteBranchExists(remote, branch) {
  const result = spawnSync('git', ['ls-remote', '--heads', remote, branch], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
  });
  // A network failure is not proof that the branch is missing.
  if (result.status !== 0) return null;
  return (result.stdout ?? '').trim().length > 0;
}

function localBranchExists(branch) {
  return (
    capture('git', ['rev-parse', '--verify', '--quiet', `refs/heads/${branch}`])
      .status === 0
  );
}

async function prepareWorktree(options) {
  await resetWorktreeDir();
  await fs.mkdir(path.dirname(WORKTREE_DIR), { recursive: true });

  const onRemote = remoteBranchExists(options.remote, options.branch);
  const onLocal = localBranchExists(options.branch);

  if (onRemote) {
    run('git', ['fetch', options.remote, options.branch]);
    run('git', [
      'worktree',
      'add',
      '-B',
      options.branch,
      WORKTREE_DIR,
      `${options.remote}/${options.branch}`,
    ]);
  } else if (onLocal) {
    run('git', [
      'worktree',
      'add',
      '-B',
      options.branch,
      WORKTREE_DIR,
      options.branch,
    ]);
  } else if (onRemote === null) {
    throw new Error(
      `Cannot reach ${options.remote} to check for ${options.branch}. Fix the network or pass --remote.`,
    );
  } else {
    console.log(
      `▶ ${options.branch} does not exist yet, creating an empty branch`,
    );
    run('git', ['worktree', 'add', '--detach', WORKTREE_DIR, 'HEAD']);
    run('git', ['checkout', '--orphan', options.branch], { cwd: WORKTREE_DIR });
    run('git', ['rm', '-rf', '--quiet', '.'], { cwd: WORKTREE_DIR });
  }
}

async function syncContent(siteDist, webDist) {
  // Clear the previous release. `git rm` keeps the history fast-forwardable,
  // so a plain push is enough and no force push is needed.
  run('git', ['rm', '-r', '--quiet', '--ignore-unmatch', '.'], {
    cwd: WORKTREE_DIR,
  });
  run('git', ['clean', '-fdxq', '-e', '.git'], { cwd: WORKTREE_DIR });

  await fs.cp(siteDist, WORKTREE_DIR, { recursive: true });
  await fs.cp(webDist, path.join(WORKTREE_DIR, 'web-antd'), {
    recursive: true,
  });

  // SPA fallback: Pages serves 404.html for unknown paths, and the router
  // then resolves the real route client side.
  await fs.copyFile(
    path.join(WORKTREE_DIR, 'index.html'),
    path.join(WORKTREE_DIR, '404.html'),
  );
  await fs.writeFile(path.join(WORKTREE_DIR, '.nojekyll'), '');
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  const siteDist = options.skipBuild
    ? path.join(REPO_ROOT, 'apps', 'site-antd', 'dist')
    : buildApp('site-antd', SITE_BASE);
  const webDist = options.skipBuild
    ? path.join(REPO_ROOT, 'apps', 'web-antd', 'dist')
    : buildApp('web-antd', WEB_BASE);

  for (const dist of [siteDist, webDist]) {
    if (!existsSync(path.join(dist, 'index.html'))) {
      throw new Error(`Missing ${dist}/index.html. Run a build first.`);
    }
  }

  console.log('\n▶ preparing gh-pages worktree');
  await prepareWorktree(options);
  await syncContent(siteDist, webDist);

  run('git', ['add', '-A'], { cwd: WORKTREE_DIR });
  const staged = run('git', ['diff', '--cached', '--name-only'], {
    cwd: WORKTREE_DIR,
  });
  if (staged === '') {
    console.log('\n✓ nothing changed, gh-pages is already up to date');
    return;
  }

  const message =
    options.message ||
    `docs: publish site-antd and web-antd previews to ${options.branch}`;
  run('git', ['commit', '-m', message], { cwd: WORKTREE_DIR });

  console.log(`\n▶ committed ${staged.split('\n').length} changed files`);
  console.log(`  worktree: ${WORKTREE_DIR}`);

  if (options.dryRun) {
    console.log(
      '\n--dry-run: skipping push. Inspect the worktree, then run without --dry-run.',
    );
    return;
  }

  console.log(`\n▶ pushing ${options.branch} to ${options.remote}`);
  run(
    'git',
    [
      'push',
      ...(options.force ? ['--force'] : []),
      options.remote,
      options.branch,
    ],
    {
      cwd: WORKTREE_DIR,
      stdio: 'inherit',
    },
  );
  console.log('\n✓ deployed. Pages rebuilds in a minute or two:');
  console.log(`  https://tobe-fe-dalao.github.io/fast-vue3/`);
  console.log(`  https://tobe-fe-dalao.github.io/fast-vue3/web-antd/`);
}

main().catch((error) => {
  console.error(`\n✗ ${error.message}`);
  process.exit(1);
});
