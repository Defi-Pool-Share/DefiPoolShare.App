<template>
  <div class="form">
    <h3 class="h3">
      <span class="grad-1">{{ $t("pool.item.title.loan") }}</span>
    </h3>
    <div class="field">
      <label for="text">{{ $t("pool.form.label.amount") }}</label>
      <div class="field-input">
        <input
          id="amount"
          type="number"
          placeholder="Amount"
          v-model="amount"
        />
      </div>
    </div>

    <div class="field">
      <label for="text">{{ $t("pool.form.label.currency") }}</label>
      <div class="fields">
        <label
          class="check-button"
          v-for="(input, index) in currencyInputs"
          :key="index"
        >
          <input
            :id="`currency_${input.value}`"
            type="radio"
            name="currency"
            v-model="currency"
            :value="input.value"
          />
          <span v-if="input.label !== 'cryptocurrency:dpst'">
            <IconCSS class="icon" :name="input.label"></IconCSS>
          </span>
          <span v-else>
            <SvgSigle />
          </span>
        </label>
      </div>
    </div>

    <div class="wrap">
      <div class="field small">
        <label for="text">{{ $t("pool.form.label.duration") }}</label>
        <div class="field-input">
          <input
            id="duration_time"
            type="number"
            name="duration_time"
            v-model="duration_time"
          />
        </div>
      </div>
      <div class="field">
        <div class="fields">
          <label
            class="check-button"
            v-for="(input, index) in durationInputs"
            :key="index"
          >
            <input
              :id="`duration_${input.value}`"
              type="radio"
              name="duration"
              v-model="duration"
              :value="input.value"
            />
            <span>{{ input.label }}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="field">
      <button class="btn" :disabled="!isSubmittable" @click="openPopin">
        {{ $t("pool.item.cta.submit") }}
      </button>
    </div>
    <AppPopin
      v-if="popinOpen"
      :title="$t('pool.form.popin.title')"
      :close="closePopin"
    >
      <template #content>
        <div class="grid-x2">
          <div>
            <div class="title">{{ $t("pool.form.label.amount") }}</div>
            <div class="volume">
              {{ amount }}
              {{ getCurrencyByAddress(currency)?.symbol.toUpperCase() }}
            </div>
          </div>
          <div>
            <div class="title">{{ $t("pool.form.label.duration") }}</div>
            <div class="volume">
              {{ duration_time }}
              {{
                durationInputs.find((input) => input.value === duration)?.label
              }}
            </div>
          </div>
        </div>

        <AppBanner type="danger">{{ $t("pool.form.popin.warning") }}</AppBanner>

        <AppBanner
          v-bind="depositFeedback"
          v-if="depositFeedback.text !== ''"
          >{{ depositFeedback.text }}</AppBanner
        >
      </template>
      <template #actions>
        <button @click="closePopin" class="btn">Close</button>
        <button
          @click="handleSubmit"
          class="btn-success"
          :disabled="depositFeedback.loading"
        >
          Confirm
        </button>
      </template>
    </AppPopin>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { whitelistedTokens, getCurrencyByAddress } from "@/lib/data/currencies";
import { isValue } from "~/lib/modules/definition";
import { useUserStore } from "~/stores/user";
import { Feedback } from "@/lib/data/types";
import { ethers } from "ethers";

dayjs.extend(utc);

type Props = {
  tokenId: number;
};

const props = defineProps<Props>();

const amount = ref(null);
const currency = ref(null);
const duration = ref(null);
const duration_time = ref(null);
const popinOpen = ref(false);
const depositFeedback: Feedback = reactive({
  text: "",
  loading: false,
  type: "info",
});
const isSubmittable = computed(
  () =>
    isValue(amount.value) &&
    amount.value > 0 &&
    isValue(currency.value) &&
    isValue(duration.value) &&
    isValue(duration_time.value) &&
    duration_time.value > 0
);

