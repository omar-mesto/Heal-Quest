module.exports={
  env:{
    node:true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    'ecmaVersion': 6,
  },
  root:true,
  extends:[
    'eslint:recommended',

    // '@vue/eslint-config-typescript',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:vue/vue3-strongly-recommended',

    // '@nuxt/eslint-config'
    // 'eslint:recommended',
    // '@nuxt/eslint-config',
    // "plugin:nuxt/recommended"
  ],
  'rules':{
      
    '@typescript-eslint/no-unused-vars': 'error',
    'array-bracket-newline': ['error', 'consistent'],
    'array-element-newline': ['error', 'consistent'],
    'comma-dangle': ['error', 'always-multiline'],
    'import/extensions': ['error', 'ignorePackages', { ts: 'never', vue: 'always' }],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'lines-around-comment': [
      'error',
      {
        allowArrayStart: true,
        allowBlockStart: true,
        allowClassStart: true,
        allowObjectStart: true,
        beforeBlockComment: true,
        beforeLineComment: true,
      },
    ],
    'newline-before-return': 'error',
    'object-curly-spacing': ['error', 'always'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
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
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      ignores: ['swiper-container', 'swiper-slide', 'vue-dropzone'],
      registeredComponentsOnly: false,
    }],
    'vue/multi-word-component-names': 'off',
    'vue/no-mutating-props': ['error', {
      shallowOnly: false,
    }],
    'vue/no-v-html': 'off',
    'vue/padding-line-between-blocks': ['error', 'always'],
      
  },
  'settings': {
    'import/resolver': {
      alias: {
        extensions: ['.vue', '.ts'],
        map: [
          ['~~', './'],
          // ['@', './'],
        ],
      },
    },
  },
}