import type { ApplicationPluginOptions } from '../typing';

import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { fs } from '@fast-vue3/node-utils';

import dotenv from 'dotenv';

const getBoolean = (value: string | undefined) => value === 'true';

const getString = (value: string | undefined, fallback: string) =>
  value ?? fallback;

const getNumber = (value: string | undefined, fallback: number) =>
  Number(value) || fallback;

const getDevBackend = (value: string | undefined) => {
  if (value === undefined || value === 'mock' || value === 'server') {
    return value ?? 'mock';
  }

  throw new Error(
    `Invalid VITE_DEV_BACKEND value "${value}". Expected "mock" or "server".`,
  );
};

/**
 * 获取当前环境下生效的配置文件名
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script as string;
  const reg = /--mode ([\d_a-z]+)/;
  const result = reg.exec(script);
  let mode = 'production';
  if (result) {
    mode = result[1] as string;
  }
  return ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`];
}

/**
 * Get the environment variables starting with the specified prefix
 * @param match prefix
 * @param confFiles ext
 */
async function loadEnv<T = Record<string, string>>(
  match = 'VITE_GLOB_',
  confFiles = getConfFiles(),
) {
  let envConfig = {};

  for (const confFile of confFiles) {
    try {
      const confFilePath = join(process.cwd(), confFile);
      if (existsSync(confFilePath)) {
        const envPath = await fs.readFile(confFilePath, {
          encoding: 'utf8',
        });
        const env = dotenv.parse(envPath);
        envConfig = { ...envConfig, ...env };
      }
    } catch (error) {
      console.error(`Error while parsing ${confFile}`, error);
    }
  }
  const reg = new RegExp(`^(${match})`);
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });

  const processEnvConfig = Object.fromEntries(
    Object.entries(process.env).filter(
      ([key, value]) => reg.test(key) && value !== undefined,
    ),
  );

  return { ...envConfig, ...processEnvConfig } as T;
}

async function loadAndConvertEnv(
  match = 'VITE_',
  confFiles = getConfFiles(),
): Promise<
  Partial<ApplicationPluginOptions> & {
    apiTarget: string;
    appTitle: string;
    base: string;
    devBackend: 'mock' | 'server';
    port: number;
  }
> {
  const envConfig = await loadEnv(match, confFiles);
  const {
    VITE_APP_TITLE,
    VITE_ARCHIVER,
    VITE_BASE,
    VITE_BASE_URL,
    VITE_COMPRESS,
    VITE_DEV_BACKEND,
    VITE_DEVTOOLS,
    VITE_FAST_VUE3_SERVER_URL,
    VITE_INJECT_APP_LOADING,
    VITE_PORT,
    VITE_PWA,
    VITE_VISUALIZER,
  } = envConfig;

  const compressTypes = (VITE_COMPRESS ?? '')
    .split(',')
    .filter((item) => item === 'brotli' || item === 'gzip');
  const devBackend = getDevBackend(VITE_DEV_BACKEND);

  return {
    apiTarget:
      devBackend === 'server'
        ? getString(VITE_FAST_VUE3_SERVER_URL, 'http://localhost:8080')
        : 'http://localhost:5320',
    appTitle: getString(VITE_APP_TITLE, 'Vue H5 Template'),
    archiver: getBoolean(VITE_ARCHIVER),
    // 应用侧统一使用 VITE_BASE_URL（router 也读它），这里兼容旧名 VITE_BASE
    base: getString(VITE_BASE_URL ?? VITE_BASE, '/'),
    compress: compressTypes.length > 0,
    compressTypes,
    devBackend,
    devtools: getBoolean(VITE_DEVTOOLS),
    injectAppLoading: getBoolean(VITE_INJECT_APP_LOADING),
    ...(VITE_DEV_BACKEND !== undefined && {
      nitroMock: devBackend === 'mock',
    }),
    port: getNumber(VITE_PORT, 5173),
    pwa: getBoolean(VITE_PWA),
    visualizer: getBoolean(VITE_VISUALIZER),
  };
}

export { loadAndConvertEnv, loadEnv };
