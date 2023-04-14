<template>
  <div class="defi-PoolItem app-card" v-if="props.loan">
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

    <div class="grid-x2">
      <div>
        <div class="title">{{ $t("pool.form.label.amount") }}</div>
        <div class="volume">
          {{ props.loan.loanAmount }}
          {{
            getCurrencyByAddress(props.loan.acceptedToken)?.symbol.toUpperCase()
          }}
        </div>
      </div>
      <div>
        <div class="title">{{ $t("pool.form.label.duration") }}</div>
        <div class="volume">{{ dayjs(startTime?.to(endTime)) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { TokenAmount, Loan } from "~/lib/data/types";
import { getCurrencyByAddress } from "@/lib/data/currencies";

dayjs.extend(relativeTime);

// type Pool
type Props = {
  id: number;
  owner: string;
  token0: TokenAmount;
  token1: TokenAmount;
  owned: boolean;
  loan?: Loan;
};

const props = defineProps<Props>();

const startTime = computed(
  () => props.loan && dayjs(props.loan.startTime.toString())
);
const endTime = computed(
  () => props.loan && dayjs(props.loan.endTime.toString())
);
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

  .volume {
    font-size: 32px;
    line-height: 1;
    color: var(--color-1);
    margin-top: 8px;
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
