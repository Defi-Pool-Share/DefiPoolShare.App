<script setup>
  const { steps } = useStep()

  const breakpointsSwiper = {
    850: {
      slidesPerView: 3
    },
    750: {
      slidesPerView: 2
    }
  }

  onMounted(() => {

    const { gsap } = useGsap()

    const title_tl = gsap.timeline({scrollTrigger:{
      trigger: '#st .line',
      start: 'top 100%'
    }})
    title_tl
      .fromTo('.step .number', 1, {opacity:0}, {opacity:1,stagger:{each:.3},ease:'power2.inOut'}, 'a')
      .fromTo('.step .border', 1.5, {height:0}, {height:'100%',stagger:{each:.3},ease:'power2.inOut'}, 'a')

  })
</script>

<template>
  <div id="st">
    <div class="ct">
      <Heading sub="step.sub" h2="step.title" />
      <div>
        <Swiper :slides-per-view="1" :slides-per-group="1" :modules="[SwiperPagination]" :pagination="{ clickable: true }" :breakpoints="breakpointsSwiper">
          <SwiperSlide v-for="step, slide in steps" :key="slide">
            <div class="step">
              <strong class="number">
                <span class="grad-1">{{ step.number }}</span>
              </strong>
              <h3>
                <span class="grad-1">{{ $t(step.title) }}</span>
              </h3>
              <div class="p">
                <p>{{ $t(step.text) }}</p>
              </div>
              <div class="border">
                <span></span>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>