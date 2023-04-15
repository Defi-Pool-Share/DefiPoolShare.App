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
      startTime : {{ startTime }}<br /><br />
      endTime : {{ endTime }}<br /><br />
      creationTime : {{ creationTime }}<br /><br />
    </div>

    <hr class="app-hr" />

    <AppBanner v-bind="claimFeedback" v-if="claimFeedback.text !== ''">{{
      claimFeedback.text
    }}</AppBanner>

    <button class="btn" @click="handleClaim" :disabled="!isClaimable">
      {{ $t("pool.item.cta.claim") }}
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

const { claimFees, canClaimFees, getProvider } = useContractLending();

const claimFeedback: Feedback = reactive({
  text: "",
  loading: false,
  type: "info",
});

const isClaimable = ref(false);

const endTime = computed(
  () => props.loan && dayjs(parseInt(props.loan.endTime.toString(), 10))
);
const startTime = computed(
  () => props.loan && dayjs(parseInt(props.loan.startTime.toString(), 10))
);
const creationTime = computed(
  () => props.loan && dayjs(parseInt(props.loan.creationTime.toString(), 10))
);

dayjs.extend(relativeTime);

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
