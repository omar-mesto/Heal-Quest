export default defineNuxtConfig({

  app: {
    head: {
      link: [
        { href: '/manifest.json', rel: 'manifest' },
        {
          rel: 'stylesheet',
        },
      ],
    },
  },
  build: {
    transpile: ['vuetify'],
  },

  buildModules: [
    'nuxt-vite',
    // ['@pinia/nuxt', { disableVuex: true }]
  ],

  compatibilityDate: '2024-11-14',
  css: [
    '@/assets/styles/scss/main.scss',
  ],

  devtools: {
    enabled: true,

  },

  eslint: {

    checker: true,
    configType: 'eslintrc',
  },

  imports: {
    autoImport: true,
  },

  modules: ['vuetify-nuxt-module','@pinia/nuxt','pinia-plugin-persistedstate/nuxt'],

  shim: true,

  vite: {
    define: {
      'process.env.DEBUG': false,
    },

  },

  vuetify: {
    moduleOptions: {

    },
    vuetifyOptions: {
      defaults: {

        VDateInput: {
          density: 'comfortable',
          hideDetails: 'auto',
          variant: 'outlined',
        },
        VFileInput: {
          density: 'comfortable',
          hideDetails: 'auto',
          variant: 'outlined',

        },
        VTextField: {
          density: 'comfortable',
          hideDetails: 'auto',
          variant: 'outlined',
        },
      },
      labComponents: true,
      // components: ['VDateInput'],
      theme: {
        themes: {
          light: {
            colors: {
              primary: '#2260FF',
            },
            dark: false,
          },
        },

      },
    },
  },
},
)