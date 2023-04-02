<template>
  <div class="defi-PoolItem app-card">
    <h3 class="h3">
      <span class="grad-1">{{
        $t(`pool.item.title.${props.rented ? "rented" : "personal"}`)
      }}</span>
      <i>{{ props.shared }}%</i>
    </h3>
    <div class="field" v-if="!props.rented">
      <label for="text">{{ $t("pool.item.label.balance") }}</label>
      <DoubleCurrencies v-bind="props.balance" />
    </div>

    <hr class="app-hr" v-if="!props.rented" />

    <div class="field">
      <label for="text">{{ $t("pool.item.label.interests") }}</label>
      <DoubleCurrencies v-bind="props.interests" />
    </div>

    <div class="field">
      <div class="field-input">
        <Icon name="ph:currency-circle-dollar" />
        <input
          type="text"
          :value="
            displayCryptoPrice(
              currencyToDollar(props.interests.firstCurrency) +
                currencyToDollar(props.interests.secondCurrency)
            )
          "
          readonly
        />
      </div>
    </div>

    <button
      class="btn"
      :disabled="
        !(
          props.interests.firstCurrency.value ||
          props.interests.secondCurrency.value
        )
      "
    >
      {{ $t("pool.item.cta.claim") }}
    </button>

    <hr class="app-hr" v-if="props.rented" />

    <div class="app-paragraphe" v-if="props.rented">
      <ul>
        <li>
          Remaining time :
          <span class="grad-1">{{ dayjs(props.rent.endDate).fromNow() }}</span>
        </li>
      </ul>
    </div>

    <!-- Price : {{ `${props.price.value} ${props.price.currency.code}` }}
    <br />
    Duration : {{ `${props.duration} months` }} -->
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CurrencyAmount } from "~/lib/data/types";
import { currencyToDollar } from "~/utils/prices";

// type Pool
type Props = {
  rented: boolean;
  shared: number;
  balance: {
    firstCurrency: CurrencyAmount;
    secondCurrency: CurrencyAmount;
  };
  interests: {
    firstCurrency: CurrencyAmount;
    secondCurrency: CurrencyAmount;
  };
  price: CurrencyAmount;
  rent: {
    monthsDuration: number;
    endDate: Date;
  };
};

const props = defineProps<Props>();

dayjs.extend(relativeTime);
</script>

<style lang="scss">
.defi-PoolItem {
  display: flex;
  flex-direction: column;
  gap: var(--main-gap);

  h3 {
    display: flex;
    gap: var(--main-gap);
    align-items: center;
    justify-content: center;
    text-align: center;

    i {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      font-size: 14px;
      border-radius: 50%;
      font-weight: 700;
      // background-color: var(--color-1);
      color: black;
      background: var(--gradient-1);
    }
  }
}
</style>
