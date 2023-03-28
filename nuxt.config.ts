// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  css: [
    '@/assets/css/main.css'
  ],

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/device',
    'nuxt-icon',
    'nuxt-swiper',
    [
      '@nuxtjs/i18n',
      {
        lazy: true,
        langDir: 'locales/',
        defaultLocale: 'en',
        strategy: 'prefix_except_default',
        seo: true,
        baseUrl: 'http://defipoolshare.io/',
        vueI18nLoader: true,
        vueI18n: {
          fallbackLocale: 'en'
        },
        locales: [
          {
            code: 'en',
            name: 'English',
            iso: 'en-US',
            file: 'en.yml'
          }
        ]
      }
    ]
  ],

  typescript: {
    strict: true
  }

})
