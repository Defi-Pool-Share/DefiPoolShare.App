<template>
  <div class="defi-Banner" :data-type="props.type">
    <slot />
  </div>
</template>

<script lang="ts" setup>
type Props = {
  type: "info" | "success" | "warning" | "danger";
};

const props = defineProps<Props>();
</script>

<style lang="scss">
.defi-Banner {
  background-color: var(--bg-3);
  border-radius: var(--main-radius);
  padding: calc(var(--main-padding) / 1.5);
  width: 100%;

  &[data-type="info"] {
    border: 1px solid blue;
    background-color: rgba(blue, 0.3);
    color: blue;
  }

  &[data-type="success"] {
    border: 1px solid green;
    background-color: rgba(green, 0.3);
    color: green;
  }

  &[data-type="warning"] {
    border: 1px solid orange;
    background-color: rgba(orange, 0.3);
    color: orange;
  }

  &[data-type="danger"] {
    border: 1px solid red;
    background-color: rgba(red, 0.3);
    color: red;
  }
}
</style>
