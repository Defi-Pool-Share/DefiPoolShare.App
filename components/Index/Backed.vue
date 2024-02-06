<script setup>
const backers = [
  {
    photo: 'https://i.imgur.com/IGitGS6.png',
    name: '3poch',
    link: "https://twitter.com/3pochLabs",
    width: '160px',
    height: 'auto'
  },
  {
    photo: 'https://i.imgur.com/w9VOt7F.png',
    name: 'DWF Labs',
    link: "https://www.dwf-labs.com/",
    width: '80px',
    height: 'auto'
  },
  {
    photo: 'https://i.imgur.com/5DflSy6.png',
    name: 'Re:base',
    link: "https://rebase.vc/",
    width: '90px',
    height: 'auto'
  },
  {
    photo: 'https://i.imgur.com/Rwfrb8e.png',
    name: 'Fantom',
    link: 'https://fantom.foundation/',
    width: '160px',
    height: 'auto'
  },
  {
    photo: 'https://i.imgur.com/nMRc0u8.png',
    name: 'Merkle Tech Capital',
    link: "https://merkle-tech-capital.io/",
    width: '100px',
    height: 'auto'
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
        <a :href="backer.link" target="_blank" v-for="backer, slide in backers" :key="slide" class="backer"
          :style="{ width: backer.width, height: backer.height }">
          <img :src="backer.photo" alt="">
        </a>
      </div>
    </div>
  </div>
</template>