const { depositNFT } = useContractLending();
const { isApprovalForAll, setApprovalForAll, getProvider } =
  useContractUniswap();

const userStore = useUserStore();

const currencyInputs = computed(() =>
  whitelistedTokens.map((token) => ({
    label: `cryptocurrency:${token.symbol}`,
    value: token.address,
  }))
);

const durationInputs = [
  {
    label: "day(s)",
    value: 86400000,
  },
  {
    label: "month(s)",
    value: 2592000000,
  },
  {
    label: "year(s)",
    value: 31536000000,
  },
];

function openPopin() {
  popinOpen.value = true;
}
function closePopin() {
  popinOpen.value = false;
  depositFeedback.text = "";
}
async function handleSubmit() {
  if (!userStore.user) {
    return;
  }

  const tokenId = props.tokenId; // NFT id of the Uniswap V3 pool representation
  const wantedDuration = dayjs().utc().add(10, "minute").unix(); // @TODO

  const provider = await getProvider();

  if (!provider) {
    return;
  }

  try {
    depositFeedback.loading = true;
    depositFeedback.type = "info";
    depositFeedback.text = "Checking approval for your pool NFT.";
    let isApproved = await isApprovalForAll(userStore.user.address);

    if (isApproved !== null && !isApproved) {
      depositFeedback.text = "Setting approval for your pool NFT.";
      const res = await setApprovalForAll(userStore.user.address);
      if (res) {
        await provider.waitForTransaction(res.hash, 1);
        depositFeedback.text = "Re-Checking approval for your pool NFT.";
      }

      isApproved = await isApprovalForAll(userStore.user.address);
    }

    if (isApproved !== null && isApproved) {
      depositFeedback.text = "Deposit of your pool NFT in progress.";
      const res2 = await depositNFT(
        tokenId,
        amount.value!,
        wantedDuration,
        currency.value!
      );
      if (res2) {
        depositFeedback.text = "Waiting for transaction confirmation.";
        await provider.waitForTransaction(res2.hash, 1);
        depositFeedback.text = "Deposit done !";
        depositFeedback.type = "success";

        setTimeout(() => {
          document.body.dispatchEvent(new Event("needRefreshData"));
          depositFeedback.text = "";
        }, 1000);
      }
    } else {
      depositFeedback.text = "Approval not passed.";
      depositFeedback.type = "danger";
    }
  } catch (e: any) {
    depositFeedback.type = "danger";

    if (e.error && e.error.message) {
      depositFeedback.text = e.error.message;
    } else if (e.message) {
      depositFeedback.text = e.message;
    } else {
      (depositFeedback.text = "Error : "), e;
    }
  }

  depositFeedback.loading = false;
}
</script>

<style lang="scss" scoped>
.form {
  .h3 {
    justify-content: flex-start;
  }
  .field {
    margin-top: var(--main-padding);
  }
  .fields {
    display: flex;
    gap: var(--main-gap);
  }
  .wrap {
    display: flex;
    align-items: flex-end;
    gap: var(--main-gap);

    > * {
      flex-shrink: 0;
      flex-grow: 1;
    }

    > .small {
      flex-shrink: 1;
      flex-grow: 0;
      width: 100px;
    }
  }
  .check-button {
    flex: 1;

    .icon {
      background-color: var(--txt-1);
      font-size: 24px;
    }

    .sigle {
      width: 24px;
      height: auto;
      filter: grayscale(1);
    }

    input {
      display: none;

      &:checked + span {
        border-color: var(--color-1);
        color: var(--color-1);

        .icon {
          background-color: var(--color-1);
        }

        .sigle {
          filter: grayscale(0);
        }
      }
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--height);
      background: transparent;
      border: 2px solid rgb(var(--bg-2-rgb), 0.75);
      color: var(--txt-1);
      border-radius: calc(var(--height) / 5);
      transition: border-color 0.3s;
      cursor: pointer;

      &:hover {
        border-color: var(--bg-2);
      }
    }
  }
}
</style>
