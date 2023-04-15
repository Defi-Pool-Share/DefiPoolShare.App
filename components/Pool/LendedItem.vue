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

    <div class="field">
      <DoubleCurrencies
        :title="$t('pool.item.label.balance')"
        :display-volume="true"
        :display-balance="true"
        :first-currency="props.token0"
        :second-currency="props.token1"
      />
    </div>

    <hr class="app-hr" />

    <AppBanner v-bind="withdrawFeedback" v-if="withdrawFeedback.text !== ''">{{
      withdrawFeedback.text
    }}</AppBanner>

    <button class="btn" @click="handleWithdraw" :disabled="!isWithdrawable">
      {{ $t("pool.item.cta.withdraw") }}
    </button>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Loan, TokenAmount, Feedback } from "~/lib/data/types";

// type Pool
type Props = {
  id: number;
  owner: string;
  token0: TokenAmount;
  token1: TokenAmount;
  loan?: Loan;
};

const props = defineProps<Props>();

const { withdrawNFT, getProvider } = useContractLending();

const withdrawFeedback: Feedback = reactive({
  text: "",
  loading: false,
  type: "info",
});

const isWithdrawable = computed(() => true); // @TODO

dayjs.extend(relativeTime);

async function handleWithdraw() {
  const provider = await getProvider();

  if (!props.loan || !provider) {
    return;
  }

  try {
    withdrawFeedback.loading = true;
    withdrawFeedback.type = "info";
    withdrawFeedback.text = "Withdraw of your pool NFT in progress.";
    const res = await withdrawNFT(props.loan.loanIndex);

    if (res) {
      withdrawFeedback.text = "Waiting for transaction confirmation.";
      await provider.waitForTransaction(res.hash, 1);
      withdrawFeedback.type = "success";
      withdrawFeedback.text = "Withdraw successful !";

      setTimeout(() => {
        document.body.dispatchEvent(new Event("needRefreshData"));
      }, 1000);
    }
  } catch (e: any) {
    withdrawFeedback.type = "danger";

    if (e.error && e.error.message) {
      withdrawFeedback.text = e.error.message;
    } else if (e.message) {
      withdrawFeedback.text = e.message;
    } else {
      (withdrawFeedback.text = "Error : "), e;
    }
  }

  withdrawFeedback.loading = false;
}
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
