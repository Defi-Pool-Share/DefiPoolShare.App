<template>
  <div class="defi-TwitterShare">
    <a :href="url" class="btn" target="_blank">Unlock the potential</a>
  </div>
</template>

<script lang="ts" setup>
const url = computed(() => {
  const UUID = toHex("Uniswap");

  const desc = `Here's my proof of registration of unlocking the potential of V3 Liquidity Pools  💱💲💸

My registration code for Phase 1: 0x${UUID} 👨🏼‍💻🔶

Join me in this journey with @DefiPoolShare 🚀`;

  return `https://twitter.com/intent/tweet?text=${encodeURI(desc)}`;
});

function toHex(str: string) {
  var result = "";
  for (var i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}
</script>

<style lang="scss">
.pux-TwitterShare {
}
</style>
