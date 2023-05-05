<template>
  <AppAside />
  <main class="main-app">
    <AppProtocol />
    <div class="main-app-content">
      <slot />
    </div>
    <FooterLight />
  </main>
</template>

<style>
@import url("/assets/css/app.css");
</style>
