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
    :title="$t('pool.item.label.interests')"
    :display-volume="true"
    :display-balance="true"
    :first-currency="poolFees.token0"
    :second-currency="poolFees.token1"
  />
</div>

<div class="app-hr"></div>


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

    <AppBanner v-bind="claimFeedback" v-if="claimFeedback.text !== ''">{{
      claimFeedback.text
    }}</AppBanner>

    <button class="btn" @click="handleClaim" :disabled="!isClaimable">
      {{ $t("pool.item.cta.claim_fees") }}
    </button>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { Loan, TokenAmount, Feedback } from "~/lib/data/types";

dayjs.extend(relativeTime);
dayjs.extend(utc);

// type Pool
type Props = {
  id: number;
  owner: string;
  token0: TokenAmount;
  token1: TokenAmount;
  loan?: Loan;
};

const props = defineProps<Props>();

const { claimFees, canClaimFees, getProvider, getClaimableFees } = useContractLending();

const claimFeedback: Feedback = reactive({
  text: "",
  loading: false,
  type: "info",
});

const isClaimable = ref(false);

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

async function handleClaim() {
  const provider = await getProvider();

  if (!props.loan || !provider) {
    return;
  }

  try {
    claimFeedback.loading = true;
    claimFeedback.type = "info";
    claimFeedback.text = "Claim your fees in progress.";
    const res = await claimFees(props.loan.loanIndex);

    if (res) {
      claimFeedback.text = "Waiting for transaction confirmation.";
      await provider.waitForTransaction(res.hash, 1);
      claimFeedback.type = "success";
      claimFeedback.text = "Claim successful !";

      setTimeout(() => {
        document.body.dispatchEvent(new Event("needRefreshData"));
      }, 1000);
    }
  } catch (e: any) {
    claimFeedback.type = "danger";

    if (e.error && e.error.message) {
      claimFeedback.text = e.error.message;
    } else if (e.message) {
      claimFeedback.text = e.message;
    } else {
      (claimFeedback.text = "Error : "), e;
    }
  }

  claimFeedback.loading = false;
}

onMounted(async () => {
  if (!props.loan) {
    return;
  }

  isClaimable.value = await canClaimFees(props.loan.loanIndex);

  if (props.loan) {
    const fees = await getClaimableFees(props.loan.loanIndex);

    if (fees) {
      poolFees.token0.value = parseFloat(fees[0].toString());
      poolFees.token1.value = parseFloat(fees[1].toString());
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
