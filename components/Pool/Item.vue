<template>
  <div class="defi-PoolItem app-card">
    <div class="header">
      <h3 class="h3">
        <span class="grad-1">{{
          `${props.balance.firstCurrency.currency.symbol} / ${props.balance.secondCurrency.currency.symbol}`
        }}</span>
        <i v-if="props.rented">{{ props.shared }}%</i>
      </h3>
      <a href="" class="btn-sm uni">
        <span>UniSwap</span>
        <IconCSS name="material-symbols:arrow-outward" />
      </a>
    </div>

    <div class="field" v-if="!props.rented">
      <DoubleCurrencies
        :title="$t('pool.item.label.balance')"
        :display-volume="true"
        :display-balance="true"
        v-bind="props.balance"
      />
    </div>

    <hr class="app-hr" v-if="!props.rented" />

    <div class="field">
      <DoubleCurrencies
        :display-volume="true"
        :title="$t('pool.item.label.interests')"
        v-bind="props.interests"
      />
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
          {{ $t("pool.item.label.end_loan") }} :
          <span class="grad-1">{{ dayjs(props.rent.endDate).fromNow() }}</span>
        </li>
      </ul>
    </div>

    <hr class="app-hr" v-if="!props.rented" />

    <div class="field" v-if="!props.rented">
      <PoolLoanForm />
    </div>
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

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .uni {
    svg {
      width: 20px;
      height: 20px;
    }
  }

  h3 {
    display: flex;
    gap: var(--main-gap);
    align-items: center;
    justify-content: center;
    text-align: center;

    span {
      text-transform: uppercase;
    }

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
