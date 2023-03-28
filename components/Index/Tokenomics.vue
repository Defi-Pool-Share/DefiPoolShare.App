<script setup>
  const { tokenomics } = useTokenomics()
  const total = 10000000
</script>

<template>
  <div id="tk">
    <div class="ct">
      <Heading sub="tokenomics.sub" h2="tokenomics.title" />
      <div class="token">
        <div class="left">
          <div class="sigle-ct">
            <SvgSigle />
            <Shape id="tokenomics" />
          </div>
        </div>
        <div class="right">
          <h3 data-reveal>
            <strong class="grad-1">{{ $t('all.token') }}</strong>
            <SvgSigle />
            <span class="grad-1">{{ $t('all.tk') }}</span>
          </h3>
          <div class="total" data-reveal>
            {{ $t('tokenomics.total') }} 
            <strong>
              {{ numberFormat(total) }} {{ $t('all.tk') }}
            </strong>
          </div>
          <ul class="list">
            <li v-for="li in tokenomics" data-reveal>
              <SvgSigle /> 
              <span v-html="$t(li.txt, {percent:`<span class='grad-1'>${li.percent}%</span>`})"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="content-txt">
        <div class="arrow" data-reveal></div>
        <div class="c-left" v-html="$t('tokenomics.left')" data-reveal></div>
        <div class="c-right" v-html="$t('tokenomics.right')" data-reveal></div>
      </div>
    </div>
  </div>
</template>