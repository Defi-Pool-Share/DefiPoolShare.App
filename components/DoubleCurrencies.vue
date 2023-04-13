<template>
  <div class="double-currencies">
    <div class="title">{{ props.title }}</div>
    <div class="volume" v-if="displayVolume">{{ volume }}</div>
    <div class="content">
      <div class="row">
        <div class="left">
          <img
            :src="firstCoinData.image"
            width="20"
            height="20"
            alt=""
            v-if="firstCoinData"
          />
          <div class="coin-img" v-else />
          <span>{{ props.firstCurrency.token.symbol.toUpperCase() }}</span>
        </div>
        <div class="right">
          <span>{{ displayCryptoPrice(props.firstCurrency.value) }}</span>
        </div>
      </div>

      <div class="row">
        <div class="left">
          <img
            :src="secondCoinData.image"
            width="20"
            height="20"
            alt=""
            v-if="secondCoinData"
          />
          <div class="coin-img" v-else />
          <span>{{ props.secondCurrency.token.symbol.toUpperCase() }}</span>
        </div>
        <div class="right">
          <span>{{ displayCryptoPrice(props.secondCurrency.value) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CGCoin, TokenAmount } from "~/lib/data/types";
import { isValue } from "~/lib/modules/definition";
import { displayCryptoPrice } from "~/utils/prices";

type Props = {
  title: string;
  firstCurrency: TokenAmount;
  secondCurrency: TokenAmount;
  displayBalance?: boolean;
  displayVolume?: boolean;
};

const props = defineProps<Props>();

const { getCoinData, getTwoCoinsVolume } = useCoinGecko();
const firstCoinData: Ref<CGCoin | null> = ref(null);
const secondCoinData: Ref<CGCoin | null> = ref(null);

const fetchData = async () => {
  firstCoinData.value = await getCoinData(props.firstCurrency.token.address);
  secondCoinData.value = await getCoinData(props.secondCurrency.token.address);
};

const volume = computed(() =>
  displayDollars(
    isValue(firstCoinData.value) && isValue(secondCoinData.value)
      ? getTwoCoinsVolume({
          first: {
            value: props.firstCurrency.value,
            price: firstCoinData.value.current_price,
          },
          second: {
            value: props.secondCurrency.value,
            price: secondCoinData.value.current_price,
          },
        })
      : 0
  )
);

fetchData();
</script>

<style lang="scss">
.double-currencies {
  .content {
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    gap: 12px;
    padding: 12px;
    border-radius: var(--main-radius);
    margin-top: 12px;
  }

  .volume {
    font-size: 32px;
    color: var(--color-1);
    margin-top: 8px;
  }

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
