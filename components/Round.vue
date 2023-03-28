<script setup>
  defineProps({
    id: {
      type: String,
      required: true
    },
    info: {
      type: Object,
      required: true
    }
  })
</script>

<template>
  <div :class="`round round-${id}`">
    <Icon v-if="info.icon" :name="info.icon" />
    <div v-if="info.logo" v-html="info.logo"></div>
  </div>
</template>