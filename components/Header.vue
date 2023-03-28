<script setup>
  const localePath = useLocalePath()
  const { toggleNav } = useNav()
</script>

<template>
  <header id="h">
    <div class="left">
      <NuxtLink to="/" class="logo">
        <SvgSigle />
        <SvgLogo />
      </NuxtLink>
      <Social />
    </div>
    <div class="right">
      <Nav />
      <NuxtLink to="/app" class="btn">
        <span>Launch App</span>
      </NuxtLink>
      <button class="btn bnv" @click="toggleNav(true)">
        <svg viewBox="0 0 100 100">
          <path class="l-1" d="M0,42h62c13,0,6,26-4,16L35,35" />
          <path class="l-2" d="M0,50h70" />
          <path class="l-3" d="M0,58h62c13,0,6-26-4-16L35,65" />
        </svg>
      </button>
    </div>
  </header>
</template>