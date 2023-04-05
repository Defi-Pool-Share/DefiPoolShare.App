<template>
  <div class="form">
    <h3 class="h3">
      <span class="grad-1">{{ $t("pool.item.title.loan") }}</span>
    </h3>
    <div class="field">
      <label for="text">{{ $t("pool.form.label.amount") }}</label>
      <div class="field-input">
        <input
          id="amount"
          type="number"
          placeholder="Amount"
          v-model="amount"
        />
      </div>
    </div>
    <div class="field">
      <label for="text">{{ $t("pool.form.label.duration") }}</label>
      <div class="fields">
        <label
          class="check-button"
          v-for="(input, index) in durationInputs"
          :key="index"
        >
          <input
            :id="`duration_${input.value}`"
            type="radio"
            name="duration"
            v-model="duration"
            :checked="index === 0"
            :value="input.value"
          />
          <span>{{ input.label }}</span>
        </label>
      </div>
    </div>
    <div class="field">
      <button class="btn" :disabled="!isSubmittable">
        {{ $t("pool.item.cta.submit") }}
      </button>
    </div>
  </div>
</template>

<script setup>
const amount = ref(null);
const duration = ref(1);
const isSubmittable = computed(() => !!amount.value);

const durationInputs = [
  {
    label: "1 month",
    value: 1,
  },
  {
    label: "3 months",
    value: 3,
  },
  {
    label: "6 months",
    value: 6,
  },
];
</script>

<style lang="scss" scoped>
.form {
  .h3 {
    justify-content: flex-start;
  }
  .field {
    margin-top: var(--main-padding);
  }
  .fields {
    display: flex;
    gap: var(--main-gap);
  }
  .check-button {
    flex: 1;

    input {
      display: none;

      &:checked + span {
        border-color: var(--color-1);
        color: var(--color-1);
      }
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--height);
      background: transparent;
      border: 2px solid rgb(var(--bg-2-rgb), 0.75);
      color: var(--txt-1);
      border-radius: calc(var(--height) / 5);
      transition: border-color 0.3s;
      cursor: pointer;

      &:hover {
        border-color: var(--bg-2);
      }
    }
  }
}
</style>
