<template>
  <div class="defi-Pools">
    <h1 class="h1">
      <span class="grad-1">{{ $t("aside.my_pools") }}</span>
    </h1>
    <AppGuard>
      <button class="btn" @click="withdrawNFT(2)">withdrawNFT 2</button>
      <div class="defi-Pools-wrapper">
        <div class="defi-Pools-section">
          <h2 class="h2">{{ $t("pool.title.owned") }}</h2>
          <div class="app-paragraphe">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis reprehenderit eum, neque voluptas possimus quidem
              libero praesentium sed earum saepe doloremque architecto aliquid
              consequatur vitae dolorem alias quod temporibus voluptate!
            </p>
          </div>
          <div class="defi-Pools-list">
            <div class="grid-x2">
              <div :key="index" v-for="(pool, index) in myPools">
                <PoolItem v-bind="pool" :owned="true" />
              </div>
            </div>
          </div>
        </div>

        <hr class="app-hr" />

        <div class="defi-Pools-section">
          <h2 class="h2">{{ $t("pool.title.loaned") }}</h2>
          <div class="app-paragraphe">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis reprehenderit eum, neque voluptas possimus quidem
              libero praesentium sed earum saepe doloremque architecto aliquid
              consequatur vitae dolorem alias quod temporibus voluptate!
            </p>
          </div>
          <div class="defi-Pools-list">
            <div class="grid-x2">
              <div :key="index" v-for="(pool, index) in loanPools">
                <PoolItem v-bind="pool" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppGuard>
  </div>
</template>

<script setup lang="ts">
import { Pool } from "@/lib/data/types";
import { eth, btc, glq } from "@/lib/data/currencies";
import { useUserStore } from "~/stores/user";
import { UniPool } from "~/lib/data/types";
import { ethers } from "ethers";

const userStore = useUserStore();
const { getMyPools } = useUniswap();
const { withdrawNFT } = useContractLending();

const myPools: Ref<UniPool[]> = ref([]);

watch(
  () => userStore.user,
  async (newUser) => {
    if (newUser && newUser.address) {
      myPools.value = await getMyPools(newUser.address);
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
  &-list {
    margin-top: var(--main-padding);
  }
}
</style>
