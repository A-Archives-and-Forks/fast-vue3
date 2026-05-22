import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetAttributify(), presetIcons(), presetUno()],
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      success: 'var(--color-success)',
      warning: 'var(--color-warning)',
      error: 'var(--color-error)',
      info: 'var(--color-info)',
    },
  },
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'wh-full': 'w-full h-full',
  },
});
