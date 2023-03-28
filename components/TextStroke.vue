<script setup>
  defineProps({
    txt: {
      type: String,
      required: true
    }
  })

  const svg_stroke = ref(null)
  const text = ref(null)

  onMounted(() => {

    const { gsap } = useGsap()

    gsap.to(text.value, 10, {
      strokeDasharray: '50vw 50vw',
      stagger: {
        each: .2
      },
      ease: 'power2.out',
      scrollTrigger: {
        trigger: svg_stroke.value,
        top: 'top 95%'
      }
    }) 

  })
</script>

<template>
  <svg ref="svg_stroke" class="txt-svg">
    <text ref="text" stroke="url(#G_TXT)">{{ txt }}</text>
  </svg>
</template>