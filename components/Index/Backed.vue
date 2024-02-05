<script setup>
  const backers = [
    {
      photo: 'https://i.imgur.com/dDj5gcF.jpg',
      name: '3poch'
    },
    {
      photo: 'https://i.imgur.com/M3tQszy.jpg',
      name: 'Re:base'
    },
    {
      photo: 'https://i.imgur.com/hactMnk.jpg',
      name: 'Fantom'
    },
    {
      photo: 'https://i.imgur.com/DVJA1cj.jpg',
      name: 'Merkle Tech Capital'
    }
  ]

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
      <Heading h2="backed.title" />
      <Swiper :slides-per-view="1" :slides-per-group="1" :modules="[SwiperPagination]" :pagination="{ clickable: true }" :breakpoints="breakpointsSwiper">
        <SwiperSlide v-for="member, slide in backers" :key="slide">
          <div class="member" data-reveal>
            <div class="photo">
              <img :src="member.photo" alt="">
              <SvgSigle />
            </div>
            <div class="name">
              <strong class="grad-1">{{ member.name }}</strong>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div class="line"></div>
    </div>
  </div>
</template>