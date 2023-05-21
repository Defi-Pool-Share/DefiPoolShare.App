<template>
  <div class="defi-Balances">
    <div class="row" v-for="(currency, index) in currencies" :key="index">
      <div class="left">
        <img
          :src="currency.img"
          width="20"
          height="20"
          alt=""
          v-if="currency.img"
        />
        <div class="coin-img" v-else />
        <span>{{ currency.token.symbol.toUpperCase() }}</span>
      </div>
      <div class="right">
        <span>{{
          currency.value.toString() !== "0" ? displayPrice(currency) : "-"
        }}</span>
      </div>
    </div>
    <div class="loading" v-if="isLoading">
      <SvgSpinner />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { dpst, usdt, usdc, weth, wbtc } from "@/lib/data/currencies";
import { useUserStore } from "~/stores/user";
import { Token } from "~/lib/data/types";

const { getCoinData, fetchAllCoinsData } = useCoinGecko();

const isLoading = ref(false);

const userStore = useUserStore();
const { getBalance: getBalanceDPST } = useContractDPST();
const { getBalance: getBalanceUSDT } = useContractUSDT();
const { getBalance: getBalanceUSDC } = useContractUSDC();
const { getBalance: getBalanceWETH } = useContractWETH();
const { getBalance: getBalanceWBTC } = useContractWBTC();

const DPSTcurrency = reactive({ token: dpst, value: 0, img: "" });
const USDTcurrency = reactive({ token: usdt, value: 0, img: "" });
const USDCcurrency = reactive({ token: usdc, value: 0, img: "" });
const WETHcurrency = reactive({ token: weth, value: 0, img: "" });
const WBTCcurrency = reactive({ token: wbtc, value: 0, img: "" });

const currencies = computed(() => [
  DPSTcurrency,
  USDTcurrency,
  USDCcurrency,
  WETHcurrency,
  WBTCcurrency,
]);

const displayPrice = (currency: {
  token: Token;
  value: number;
  img: string;
}) => {
  let decimals = 0;
  switch (currency.token.symbol) {
    case "dpst":
      decimals = 18;
      break;
    case "usdt":
      decimals = 6;
      break;
    case "usdc":
      decimals = 6;
      break;
    case "weth":
      decimals = 18;
      break;
    case "wbtc":
      decimals = 8;
      break;
    default:
      break;
  }

  return (currency.value / 10 ** decimals).toLocaleString();
};

async function refreshData() {
  if (!userStore.user) {
    return;
  }

  isLoading.value = true;

  try {
    await fetchAllCoinsData();
  } catch (e) {
    console.error(e);
  }

  try {
    const [dpstValue, usdtValue, usdcValue, wethValue, wbtcValue] =
      await Promise.all([
        getBalanceDPST(userStore.user.address),
        getBalanceUSDT(userStore.user.address),
        getBalanceUSDC(userStore.user.address),
        getBalanceWETH(userStore.user.address),
        getBalanceWBTC(userStore.user.address),
      ]);

    DPSTcurrency.value = dpstValue;
    USDTcurrency.value = usdtValue;
    USDCcurrency.value = usdcValue;
    WETHcurrency.value = wethValue;
    WBTCcurrency.value = wbtcValue;
  } catch (e) {
    console.error(e);
  }

  try {
    const [dpstData, usdtData, usdcData, wethData, wbtcData] =
      await Promise.all([
        getCoinData(DPSTcurrency.token),
        getCoinData(USDTcurrency.token),
        getCoinData(USDCcurrency.token),
        getCoinData(WETHcurrency.token),
        getCoinData(WBTCcurrency.token),
      ]);

    if (dpstData) {
      DPSTcurrency.img = dpstData.image;
    } else {
      DPSTcurrency.img = "/img/sigle.svg";
    }
    if (usdtData) {
      USDTcurrency.img = usdtData.image;
    }
    if (usdcData) {
      USDCcurrency.img = usdcData.image;
    }
    if (wethData) {
      WETHcurrency.img = wethData.image;
    }
    if (wbtcData) {
      WBTCcurrency.img = wbtcData.image;
    }
  } catch (e) {
    console.error(e);
  }

  isLoading.value = false;
}

watch(
  () => userStore.user,
  async (newUser) => {
    if (newUser && newUser.address) {
      refreshData();
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss">
.defi-Balances {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--main-gap);
  background-color: rgba(var(--bg-2-rgb), 0.6);
  padding: var(--aside-gutter);
  border-radius: var(--aside-radius);

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  img {
    border-radius: 50%;
  }

  .coin-img {
    width: 20px;
    height: 20px;
    background-color: black;
    border-radius: 50%;
  }

  .loading {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(var(--bg-2-rgb), 1);
    border-radius: var(--aside-radius);

    path {
      fill: var(--color-1);
    }
  }
}
</style>
