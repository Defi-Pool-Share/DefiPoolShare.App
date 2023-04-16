<template>
  <div class="pux-Protocol">
    <span>{{ $t("global.protocol.version") }}</span>
    <div class="sep"></div>
    <a
      :href="`https://etherscan.io/address/${config.public.contract.lending}`"
      target="_blank"
    >
      <span>{{ $t("global.protocol.name") }} :</span>
      <span class="grad-1 adress">{{ config.public.contract.lending }}</span>
    </a>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
</script>

<style lang="scss" scoped>
.pux-Protocol {
  position: absolute;
  z-index: 51;
  top: var(--aside-padding);
  right: var(--aside-padding);
  display: flex;
  align-items: center;
  gap: var(--main-gap);
  background-color: rgba(var(--bg-2-rgb), 0.6);
  padding: var(--aside-gutter);
  border-radius: var(--aside-radius);
  font-size: 12px;

  .sep {
    width: 8px;
    height: 1px;
    background-color: var(--txt-1);
  }
  a {
    display: flex;
    gap: 4px;
  }
  .adress {
    display: block;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
