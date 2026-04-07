import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

import prettierPlugin from 'eslint-plugin-prettier';
import tailwindcssPlugin from 'eslint-plugin-tailwindcss';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // 무시할 폴더
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'node_modules/**',
    'public/**',
    '.vscode/**',
    'coverage/**',
    '*.config.js',
    '*.config.mjs',
  ]),

  // 커스텀 설정 추가
  {
    plugins: {
      prettier: prettierPlugin,
      tailwindcss: tailwindcssPlugin,
    },
    extends: ['plugin:@tanstack/eslint-plugin-query/recommended'],

    rules: {
      'prettier/prettier': 'error',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',

      // Tailwind CSS 룰: 정렬(classnames-order)은 Prettier가 하도록 끔
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-custom-classname': 'off',

      eqeqeq: ['error', 'always'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
]);

export default eslintConfig;
