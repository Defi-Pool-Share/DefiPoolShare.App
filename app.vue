<script setup>
  const { stateNav } = useNav()
  const color = 'rgb(244,153,12)'
</script>

<template>
  <Html :class="stateNav ? 'stop' : ''">
    <Head>
      <Title>{{ $t('meta.title') }}</Title>
      <Link rel="icon" type="image/x-icon" href="/favicon.png?v=1" />
      <Meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta name="theme-color" :content="color" />
    </Head>
    <Body :class="stateNav ? 'open-nav' : ''">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <SvgDefs />
    </Body>
  </Html>
</template>