<!--
 * @Author: cola
 * @Date: 2023-08-04 16:03:44
 * @LastEditors: cola
 * @Description:
-->
<script setup lang="ts">
  defineProps({
    accept: {
      type: String,
      default: 'image/*',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  })
  const emit = defineEmits(['change'])
  const file = ref()
  function uploadHandler() {
    file.value.value = ''
    file.value.click()
  }

  function changeHandler() {
    emit('change', file?.value?.files)
  }
</script>

<template>
  <div>
    <input
      ref="file"
      :multiple="multiple"
      class="hidden"
      type="file"
      :accept="accept"
      @change="changeHandler"
    />
    <div class="pointer-events-auto cursor-pointer" @click.stop="uploadHandler">
      <slot />
    </div>
  </div>
</template>
