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
          <span>
            <IconCSS class="icon" :name="input.label"></IconCSS>
          </span>
        </label>
      </div>
    </div>

    <div class="field">
      <label for="text">{{ $t("pool.form.label.duration") }}</label>
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
        <ul>
          <li>
            Amount :
            <span class="grad-1"
              >{{ amount }}
              {{ getCurrencyByAddress(currency).symbol.toUpperCase() }}</span
            >
          </li>
          <li>
            Duration : <span class="grad-1">{{ duration }} month(s)</span>
          </li>
        </ul>

        <AppBanner type="warning">{{
          $t("pool.form.popin.warning")
        }}</AppBanner>
      </template>
      <template #actions>
        <button @click="closePopin" class="btn">Close</button>
        <button @click="handleSubmit" class="btn-success">Confirm</button>
      </template>
    </AppPopin>
  </div>
</template>

<script setup>
import { whitelistedTokens, getCurrencyByAddress } from "@/lib/data/currencies";
import { isValue } from "~/lib/modules/definition";
const amount = ref(null);
const currency = ref(null);
const duration = ref(null);
const popinOpen = ref(false);
const isSubmittable = computed(
  () =>
    isValue(amount.value) && isValue(currency.value) && isValue(duration.value)
);

const { depositNFT } = useContractLending();

const currencyInputs = computed(() =>
  whitelistedTokens.map((token) => ({
    label: `cryptocurrency:${token.symbol}`,
    value: token.address,
  }))
);

const durationInputs = [
  {
    label: "1 month",
    value: 1,
  },
  {
    label: "3 months",
    value: 3,
  },
  {
    label: "6 months",
    value: 6,
  },
];

function openPopin() {
  popinOpen.value = true;
}
function closePopin() {
  popinOpen.value = false;
}
async function handleSubmit() {
  const tokenId = 0; // NFT id of the Uniswap V3 pool representation

  const res = await depositNFT(
    tokenId,
    amount.value,
    duration.value,
    currency.value
  );

  console.log(res);
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
  .check-button {
    flex: 1;

    .icon {
      background-color: var(--txt-1);
      font-size: 24px;
    }

    input {
      display: none;

      &:checked + span {
        border-color: var(--color-1);
        color: var(--color-1);

        .icon {
          background-color: var(--color-1);
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
