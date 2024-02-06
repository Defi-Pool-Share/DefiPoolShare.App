<template>
  <div class="defi-TwitterShare">
    <div class="btn" target="_blank" @click="generateUrl">LBP on Fjord Foundry (Soon)</div>
  </div>
</template>

<script lang="ts" setup>
const hexKeys = [
  {"key": "Liquidity pool", "value": "4C697175696469747920706F6F6C"},
  {"key": "Arbitrageur", "value": "4172626974726167657572"},
  {"key": "Yield farming", "value": "5969656C64206661726D696E67"},
  {"key": "Market maker", "value": "4D61726B6574206D616B65720D0A"},
  {"key": "Lending", "value": "4C656E64696E67"},
  {"key": "Borrowing", "value": "426F72726F77696E670D0A"},
  {"key": "Impermanent loss", "value": "496D7065726D616E656E74206C6F73730D0A"},
  {"key": "Degen", "value": "446567656E"},
  {"key": "Etherum", "value": "4574686572756D"},
  {"key": "Defi", "value": "44656669"},
  {"key": "On chain", "value": "4F6E20636861696E"}
];

const url = ref('');

function generateUUID() {
  return 'xxxxxxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function generateUrl() {
  const hex = hexKeys[Math.round(Math.random() * (hexKeys.length - 1))].value;
  const uuid = generateUUID();

  const desc = `Here's my proof of registration for unlocking the potential of V3 Liquidity Pools 💱💲💸

My registration code for #DeFiPoolShare Phase 1: 0x${hex}_${uuid} 👨🏼‍💻🔶

Join me in this journey with @DefiPoolShare 🚀`;

url.value = `https://twitter.com/intent/tweet?text=${encodeURIComponent(desc)}`;
}

onMounted(() => {
  generateUrl();
})

// function toHex(str: string) {
//   var result = "";
//   for (var i = 0; i < str.length; i++) {
//     result += str.charCodeAt(i).toString(16);
//   }
//   return result;
// }
</script>

<style lang="scss">
.pux-TwitterShare {
}
</style>
