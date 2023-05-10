<template>
  <div class="defi-Stats">
    <div class="defi-Stats-item">
      <SvgSpinner v-if="isLoading" />
      <div class="defi-Stats-nb grad-1" v-else>
        {{ waitingPoolsNb }}
      </div>
      <div class="defi-Stats-label">waiting pools</div>
    </div>
    <div class="defi-Stats-item">
      <SvgSpinner v-if="isLoading" />
      <div class="defi-Stats-nb grad-1" v-else>
        {{ activePoolsNb }}
      </div>
      <div class="defi-Stats-label">active pools</div>
    </div>
    <div class="defi-Stats-item">
      <SvgSpinner v-if="isLoading" />
      <div class="defi-Stats-nb grad-1" v-else>
        {{ endedPoolsNb }}
      </div>
      <div class="defi-Stats-label">ended pools</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Loan } from "~/lib/data/types";

const { getAllLoans } = useAppApi();

const isLoading = ref(true);
const loans: Ref<Loan[]> = ref([]);
const waitingPoolsNb = computed(
  () => loans.value.filter((loan) => loan.isActive).length
);
const activePoolsNb = computed(
  () => loans.value.filter((loan) => !loan.isActive).length
);
const endedPoolsNb = ref(0);

onMounted(async () => {
  try {
    const tempLoans = await getAllLoans();

    if (tempLoans && tempLoans.length) {
      loans.value = tempLoans;
    }
  } catch (e) {
    console.error(e);
  }

  isLoading.value = false;
});
</script>

<style lang="scss">
.defi-Stats {
  display: flex;
  gap: var(--main-gap);
  margin-top: var(--main-padding);

  &-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--main-gap);
    padding: 20px;
    width: 100%;
    background: var(--bg-1);
    border-radius: var(--main-radius);

    &:before {
      content: "";
      position: absolute;
      z-index: -1;
      inset: -2px;
      background: var(--gradient-1);
      border-radius: var(--main-radius);
    }

    path {
      fill: var(--color-1);
    }
  }

  &-nb {
    font-size: 32px;
    font-weight: 700;
  }
}
</style>
