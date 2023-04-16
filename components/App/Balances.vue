<template>
  <div class="defi-Balances">
    <div class="row" v-for="(currency, index) in currencies" :key="index">
      <div class="left">
        <!-- <img
            :src="secondCoinData.image"
            width="20"
            height="20"
            alt=""
            v-if="secondCoinData"
          /> -->
        <!-- <div class="coin-img" v-else /> -->
        <div class="coin-img"></div>
        <span>{{ currency.token.symbol.toUpperCase() }}</span>
      </div>
      <div class="right">
        <span>{{
          currency.value !== 0 ? displayPrice(currency.value) : "-"
        }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { dpst, usdt, usdc, weth, wbtc } from "@/lib/data/currencies";
import { useUserStore } from "~/stores/user";
import { ethers } from "ethers";

const userStore = useUserStore();
const { getBalance: getBalanceDPST } = useContractDPST();

const DPSTcurrency = reactive({ token: dpst, value: 0 });
const USDTcurrency = reactive({ token: usdt, value: 0 });
const USDCcurrency = reactive({ token: usdc, value: 0 });
const WETHcurrency = reactive({ token: weth, value: 0 });
const WBTCcurrency = reactive({ token: wbtc, value: 0 });

const currencies = computed(() => [
  DPSTcurrency,
  USDTcurrency,
  USDCcurrency,
  WETHcurrency,
  WBTCcurrency,
]);

const displayPrice = (amount: number) =>
  parseFloat(ethers.utils.formatEther(amount)).toFixed(2);

async function refreshData() {
  if (!userStore.user) {
    return;
  }

  DPSTcurrency.value = await getBalanceDPST(userStore.user.address);
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
}
</style>
