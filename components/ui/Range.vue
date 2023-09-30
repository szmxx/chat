<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    },
  })
  const emit = defineEmits(['update:modelValue'])
  const current = computed<number>({
    set(value) {
      emit('update:modelValue', +value)
    },
    get() {
      return +props.modelValue
    },
  })
</script>

<template>
  <div class="flex items-center gap-x-2">
    <input
      v-model="current"
      type="range"
      :min="min"
      :max="max"
      class="h-2.5 appearance-none rounded-full bg-color"
      v-bind="$attrs"
    />
    <input
      v-model="current"
      readonly
      class="w-10 text-center rounded px-1 bg-color center"
    />
  </div>
</template>

<style scoped lang="scss">
  input[type='range']::-webkit-slider-thumb {
    position: relative;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    appearance: none;

    @apply bg-primary;
  }
</style>
