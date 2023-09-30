<template>
  <div v-if="enabled" class="h-full relative">
    <div class="wave mt-0!" :class="{ inactive: wifi < 3 }">
      <div class="wave" :class="{ inactive: wifi < 2 }">
        <div class="wave border-3! mb-0!" :class="{ inactive: wifi < 1 }"></div>
      </div>
    </div>
  </div>
  <div v-else-if="!enabled" class="text-xs line-height-1em">
    {{ g }}
  </div>
</template>

<script setup lang="ts">
  defineProps({
    wifi: {
      type: Number,
      default: 1,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    g: {
      type: String,
      default: '5G',
    },
    system: {
      type: String,
      default: 'ios',
    },
  })
</script>

<style scoped lang="scss">
  .wave {
    border: 2px solid transparent;
    border-top-color: currentcolor;
    border-radius: 50%;

    /* stylelint-disable-next-line scss/operator-no-unspaced */
    @apply m-1px center <sm:(border-2px m-2px);
  }

  .wave.inactive {
    border-top-color: rgb(var(--color-info));
  }
</style>
