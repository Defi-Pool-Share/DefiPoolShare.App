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
        <div class="defi-Pools-list" v-if="allLoans.length">
          <div class="grid-x2">
            <div :key="index" v-for="(loan, index) in allLoans">
              <PoolItem v-bind="loan.pool" :owned="false" v-if="loan.pool" />
            </div>
          </div>
        </div>
        <div class="defi-Pools-empty" v-else>
          <AppBanner type="info">{{ $t("pool.list.empty") }}</AppBanner>
        </div>
      </div>
    </AppGuard>
  </div>
</template>

<script setup lang="ts">
import { Loan } from "@/lib/data/types";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
const { getAllLoans } = useContractLending();

const allLoans: Ref<Loan[]> = ref([]);

watch(
  () => userStore.user,
  async (newUser) => {
    if (newUser && newUser.address) {
      const loans = await getAllLoans();

      if (loans) {
        allLoans.value = loans;
      }
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.defi-Pools {
  &-wrapper {
    display: flex;
    flex-direction: column;
    gap: calc(var(--main-padding) * 2);
  }
  &-list,
  &-empty {
    margin-top: var(--main-padding);
  }
}
</style>
