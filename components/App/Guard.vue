<template>
  <div class="defi-Guard">
    <template v-if="userStore.user?.isConnected">
      <slot />
    </template>

    <template v-else>
      <h2>{{ $t("network.guard.not_connected") }}</h2>
      <button class="btn" @click="connect">Connect</button>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
const { connect } = useConnect();

onMounted(() => {
  connect();
});
</script>

<style lang="scss">
.defi-Guard {
  > button {
    margin-top: 20px;
  }
}
</style>
