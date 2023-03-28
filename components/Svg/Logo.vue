<script setup>
  defineProps({
    id: String
  })
</script>

<template>
  <svg class="lg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 701.6 156.4" xmlns:v="https://vecta.io/nano">
    <title>{{ $t('all.site') }}</title>
    <clipPath :id="`LGG_${id}`">
      <use :xlink:href="`#LGG`"/>
    </clipPath>
    <path d="M0 0h699.4v156.4H0z" :clip-path="`url(#LGG_${id})`" fill="url(#G_C)"/>
  </svg>
</template>