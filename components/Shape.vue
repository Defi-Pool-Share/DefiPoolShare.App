<script setup>
  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  })

  const shape = `.shape-${props.id}`
  const path = `.shape-${props.id} path`

  onMounted(() => {

    const { gsap } = useGsap()

    pathPrepare(path, true)
    const tl = gsap.timeline({scrollTrigger:{
      trigger: shape,
      start: 'top 95%',
    }})
    tl
      .to(shape, 1, {opacity:.15,ease:'power2.inOut'}, 'a')
      .to(path, 5, {strokeDashoffset:0,ease:'power2.inOut'}, 'a')

    if (props.id !== 'welcome') {

      const tl_shape = gsap.timeline({scrollTrigger:{
        trigger: shape,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }})
      tl_shape
        .fromTo(path + ':nth-of-type(1)', {rotate:0}, {rotate:180,transformOrigin:"center center"}, 'a')
        .fromTo(path + ':nth-of-type(2)', {rotate:0}, {rotate:-180,transformOrigin:"center center"}, 'a')

    }

  })
</script>

<template>
  <div :class="`shape shape-${id}`">
    <svg class="sigle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 225.8 225.7" xmlns:v="https://vecta.io/nano">
      <title>{{ $t('all.token') }} • {{ $t('all.tk') }}</title>
      <path d="M112.9 221.5c-14.4 0-28.8-5.5-39.8-16.5h0l-52.3-52.3c-10.6-10.6-16.5-24.8-16.5-39.8A56.37 56.37 0 0 1 20.7 73L73 20.7c22-22 57.7-22 79.7 0L205.1 73c10.6 10.6 16.5 24.8 16.5 39.8s-5.9 29.2-16.5 39.8L152.7 205c-11 11-25.4 16.5-39.8 16.5zm-18.6-37.7c10.3 10.3 27 10.3 37.2 0l52.3-52.3c5-5 7.7-11.6 7.7-18.6s-2.7-13.6-7.7-18.6L131.5 42c-10.3-10.3-27-10.3-37.2 0L41.9 94.2c-5 5-7.7 11.6-7.7 18.6s2.7 13.6 7.7 18.6l52.4 52.4z" fill="url(#G_B)"/>
      <path d="M112.9 175.1a23.77 23.77 0 0 1-16.9-7l-38.3-38.3c-9.3-9.3-9.3-24.5 0-33.8L96 57.6c9.3-9.3 24.5-9.3 33.8 0L168.1 96c9.3 9.3 9.3 24.5 0 33.8l-38.3 38.3a23.77 23.77 0 0 1-16.9 7zm2.9-26.8h0 0zm-35.4-35.4l32.5 32.5 32.5-32.5-32.5-32.5-32.5 32.5z" fill="url(#G_A)"/>
    </svg>
  </div>
</template>