<script setup>
const { subNav, navs } = useNav();
</script>

<template>
  <footer id="f">
    <div class="main-app-content">
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
            <li v-for="nav in navs">
              <a
                :data-go="nav.section"
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
        </div>
      </div>
      <div class="footer-bottom">
        <p>{{ $t("footer.copyright") }}</p>
      </div>
    </div>
  </footer>
</template>
