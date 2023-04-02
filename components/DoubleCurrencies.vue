<template>
  <div class="double grid">
    <div>
      <div class="field-input">
        <input
          type="text"
          :value="`${displayCryptoPrice(
            props.firstCurrency.value
          )} ${props.firstCurrency.currency.code.toUpperCase()}`"
          readonly
        />
      </div>
    </div>

    <div class="icon-wrap">
      <IconCSS class="icon" name="ic:round-swap-horiz" />
    </div>

    <div>
      <div class="field-input">
        <input
          type="text"
          :value="`${displayCryptoPrice(
            props.secondCurrency.value
          )} ${props.secondCurrency.currency.code.toUpperCase()}`"
          readonly
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CurrencyAmount } from "~/lib/data/types";
import { displayCryptoPrice } from "~/utils/prices";

type Props = {
  firstCurrency: CurrencyAmount;
  secondCurrency: CurrencyAmount;
};

const props = defineProps<Props>();
</script>

<style lang="scss">
.grid {
  > div {
    width: calc(50% - 20px);
  }

  > .icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
  }
}
</style>
