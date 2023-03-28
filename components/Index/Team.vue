<script setup>
  const { team } = useTeam()

  const breakpointsSwiper = {
    850: {
      slidesPerView: 3
    },
    500: {
      slidesPerView: 2
    }
  }
</script>

<template>
  <div id="team">
    <div class="ct">
      <Heading sub="team.sub" h2="team.title" />
      <Swiper :slides-per-view="1" :slides-per-group="1" :modules="[SwiperPagination]" :pagination="{ clickable: true }" :breakpoints="breakpointsSwiper">
        <SwiperSlide v-for="member, slide in team" :key="slide">
          <div class="member" data-reveal>
            <div class="photo">
              <img :src="member.photo" alt="">
              <SvgSigle />
            </div>
            <div class="name">
              <strong class="grad-1">{{ member.name }}</strong>
            </div>
            <div class="role">{{ $t(member.role) }}</div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div class="line"></div>
    </div>
  </div>
</template>