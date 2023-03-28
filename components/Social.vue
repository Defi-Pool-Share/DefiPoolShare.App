<script setup>
  const { socials } = useSocial()
</script>

<template>
  <ul class="social">
    <li v-for="social in socials">
      <a :href="social.link" :title="social.title" target="_blank" rel="noopener noreferrer">
        <Icon class="grd" :name="social.icon" />
        <Icon :name="social.icon" />
      </a>
    </li>
  </ul>
</template>