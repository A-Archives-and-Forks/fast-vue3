import fs from 'fs';
import { resolve } from 'path';

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (envName === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch {
        realName = '';
      }
    }
    ret[envName] = realName;
    if (typeof realName === 'string') {
      process.env[envName] = realName;
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
}

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

/** 读取指定目录下的子目录列表（用于 plop 代码生成器） */
export const getFolder = (path: string) => {
  const components: string[] = [];
  const files = fs.readdirSync(path);
  files.forEach(function (item: string) {
    const stat = fs.lstatSync(path + '/' + item);
    if (stat.isDirectory() === true && item !== 'components') {
      components.push(path + '/' + item);
      components.push(pathResolve(path + '/' + item));
    }
  });
  return components;
};
