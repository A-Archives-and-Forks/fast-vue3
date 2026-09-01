import type { Linter } from 'eslint';

import { interopDefault } from '../util';

export async function perfectionist(): Promise<Linter.Config[]> {
  const perfectionistPlugin = await interopDefault(
    import('eslint-plugin-perfectionist'),
  );

  return [
    perfectionistPlugin.configs['recommended-natural'],
    {
      rules: {
        'perfectionist/sort-exports': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-imports': [
          'error',
          {
            customGroups: [
              {
                selector: 'type',
                groupName: 'fast-vue3-type',
                elementNamePattern: '^@fast-vue3-core/.+',
              },
              {
                selector: 'type',
                groupName: 'fast-vue3-type',
                elementNamePattern: '^@fast-vue3/.+',
              },
              {
                selector: 'type',
                groupName: 'vue-type',
                elementNamePattern: ['^vue$', '^vue-.+', '^@vue/.+'],
              },
              {
                groupName: 'fast-vue3',
                elementNamePattern: '^@fast-vue3/.+',
              },
              {
                groupName: 'fast-vue3-core',
                elementNamePattern: '^@fast-vue3-core/.+',
              },
              {
                groupName: 'vue',
                elementNamePattern: ['^vue$', '^vue-.+', '^@vue/.+'],
              },
            ],
            environment: 'node',
            groups: [
              ['type-external', 'type-builtin', 'type-import'],
              'vue-type',
              'fast-vue3-type',
              ['type-parent', 'type-sibling', 'type-index'],
              ['type-internal'],
              'value-builtin',
              'vue',
              'fast-vue3',
              'fast-vue3-core',
              'value-external',
              'value-internal',
              ['value-parent', 'value-sibling', 'value-index'],
              'side-effect',
              'side-effect-style',
              'style',
              'ts-equals-import',
              'unknown',
            ],
            internalPattern: ['^#/.+'],
            newlinesBetween: 1,
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-modules': 'off',
        'perfectionist/sort-named-exports': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-objects': [
          'off',
          {
            customGroups: {
              items: 'items',
              list: 'list',
              children: 'children',
            },
            groups: ['unknown', 'items', 'list', 'children'],
            ignorePattern: ['children'],
            order: 'asc',
            type: 'natural',
          },
        ],
      },
    },
  ];
}
