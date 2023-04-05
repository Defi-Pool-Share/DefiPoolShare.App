<template>
  <div class="defi-Pools">
    <h1 class="h1">
      <span class="grad-1">{{ $t("aside.pools") }}</span>
    </h1>

    <div class="defi-Pools-section">
      <div class="app-paragraphe">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          reprehenderit eum, neque voluptas possimus quidem libero praesentium
          sed earum saepe doloremque architecto aliquid consequatur vitae
          dolorem alias quod temporibus voluptate!
        </p>
      </div>
      <div class="defi-Pools-list">
        <div class="grid-x2">
          <div :key="index" v-for="(pool, index) in myPools">
            <PoolItem v-bind="pool" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Pool } from "@/lib/data/types";
import { eth, btc, glq } from "@/lib/data/currencies";

const myPools: Pool[] = [
  {
    rented: false,
    shared: 100,
    balance: {
      firstCurrency: {
        currency: glq,
        value: 10.0598888,
      },
      secondCurrency: {
        currency: btc,
        value: 1.65222475,
      },
    },
    price: {
      currency: glq,
      value: 10,
    },
    interests: {
      firstCurrency: {
        currency: glq,
        value: 5.646235,
      },
      secondCurrency: {
        currency: btc,
        value: 0.3584295,
      },
    },
    rent: {
      monthsDuration: 3,
      endDate: new Date("2023-06-23"),
    },
  },
  {
    rented: true,
    shared: 5,
    balance: {
      firstCurrency: {
        currency: btc,
        value: 0.0598888,
      },
      secondCurrency: {
        currency: eth,
        value: 12.24226475,
      },
    },
    price: {
      currency: eth,
      value: 6.5,
    },
    interests: {
      firstCurrency: {
        currency: btc,
        value: 0.06464,
      },
      secondCurrency: {
        currency: eth,
        value: 0.0886,
      },
    },
    rent: {
      monthsDuration: 1,
      endDate: new Date("2023-05-17"),
    },
  },
  {
    rented: true,
    shared: 10,
    balance: {
      firstCurrency: {
        currency: eth,
        value: 0.0598888,
      },
      secondCurrency: {
        currency: glq,
        value: 12.24226475,
      },
    },
    price: {
      currency: eth,
      value: 6.5,
    },
    interests: {
      firstCurrency: {
        currency: eth,
        value: 0,
      },
      secondCurrency: {
        currency: glq,
        value: 0,
      },
    },
    rent: {
      monthsDuration: 1,
      endDate: new Date("2023-06-23"),
    },
  },
];
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
