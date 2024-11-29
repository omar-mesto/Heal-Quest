export default defineNuxtConfig({
  // devtools: { enabled: true },
  shim: true,

  css: [
    'vuetify/lib/styles/main.sass',
    '@/assets/styles/scss/main.scss'
  ],

  build: {
    transpile: ['vuetify']
  },

  vite: {

    define: {
      'process.env.DEBUG': false
    },
  },

  modules: ['vuetify-nuxt-module'],

  eslint: {

    checker: true,
    configType: 'eslintrc'
  },

  vuetify: {
    moduleOptions: {

    },
    vuetifyOptions: {
      theme: {
        themes: {
          light: {
            dark: false,
            colors: {
              primary: '#2260FF'
            }
          }
        }
      }
    }
  },

  app: {
    head: {
      link: [
        { rel: 'manifest', href: '/manifest.json' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
        }
      ]
    }
  },

  compatibilityDate: '2024-11-14',

  devtools: {
    enabled: true
  }
}
)