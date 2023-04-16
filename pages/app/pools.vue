<template>
  <div class="defi-Pools">
    <h1 class="h1">
      <span class="grad-1">{{ $t("aside.pools") }}</span>
    </h1>
    <AppGuard>
      <div class="defi-Pools-section">
        <div class="app-paragraphe">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis reprehenderit eum, neque voluptas possimus quidem
            libero praesentium sed earum saepe doloremque architecto aliquid
            consequatur vitae dolorem alias quod temporibus voluptate!
          </p>
        </div>
        <div class="defi-Pools-list" v-if="allPoolsByLoan.length">
          <div class="grid-x2">
            <div :key="index" v-for="(pool, index) in allPoolsByLoan">
              <PoolLoanItem v-bind="pool" :owned="false" />
            </div>
          </div>
        </div>
        <div class="defi-Pools-loading" v-else-if="isLoading">
          <AppBanner type="info" :loading="true">{{
            $t("global.loading")
          }}</AppBanner>
        </div>
        <div class="defi-Pools-empty" v-else>
          <AppBanner type="warning">{{ $t("pool.list.empty") }}</AppBanner>
        </div>
      </div>
    </AppGuard>
  </div>
</template>

<script setup lang="ts">
import { UniPool } from "@/lib/data/types";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
const { getAllPoolsWithLoan } = useContractLending();

const allPoolsByLoan: Ref<UniPool[]> = ref([]);
const isLoading = ref(false);

async function refreshData() {
  isLoading.value = true;
  const pools = await getAllPoolsWithLoan();

  if (pools) {
    allPoolsByLoan.value = [];
    allPoolsByLoan.value = pools;
  }
  isLoading.value = false;
}

watch(
  () => userStore.user,
  async (newUser) => {
    if (newUser && newUser.address) {
      refreshData();
    }
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  document.body.addEventListener("needRefreshData", refreshData);
});

onUnmounted(() => {
  document.body.removeEventListener("needRefreshData", refreshData);
});
</script>

<style lang="scss" scoped>
.defi-Pools {
  &-wrapper {
    display: flex;
    flex-direction: column;
    gap: calc(var(--main-padding) * 2);
  }
  &-list,
  &-empty,
  &-loading {
    margin-top: var(--main-padding);
  }
}
</style>
