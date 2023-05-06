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

    <div class="app-hr"></div>

<div class="field">
  <DoubleCurrencies
    :title="$t('pool.item.label.interests')"
    :display-volume="true"
    :display-balance="true"
    :first-currency="poolFees.token0"
    :second-currency="poolFees.token1"
  />
</div>

    <template v-if="!props.loan.isActive">

<p class="app-paragraphe">
  <ul>
    <li>
      {{ $t('pool.item.label.end_loan') }} :
      <span class="grad-1">{{
        dayjs().to(endTime)
      }}</span>
    </li>
  </ul>
</p>

<AppBanner v-bind="withdrawFeedback" v-if="withdrawFeedback.text !== ''">{{
  withdrawFeedback.text
}}</AppBanner>

<button class="btn" @click="handleWithdraw" :disabled="!isWithdrawable">
  {{ $t("pool.item.cta.withdraw") }}
</button>
    </template>
    <template v-else>
      <p class="app-paragraphe">
  <ul>
    <li>
      Loan not borrowed yet.
    </li>
  </ul>
</p>
    </template>


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

const { withdrawNFT, getProvider, getClaimableFees } = useContractLending();


const withdrawFeedback: Feedback = reactive({
  text: "",
  loading: false,
  type: "info",
});

const isWithdrawable = computed(() => dayjs().diff(endTime.value) > 0);

const endTime = computed(() => props.loan && dayjs.unix(props.loan.endTime));

const poolFees: {
  token0: TokenAmount;
  token1: TokenAmount;
} = reactive({
  token0: {
    token: props.token0.token,
    value: 0,
  },
  token1: {
    token: props.token1.token,
    value: 0,
  },
});


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

onMounted(async () => {
  if (props.loan) {
    const fees = await getClaimableFees(props.loan.loanIndex);

    if (fees) {
      poolFees.token0.value = parseFloat(fees.amount0);
      poolFees.token1.value = parseFloat(fees.amount1);
    }
  }
});
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
