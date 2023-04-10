<template>
  <transition>
    <div class="defi-Popin">
      <div class="defi-Popin-mask" @click="props.close"></div>
      <div class="defi-Popin-wrapper">
        <button class="btn-min defi-Popin-close" @click="props.close">
          <Icon name="humbleicons:times" />
        </button>

        <div class="defi-Popin-title h1 grad-1" v-if="props.title">
          {{ props.title }}
        </div>
        <div class="defi-Popin-content app-paragraphe">
          <slot name="content" />

          <div class="defi-Popin-actions">
            <slot name="actions" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
type Props = {
  title?: string;
  close: () => {};
};

const props = defineProps<Props>();
</script>

<style lang="scss">
.defi-Popin {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  &-mask {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &-wrapper {
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 90px 40px 40px;
    background-color: var(--bg-3);
    border-radius: var(--main-radius);
  }

  &-close {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: 40px !important;
  }

  &-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--main-gap);
  }
}
</style>
