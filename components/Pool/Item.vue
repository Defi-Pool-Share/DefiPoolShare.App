<template>
  <div class="defi-PoolItem app-card">
    <div class="header">
      <h3 class="h3">
        <span class="grad-1">{{
          `${props.token0.token.symbol} / ${props.token1.token.symbol}`
        }}</span>
        <!-- <i v-if="props.rented">{{ props.shared }}%</i> -->
      </h3>
      <a
        :href="`https://app.uniswap.org/#/pools/${props.id}`"
        target="_blank"
        class="btn-sm uni"
      >
        <span>UniSwap</span>
        <IconCSS name="material-symbols:arrow-outward" />
      </a>
    </div>

    <div class="field">
      <DoubleCurrencies
        :title="$t('pool.item.label.balance')"
        :display-volume="true"
        :display-balance="true"
        :first-currency="props.token0"
        :second-currency="props.token1"
      />
    </div>

    <!-- <hr class="app-hr" v-if="props.owned" />

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
    </button> -->

    <!-- <hr class="app-hr" v-if="!props.owned" />

    <div class="app-paragraphe" v-if="!props.owned">
      <ul>
        <li>
          {{ $t("pool.item.label.end_loan") }} :
          <span class="grad-1">{{ dayjs(props.rent.endDate).fromNow() }}</span>
        </li>
      </ul>
    </div> -->

    <template v-if="displayForm">
      <hr class="app-hr" v-if="props.owned" />

      <div class="field" v-if="props.owned">
        <PoolLoanForm :token-id="props.id" />
      </div>
    </template>
    <button class="btn" v-else @click="displayForm = true">
      {{ $t("pool.item.cta.loan") }}
    </button>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { TokenAmount } from "~/lib/data/types";

// type Pool
type Props = {
  id: number;
  owner: string;
  token0: TokenAmount;
  token1: TokenAmount;
  owned: boolean;
};

const props = defineProps<Props>();

const displayForm = ref(false);

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

  .app-hr {
    margin: 20px 0;
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
