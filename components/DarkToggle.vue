<script setup lang="ts">
  const color = useColorMode()

  useHead({
    meta: [
      {
        id: 'theme-color',
        name: 'theme-color',
      },
    ],
  })

  function toggleDark() {
    color.preference = color.value === 'dark' ? 'light' : 'dark'
  }
</script>

<template>
  <button class="cursor-pointer rr-block" @click="toggleDark">
    <div
      class="i-ion-sunny-sharp"
      :class="{ 'i-ion-moon-sharp!': color?.preference === 'dark' }"
    />
  </button>
</template>
