import type { PluginOption } from 'vite';

import type { NitroMockPluginOptions } from '../typing';

import { colors, consola, getPackage } from '@fast-vue3/node-utils';

import getPort from 'get-port';
import { build, createDevServer, createNitro, prepare } from 'nitropack';

const hmrKeyRe = /^runtimeConfig\.|routeRules\./;

/**
 * 把 mock 服务真实占用的端口回写给 vite 代理。
 *
 * vite 会先顺序执行插件的 configureServer 钩子，再安装代理中间件，
 * 因此这里改写 target 能被后续创建的代理实例读到。
 */
function patchProxyTarget(server: any, mockPort: number) {
  const proxy = server?.config?.server?.proxy as
    | Record<string, string | { target?: string }>
    | undefined;
  if (!proxy) {
    return;
  }
  for (const options of Object.values(proxy)) {
    if (options && typeof options === 'object') {
      options.target = `http://localhost:${mockPort}`;
    }
  }
}

export const viteNitroMockPlugin = ({
  mockServerPackage = '@fast-vue3/backend-mock',
  port = 5320,
  verbose = true,
}: NitroMockPluginOptions = {}): PluginOption => {
  return {
    async configureServer(server) {
      const pkg = await getPackage(mockServerPackage);
      if (!pkg) {
        consola.log(
          `Package ${mockServerPackage} not found. Skip mock server.`,
        );
        return;
      }

      // 端口可能被上一次异常退出的进程占用。此时静默跳过会让所有 /api 请求失败，
      // 因此顺延取一个空闲端口，并把真实端口同步给代理。
      const availablePort = await getPort({
        port,
        portRange: [port, port + 50],
      });
      if (availablePort !== port) {
        consola.warn(
          `Nitro Mock port ${port} is in use, using ${availablePort} instead.`,
        );
      }
      patchProxyTarget(server, availablePort);

      runNitroServer(pkg.dir, availablePort, verbose);

      const _printUrls = server.printUrls;
      server.printUrls = () => {
        _printUrls();

        consola.log(
          `  ${colors.green('➜')}  ${colors.bold('Nitro Mock Server')}: ${colors.cyan(`http://localhost:${availablePort}/api`)}`,
        );
      };
    },
    enforce: 'pre',
    name: 'vite:mock-server',
  };
};

async function runNitroServer(rootDir: string, port: number, verbose: boolean) {
  let nitro: any;
  const reload = async () => {
    if (nitro) {
      consola.info('Restarting dev server...');
      if ('unwatch' in nitro.options._c12) {
        await nitro.options._c12.unwatch();
      }
      await nitro.close();
    }
    nitro = await createNitro(
      {
        dev: true,
        preset: 'nitro-dev',
        rootDir,
      },
      {
        c12: {
          async onUpdate({ getDiff, newConfig }) {
            const diff = getDiff();
            if (diff.length === 0) {
              return;
            }
            if (verbose) {
              consola.info(
                `Nitro config updated:\n${diff.map((entry) => `  ${entry.toString()}`).join('\n')}`,
              );
            }
            await (diff.every((e) => hmrKeyRe.test(e.key))
              ? nitro.updateConfig(newConfig.config)
              : reload());
          },
        },
        watch: true,
      },
    );
    nitro.hooks.hookOnce('restart', reload);

    const server = createDevServer(nitro);
    await server.listen(port, { showURL: false });
    await prepare(nitro);
    await build(nitro);

    if (verbose) {
      consola.success(
        colors.bold(colors.green(`Nitro Mock Server started on port ${port}.`)),
      );
    }
  };
  return await reload();
}
