<script setup>
const { subNav } = useNav();
const { socials } = useSocial();
</script>

<template>
  <footer id="f">
    <div class="ct">
      <div class="logo">
        <SvgSigle />
        <SvgLogo id="footer" />
      </div>
      <div class="footer-content">
        <div class="left">
          <div class="desc">
            <p v-html="$t('footer.desc')"></p>
          </div>
          <Social />
        </div>
        <div class="right">
          <ul>
            <li>
              <span class="grad-1">{{ $t("footer.nav") }}</span>
            </li>
            <li v-for="nav in subNav">
              <a
                :href="nav.link"
                :title="$t(nav.title)"
                @click="stateNav = false"
              >
                <span class="grad-1">{{ $t(nav.title) }}</span>
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <span class="grad-1">{{ $t("footer.info") }}</span>
            </li>
            <li v-for="nav in socials">
              <a
                :href="nav.link"
                :title="$t(nav.title)"
                @click="stateNav = false"
                target="_blank"
              >
                <span class="grad-1">{{ $t(nav.title) }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>{{ $t("footer.copyright") }}</p>
      </div>
    </div>
  </footer>
</template>
