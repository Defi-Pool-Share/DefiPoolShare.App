<script setup>
  const { roadmap } = useRoadmap()
</script>

<template>
  <div id="rm">
    <div class="ct">
      <Heading sub="roadmap.sub" h2="roadmap.title" />
      <div class="road">
        <div v-for="road in roadmap">
          <TextStroke :txt="road.title" />
          <ul>
            <li v-for="li in road.list" :class="li.end ? 'end' : ''" data-reveal>
              <p v-html="$t(li.txt)"></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Shape id="roadmap" />
  </div>
</template>