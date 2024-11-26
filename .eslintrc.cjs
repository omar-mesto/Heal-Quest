module.exports={
    env:{
        node:true
    },
    parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    "ecmaVersion": 6
  },
  root:true,
    extends:[
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@nuxt/eslint-config'
    ],
    "rules":{
        "vue/multi-word-component-names":"off",
        "linebreak-style": ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"]
    },
    "settings": {
      "import/resolver": {
        alias: {
          extensions: ['.vue', '.ts'],
          map: [
            ['~~', './'],
          ],
        },
        // "node": {
        //   "extensions": [".js",".ts",".vue"]
        // }
      }
    },
}