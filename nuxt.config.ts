// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,
      networkId: process.env.NETWORK_ID,
      api: {
        app: process.env.APP_API,
        uniswap: process.env.UNISWAP_API,
        coingecko: process.env.COINGECKO_API,
      },
      contract: {
        lending: process.env.LENDING_CONTRACT_ADDRESS,
        uniswap: process.env.UNISWAP_CONTRACT_ADDRESS,
        dpst: process.env.DPST_CONTRACT_ADDRESS,
        usdt: process.env.USDT_CONTRACT_ADDRESS,
        usdc: process.env.USDC_CONTRACT_ADDRESS,
        weth: process.env.WETH_CONTRACT_ADDRESS,
        wbtc: process.env.WBTC_CONTRACT_ADDRESS,
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
