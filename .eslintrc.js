/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

module.exports = {
  env: {
    node: true,
  },

  extends: [
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:vue/vue3-recommended',
    // './.eslintrc-auto-import.json',
    'eslint:recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/stylistic',
    'plugin:@stylistic/recommended-extends',
    'plugin:perfectionist/recommended-natural-legacy',
    // 'plugin:prettier/recommended',
    // 'plugin:@tanstack/query/recommended',
  ],

  ignorePatterns: ['vite-env.d.ts', 'node_modules/'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'unused-imports',
    '@stylistic',
    'perfectionist',
  ],
  root: false,
  rules: {
    '@stylistic/arrow-parens': 'off',
    '@stylistic/brace-style': 'off',
    '@stylistic/indent': 'off',
    '@stylistic/indent-binary-ops': 'off',
    '@stylistic/member-delimiter-style': 'off',
    '@stylistic/operator-linebreak': 'off',
    '@stylistic/quote-props': 'off',

    '@tanstack/query/infinite-query-property-order': 'off',

    '@typescript-eslint/no-unused-vars': 'off',

    'import/extensions': [
      'error',
      'ignorePackages',
      { ts: 'never', vue: 'always' },
    ],
    'newline-before-return': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        vars: 'all',
        varsIgnorePattern: '^_',
      },
    ],
    'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        ignores: ['swiper-container', 'swiper-slide', 'vue-dropzone'],
        registeredComponentsOnly: false,
      },
    ],
    'vue/multi-word-component-names': 'off',
    'vue/no-mutating-props': [
      'error',
      {
        shallowOnly: false,
      },
    ],
    'vue/no-v-html': 'off',
    'vue/padding-line-between-blocks': ['error', 'always'],
  },
  settings: {
    'import/resolver': {

      alias: {
        extensions: ['.vue', '.ts', 'js'],
        map: [['@@', './']],

      },

    },

  },
}
