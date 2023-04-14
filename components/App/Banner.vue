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
    border: 1px solid rgb(82, 82, 239);
    background-color: rgba(82, 82, 239, 0.3);
    color: rgb(82, 82, 239);
  }

  &[data-type="success"] {
    border: 1px solid var(--success);
    background-color: rgba(var(--success-rgb), 0.3);
    color: var(--success);
  }

  &[data-type="warning"] {
    border: 1px solid orange;
    background-color: rgba(orange, 0.3);
    color: orange;
  }

  &[data-type="danger"] {
    border: 1px solid var(--danger);
    background-color: rgba(var(--danger-rgb), 0.3);
    color: var(--danger);
  }
}
</style>
