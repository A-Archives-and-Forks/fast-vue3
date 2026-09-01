import type { PluginVisualizerOptions } from 'rollup-plugin-visualizer';
import type { ConfigEnv, PluginOption, UserConfig } from 'vite';
import type { PluginOptions } from 'vite-plugin-dts';
import type { Options as PwaPluginOptions } from 'vite-plugin-pwa';

interface IImportMap {
  imports?: Record<string, string>;
  scopes?: {
    [scope: string]: Record<string, string>;
  };
}

interface PrintPluginOptions {
  infoMap?: Record<string, string | undefined>;
}

interface NitroMockPluginOptions {
  mockServerPackage?: string;
  port?: number;
  verbose?: boolean;
}

interface ArchiverPluginOptions {
  name?: string;
  outputDir?: string;
}

interface ImportmapPluginOptions {
  defaultProvider?: 'esm.sh' | 'jspm.io';
  importmap?: Array<{ name: string; range?: string }>;
  inputMap?: IImportMap;
}

interface ConditionPlugin {
  condition?: boolean;
  plugins: () => PluginOption[] | PromiseLike<PluginOption[]>;
}

interface CommonPluginOptions {
  devtools?: boolean;
  env?: Record<string, any>;
  injectMetadata?: boolean;
  isBuild?: boolean;
  mode?: string;
  /**
   * 仅传给 unplugin-auto-import 的 resolvers。
   * 无前缀、大小写不敏感的 resolver(如 PrimeVueResolver)传给 AutoImport
   * 会把 v-for 变量等普通标识符误判为组件,这类场景应传空数组。
   * 未指定时回退为 uiResolvers。
   */
  uiAutoImportResolvers?: any[];
  /**
   * UI 组件库 resolvers (如 AntDesignVueResolver, ElementPlusResolver 等)
   */
  uiResolvers?: any[];
  visualizer?: boolean | PluginVisualizerOptions;
}

interface ApplicationPluginOptions extends CommonPluginOptions {
  archiver?: boolean;
  archiverPluginOptions?: ArchiverPluginOptions;
  compress?: boolean;
  compressTypes?: ('brotli' | 'gzip')[];
  extraAppConfig?: boolean;
  html?: boolean;
  i18n?: boolean;
  importmap?: boolean;
  importmapOptions?: ImportmapPluginOptions;
  injectAppLoading?: boolean;
  license?: boolean;
  nitroMock?: boolean;
  nitroMockOptions?: NitroMockPluginOptions;
  print?: boolean;
  printInfoMap?: PrintPluginOptions['infoMap'];
  pwa?: boolean;
  pwaOptions?: Partial<PwaPluginOptions>;
  tailwind?: boolean;
}

interface LibraryPluginOptions extends CommonPluginOptions {
  dts?: boolean | PluginOptions;
}

type ApplicationOptions = ApplicationPluginOptions;
type LibraryOptions = LibraryPluginOptions;

type DefineApplicationOptions = (config?: ConfigEnv) => Promise<{
  application?: ApplicationOptions;
  vite?: UserConfig;
}>;

type DefineLibraryOptions = (config?: ConfigEnv) => Promise<{
  library?: LibraryOptions;
  vite?: UserConfig;
}>;

type DefineConfig = DefineApplicationOptions | DefineLibraryOptions;

export type {
  ApplicationPluginOptions,
  ArchiverPluginOptions,
  CommonPluginOptions,
  ConditionPlugin,
  DefineApplicationOptions,
  DefineConfig,
  DefineLibraryOptions,
  IImportMap,
  ImportmapPluginOptions,
  LibraryPluginOptions,
  NitroMockPluginOptions,
  PrintPluginOptions,
};
