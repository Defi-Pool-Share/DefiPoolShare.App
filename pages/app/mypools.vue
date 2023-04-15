<template>
  <div class="defi-Pools">
    <h1 class="h1">
      <span class="grad-1">{{ $t("aside.my_pools") }}</span>
    </h1>
    <AppGuard>
      <div class="defi-Pools-wrapper">
        <div class="defi-Pools-section">
          <h2 class="h2">{{ $t("pool.title.uniswap") }}</h2>
          <div class="app-paragraphe">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis reprehenderit eum, neque voluptas possimus quidem
              libero praesentium sed earum saepe doloremque architecto aliquid
              consequatur vitae dolorem alias quod temporibus voluptate!
            </p>
          </div>
          <div class="defi-Pools-list" v-if="myUniswapPools.length">
            <div class="grid-x2">
              <div :key="index" v-for="(pool, index) in myUniswapPools">
                <PoolItem v-bind="pool" :owned="true" />
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

        <div class="app-hr"></div>

        <div class="defi-Pools-section">
          <h2 class="h2">{{ $t("pool.title.lenders") }}</h2>
          <div class="app-paragraphe">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis reprehenderit eum, neque voluptas possimus quidem
              libero praesentium sed earum saepe doloremque architecto aliquid
              consequatur vitae dolorem alias quod temporibus voluptate!
            </p>
          </div>
          <div class="defi-Pools-list" v-if="myLendedPools.length">
            <div class="grid-x2">
              <div :key="index" v-for="(pool, index) in myLendedPools">
                <PoolLendedItem v-bind="pool" :owned="true" />
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

        <div class="app-hr"></div>

        <div class="defi-Pools-section">
          <h2 class="h2">{{ $t("pool.title.borrowers") }}</h2>
          <div class="app-paragraphe">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis reprehenderit eum, neque voluptas possimus quidem
              libero praesentium sed earum saepe doloremque architecto aliquid
              consequatur vitae dolorem alias quod temporibus voluptate!
            </p>
          </div>
          <div class="defi-Pools-list" v-if="myBorrowedPools.length">
            <div class="grid-x2">
              <div :key="index" v-for="(pool, index) in myBorrowedPools">
                <PoolLendedItem v-bind="pool" :owned="true" />
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
      </div>
    </AppGuard>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { UniPool } from "~/lib/data/types";

const userStore = useUserStore();
const { getMyPools } = useUniswap();
const { getLoansByLenders, getLoansByBorrowers } = useContractLending();

const myUniswapPools: Ref<UniPool[]> = ref([]);
const myLendedPools: Ref<UniPool[]> = ref([]);
const myBorrowedPools: Ref<UniPool[]> = ref([]);
const isLoading = ref(false);

async function refreshData() {
  if (!userStore.user) {
    return;
  }

  isLoading.value = true;
  myUniswapPools.value = [];
  myUniswapPools.value = await getMyPools(userStore.user.address);
  myLendedPools.value = [];
  myLendedPools.value = await getLoansByLenders(userStore.user.address);
  myBorrowedPools.value = [];
  myBorrowedPools.value = await getLoansByBorrowers(userStore.user.address);
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
