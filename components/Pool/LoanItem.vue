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
      <div class="grid-x2">
        <div>
          <div class="title">{{ $t("pool.form.label.amount") }}</div>
          <div class="volume">
            {{ ethers.utils.formatEther(props.loan.loanAmount) }}
            {{
              getCurrencyByAddress(
                props.loan.acceptedToken
              )?.symbol.toUpperCase()
            }}
          </div>
        </div>
        <div>
          <div class="title">{{ $t("pool.form.label.duration") }}</div>
          <div class="volume">{{ dayjs(creationTime).to(endTime, true) }}</div>
        </div>
      </div>
    </div>

    <div class="field" v-if="!isMine">
      <AppBanner v-bind="borrowFeedback" v-if="borrowFeedback.text !== ''">{{
        borrowFeedback.text
      }}</AppBanner>

      <button class="btn" :disabled="!isBuyable" @click="handleBuy">
        {{ $t("pool.item.cta.borrow") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { TokenAmount, Loan, Feedback } from "~/lib/data/types";
import { getCurrencyByAddress } from "@/lib/data/currencies";
import { useUserStore } from "~/stores/user";
import { ethers } from "ethers";
import { isString } from "~/lib/modules/definition";

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

const userStore = useUserStore();

const { borrowNFT, getProvider } = useContractLending();
const { approve } = useContractDPST();

const borrowFeedback: Feedback = reactive({
  text: "",
  loading: false,
  type: "info",
});

const endTime = computed(() => props.loan && dayjs.unix(props.loan.endTime));
const creationTime = computed(
  () => props.loan && dayjs.unix(props.loan.creationTime)
);

const isBuyable = computed(
  () =>
    props.loan && userStore.user && props.loan.lender !== userStore.user.address
);
const isMine = computed(
  () =>
    props.loan?.lender.toLowerCase() === userStore.user?.address.toLowerCase()
);

async function handleBuy() {
  const provider = await getProvider();

  if (!props.loan || !provider || !userStore.user) {
    return;
  }

  try {
    borrowFeedback.loading = true;
    borrowFeedback.type = "info";
    borrowFeedback.text = "Request approval for currency transfer.";
    
    let res = await approve(props.loan.loanAmount.toString());
    borrowFeedback.text = "Waiting for approval confirmation.";
    await provider.waitForTransaction(res.hash, 1);

    if (res) {
      borrowFeedback.text = "Borrow of your pool NFT in progress.";
      const res2 = await borrowNFT(props.loan.loanIndex);

      if (res2) {
        borrowFeedback.text = "Waiting for transaction confirmation.";
        await provider.waitForTransaction(res2.hash, 1);
        borrowFeedback.type = "success";
        borrowFeedback.text = "Borrow successful !";

        setTimeout(() => {
          document.body.dispatchEvent(new Event("needRefreshData"));
        }, 1000);
      }
    }
  } catch (e: any) {
    borrowFeedback.type = "danger";

    if (e.error && e.error.message) {
      borrowFeedback.text = e.error.message;
    } else if (e.message) {
      borrowFeedback.text = e.message;
    } else {
      (borrowFeedback.text = "Error : "), e;
    }
  }

  borrowFeedback.loading = false;
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
