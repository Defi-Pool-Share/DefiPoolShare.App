<script setup>
  const props = defineProps({
    sub: String,
    h1: String,
    h2: String
  })

  const sub_ref = ref(null)
  const sub_content_ref = ref(null)
  const span_ref = ref(null)
  const heading_ref = ref(null)
  const title_ref = ref(null)

  onMounted(() => {

    const { gsap } = useGsap()

    if (props.sub) {
      const sub_tl = gsap.timeline({scrollTrigger:{
        trigger: sub_ref.value,
        start: 'top 95%'
      }})
      sub_tl
        .to(span_ref.value, .8, {width:'100%',ease:'power1.out'})
        .set(sub_content_ref.value, {opacity:1})
        .set(span_ref.value, {inset:'0 0 0 auto'})
        .to(span_ref.value, .5, {width:'0%',ease:'power1.inOut'})
    }

    const title_tl = gsap.timeline({scrollTrigger:{
      trigger: heading_ref.value,
      start: 'top 95%'
    }})
    title_tl
      .fromTo(title_ref.value.children, 1.2, {opacity:0,y:50}, {opacity:1,y:0,stagger:{each:.05},ease:'power2.out'})

  })
</script>

<template ref="heading">
  <div v-if="sub" ref="sub_ref" class="sub">
    <div>
      <div ref="sub_content_ref" class="sub-content" v-html="$t(sub)"></div>
      <span ref="span_ref"></span> 
    </div>
  </div>
  <h1 v-if="h1" ref="heading_ref" class="h1">
    <span ref="title_ref" class="grad-3">
      <template v-for="(word, index) in $t(h1).split(' ')">
        <span>{{ word }}&nbsp;</span>
      </template>
    </span>
  </h1>
  <h2 v-if="h2" ref="heading_ref" class="h2">
    <span ref="title_ref" class="grad-3">
      <template v-for="(word, index) in $t(h2).split(' ')">
        <span v-html="`${word}&nbsp;`"></span>
      </template>
    </span>
  </h2>
</template>