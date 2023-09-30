<!--
 * @Author: cola
 * @Date: 2023-09-19 23:57:55
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div>
    <div ref="showRef" @click="onToggle">
      <slot></slot>
    </div>
    <div v-show="isShow" ref="panelRef">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  const isShow = ref(false)
  const panelRef = ref()
  const showRef = ref()
  function onToggle() {
    isShow.value = !isShow.value
  }

  defineExpose({
    toggle: onToggle,
  })
  onMounted(() => {
    onClickOutside(
      panelRef,
      () => {
        isShow.value = false
      },
      {
        ignore: [showRef.value],
      },
    )
  })
</script>
