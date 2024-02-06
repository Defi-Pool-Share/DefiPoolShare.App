<script setup>
const backers = [
  {
    photo: 'https://i.imgur.com/FYQ4hOv.png',
    name: '3poch'
  },
  {
    photo: 'https://i.imgur.com/w9VOt7F.png',
    name: 'DWF Labs'
  },
  {
    photo: 'https://i.imgur.com/5DflSy6.png',
    name: 'Re:base'
  },
  {
    photo: 'https://i.imgur.com/pIXdZu2.png',
    name: 'Fantom'
  },
  {
    photo: 'https://i.imgur.com/nMRc0u8.png',
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
  <div id="backers">
    <div class="ct">
      <Heading h2="backed.title" />
      <div class="backers" data-reveal>
        <div v-for="backer, slide in backers" :key="slide" class="backer">
          <img :src="backer.photo" alt="">
        </div>
      </div>
    </div>
  </div>
</template>