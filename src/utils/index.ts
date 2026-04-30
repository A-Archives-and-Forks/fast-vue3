import fs from 'fs';
import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export const getFolder = (path: string) => {
  const components: Array<string> = [];
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
