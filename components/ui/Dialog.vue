<template>
  <Teleport :to="to">
    <div
      v-show="visible"
      class="center absolute top-0 z-9999 left-0 w-full h-full bg-dark/40"
    >
      <div ref="panelRef" class="w-fit h-fit">
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  const props = defineProps({
    to: {
      type: String,
      default: 'body',
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const visible = computed<boolean>({
    set(value) {
      emit('update:modelValue', value)
    },
    get() {
      return props.modelValue
    },
  })

  const panelRef = ref()
  onMounted(() => {
    onClickOutside(panelRef, () => {
      visible.value = false
    })
  })
</script>
