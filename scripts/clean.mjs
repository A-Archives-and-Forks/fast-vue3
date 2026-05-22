import { rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(__dirname, '..');

const DIRS_TO_CLEAN = ['dist', '.turbo', 'node_modules', '.cache'];

const WORKSPACE_DIRS = ['apps', 'packages', 'internal', 'scripts'];

async function cleanDir(dirPath) {
  if (existsSync(dirPath)) {
    await rm(dirPath, { recursive: true, force: true });
    console.log(`✓ Cleaned: ${dirPath.replace(root, '')}`);
  }
}

async function main() {
  const targets = [root];

  for (const wsDir of WORKSPACE_DIRS) {
    const wsDirPath = join(root, wsDir);
    if (!existsSync(wsDirPath)) continue;
    const entries = readdirSync(wsDirPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        targets.push(join(wsDirPath, entry.name));
        // For nested dirs like packages/@core/*
        const nestedPath = join(wsDirPath, entry.name);
        if (entry.name.startsWith('@')) {
          const nested = readdirSync(nestedPath, { withFileTypes: true });
          for (const n of nested) {
            if (n.isDirectory()) targets.push(join(nestedPath, n.name));
          }
        }
      }
    }
  }

  const tasks = targets.flatMap((pkg) =>
    DIRS_TO_CLEAN.map((dir) => cleanDir(join(pkg, dir))),
  );

  await Promise.all(tasks);
  console.log('\nClean complete!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
