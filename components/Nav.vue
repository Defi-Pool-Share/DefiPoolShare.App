<script setup>
  const localePath = useLocalePath()
  const { stateNav,  navs } = useNav()

  onMounted(() => {

    const { gsap, ScrollTrigger } = useGsap()
    
    const timeline = gsap.timeline({paused:true})
    timeline
      .fromTo('#n .bg > *', .8, {height:'0%'}, {height:'100%',ease:'power2.out'}, 'a')
      .fromTo('#n a', .8, {y:'100%',rotate:5}, {y:'0%',rotate:0,stagger:{each:.1},ease:'power1.inOut'}, 'a')

    watch(stateNav, (newState) => {
      if (newState) {
        timeline.timeScale(1).play()
      } else {
        timeline.timeScale(2).reverse()
      }
    })

    // Active nav

    const links = qsa('#n [data-go]')
    const removeActive = () => {
      links.forEach(link => link.classList.remove('active'))
    }
    
    navs.forEach(nav => {
      const link = qs(`#n [data-go="${nav.section}"]`)
      ScrollTrigger.create({
        trigger: nav.section,
        start: 'top top',
        onEnter: () => {
          removeActive()
          link.classList.add('active')
        }
      })
      ScrollTrigger.create({
        trigger: nav.section,
        start: 'bottom top',
        onLeaveBack: () => {
          removeActive()
          link.classList.add('active')
        }
      })
    })

  })
</script>

<template>
  <nav id="n">
    <ul>
      <li v-for="nav in navs">
        <a :data-go="nav.section" :title="$t(nav.title)" :class="{ active: nav.section === '#hm' }" @click="stateNav = false">
          <span class="grad-1">{{ $t(nav.title) }}</span>
        </a>
      </li>
    </ul>
    <div class="bg">
      <div></div>
    </div>
  </nav>
</template>