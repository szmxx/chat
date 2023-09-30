<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
  })
  const emit = defineEmits(['update:modelValue'])
  const current = computed<boolean>({
    set(value) {
      emit('update:modelValue', value)
    },
    get() {
      return props.modelValue
    },
  })

  watch(
    current,
    () => {
      console.log(current.value)
    },
    {
      immediate: true,
    },
  )
</script>

<template>
  <div class="flex items-center justify-between py-2">
    <label class="flex cursor-pointer items-center">
      <slot name="prefix" />
      <div class="relative h-5 center">
        <input v-model="current" type="checkbox" class="hidden" />
        <div
          :class="{ 'bg-primary': current }"
          class="h-full w-10 rounded-full transition-600 bg-color"
        />
        <div
          :class="{ 'translate-x-5': current, 'translate-x-0': !current }"
          class="absolute left-0 h-4.5 w-4.5 rounded-full shadow-sm transition-400 bg-default bg-white"
        />
      </div>
      <slot name="suffix" />
    </label>
  </div>
</template>
