<script setup>
const { rounds } = useWelcome();

onMounted(() => {
  const { gsap } = useGsap();

  const welcome_shape = gsap.timeline({
    scrollTrigger: {
      trigger: ".rep",
      start: "top top",
      endTrigger: "#we .shape",
      end: "bottom top",
      scrub: true,
    },
  });
  welcome_shape
    .fromTo(
      ".shape-welcome path:nth-of-type(1)",
      { rotate: 0 },
      { rotate: 90, transformOrigin: "center center" },
      "a"
    )
    .fromTo(
      ".shape-welcome path:nth-of-type(2)",
      { rotate: 0 },
      { rotate: -90, transformOrigin: "center center" },
      "a"
    );

  pathPrepare(`.serpent-cache path`, true);
  const tl = gsap.timeline({});
  tl.from(
    `.serpent-cache path`,
    4,
    { strokeDashoffset: 0, ease: "power2.inOut" },
    "a"
  );
  for (const key in rounds) {
    tl.fromTo(
      `.round-${key}`,
      1.5,
      { scale: 0 },
      {
        scale: 1,
        y: "-50%",
        x: "-50%",
        delay: rounds[key].delay,
        ease: "back.out",
      },
      "a"
    );
  }
});
</script>

<template>
  <div id="we">
    <div class="left">
      <Heading sub="welcome.sub" h1="welcome.title" />
      <div class="intro" data-reveal>
        <p v-html="$t('welcome.intro')"></p>
      </div>
      <div class="p" data-reveal>
        <p v-html="$t('welcome.txt')"></p>
      </div>
      <div class="button" data-reveal>
        <IndexTwitterShare />
      </div>
    </div>
    <div class="right">
      <Round v-for="(round, id) in rounds" :id="id" :info="round" />
      <SvgSerpent />
      <SvgSerpent class="serpent-cache" />
    </div>
    <Shape id="welcome" />
  </div>
</template>
