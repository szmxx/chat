<template>
  <div class="w-full flex flex-col gap-y-4">
    <div
      class="flex z-9999 w-full bg-default border select-none rounded sticky top-0"
      @click="onTab"
    >
      <div
        v-for="item in list"
        :key="item.value as string"
        :data-value="item.value"
        class="flex-1 p-1.5 center z-9 relative cursor-pointer"
        :class="{ 'text-white': value === item.value }"
      >
        {{ item.name }}
      </div>
      <div
        class="glider flex-1"
        :style="{
          width: `calc(100% / ${list.length})`,
          transform: `translateX(${100 * index}%)`,
        }"
      ></div>
    </div>
    <slot :current="value"></slot>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    list: {
      type: Array as PropType<IItem[]>,
      default: () => [],
    },
    modelValue: {
      type: String,
      default: '',
    },
  })
  const emit = defineEmits(['update:modelValue', 'change'])
  const value = computed<string>({
    set(value) {
      emit('update:modelValue', value)
    },
    get() {
      return props.modelValue
    },
  })
  const index = computed(() =>
    props.list.findIndex((i) => i.value === value.value),
  )

  function onTab(evt: MouseEvent) {
    const current = (evt.target as HTMLElement).dataset.value
    if (current) {
      value.value = current
      emit('change', '')
    }
  }
</script>

<style lang="scss" scoped>
  .glider {
    @apply absolute flex rounded bg-primary h-full transition-all-350 ease-out;
  }
</style>
