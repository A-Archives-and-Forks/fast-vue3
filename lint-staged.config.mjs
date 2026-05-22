export default {
  '*.{ts,tsx,mts,vue}': ['eslint --fix --max-warnings 0'],
  '*.{css,less,vue,scss}': ['stylelint --fix'],
  '*.{ts,tsx,mts,vue,js,mjs,json,md}': ['prettier --write'],
};
