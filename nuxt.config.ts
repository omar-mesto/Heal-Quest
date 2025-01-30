export default defineNuxtConfig({

  app: {
    head: {
      link: [
        { href: '/manifest.json', rel: 'manifest' },
        {
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
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

  modules: ['vuetify-nuxt-module'],

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
