/** @param {import('prettier').Config} [overrides] */
export function defineConfig(overrides = {}) {
  return {
    printWidth: 100,
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    proseWrap: 'never',
    htmlWhitespaceSensitivity: 'strict',
    endOfLine: 'lf',
    vueIndentScriptAndStyle: true,
    ...overrides,
  };
}
