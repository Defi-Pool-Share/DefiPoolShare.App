<template>
  <aside class="aside">
    <NuxtLink to="/" class="aside-logo">
      <SvgSigle />
      <SvgLogo />
    </NuxtLink>
    <nav class="aside-nav">
      <ul>
        <li v-for="nav in asideNav">
          <NuxtLink :to="nav.link">
            <IconCSS class="icon" :name="nav.icon" />
            <span>{{ $t(nav.title) }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <div class="aside-bottom">
      <div class="aside-profil" v-if="userStore.user?.isConnected">
        <div class="aside-profil-photo">
          <Icon name="mdi:ethereum" />
        </div>
        <div class="aside-profil-right">
          <address class="grad-1">{{ userStore.user?.address }}</address>
          <span
            class="aside-profil-network"
            data-success
            v-if="userStore.isOnMainnet"
            >{{ $t("network.mainnet.true") }}</span
          >
          <span class="aside-profil-network" data-error v-else>{{
            $t("network.mainnet.false")
          }}</span>
        </div>
      </div>

      <div class="aside-profil" v-else>
        <div class="aside-profil-photo">
          <Icon name="mdi:ethereum" />
        </div>
        <div class="aside-profil-right">
          <address class="grad-1">Not connected</address>
          <button class="logout" @click="connect">
            <span>Connect</span>
            <Icon name="material-symbols:exit-to-app-rounded" />
          </button>
        </div>
      </div>
    </div>
  </aside>
  <button class="btn bnv" @click="toggleNav(true)">
    <svg viewBox="0 0 100 100">
      <path class="l-1" d="M0,42h62c13,0,6,26-4,16L35,35" />
      <path class="l-2" d="M0,50h70" />
      <path class="l-3" d="M0,58h62c13,0,6-26-4-16L35,65" />
    </svg>
  </button>
</template>

<script setup>
import { useUserStore } from "~/stores/user";

const { asideNav, toggleNav } = useNav();
const userStore = useUserStore();
const { connect } = useConnect();
</script>
