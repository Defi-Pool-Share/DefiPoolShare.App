// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,
      networkId: process.env.NETWORK_ID,
      api: {
        uniswap: process.env.UNISWAP_API,
        coingecko: process.env.COINGECKO_API,
      },
      contract: {
        lending: process.env.LENDING_CONTRACT_ADDRESS,
        uniswap: process.env.UNISWAP_CONTRACT_ADDRESS,
        dpst: process.env.DPST_CONTRACT_ADDRESS,
      },
    },
  },

  plugins: [{ src: "~/plugins/global.client.js" }],

  css: ["@/assets/css/main.css"],

  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/device",
    "@pinia/nuxt",
    "nuxt-icon",
    "nuxt-swiper",
    [
      "@nuxtjs/i18n",
      {
        lazy: true,
        langDir: "locales/",
        defaultLocale: "en",
        strategy: "prefix_except_default",
        seo: true,
        baseUrl: "http://defipoolshare.io/",
        vueI18nLoader: true,
        vueI18n: {
          fallbackLocale: "en",
        },
        locales: [
          {
            code: "en",
            name: "English",
            iso: "en-US",
            file: "en.yml",
          },
        ],
      },
    ],
  ],

  typescript: {
    strict: true,
  },
});
