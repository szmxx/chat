<template>
  <div class="flex gap-x-3">
    <div
      class="flex gap-x-1 w-fit cursor-pointer items-center p-2 relative rounded-1.5"
      :class="[chat.role]"
      @click="onPlay"
    >
      <div
        i-material-symbols-wifi
        class="rotate-90deg center audio"
        :class="{ playing: playing }"
      ></div>
      <div class="flex items-center gap-x-0.2">
        <div>{{ chat.minute }}</div>
        <div class="flex items-center gap-x-0.1">
          <div>'</div>
          <div>'</div>
        </div>
      </div>
    </div>
    <div
      v-if="chat.isNew && chat.role === 'user'"
      class="h-full gap-x-0.5 center"
    >
      <div class="w-1.5 h-1.5 bg-danger rounded"></div>
      <div
        class="rounded scale-70 bg-info/10 cursor-pointer text-info rounded-full px-2 py-1"
      >
        转文字
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    chat: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => {},
    },
  })

  const playing = ref(false)
  const timeout = ref()
  function onPlay() {
    clearTimeout(timeout.value)
    timeout.value = setTimeout(
      () => {
        playing.value = false
      },
      1000 * ((props?.chat?.minute as number) || 1),
    )
    // eslint-disable-next-line vue/no-mutating-props
    props.chat.isNew = false
    playing.value = !playing.value
  }
</script>

<style lang="scss" scoped>
  .audio.playing {
    animation: playing steps(3) 1.5s infinite;
  }

  .self {
    @apply flex-row-reverse pl-10 bg-success text-auxiliary;

    & > .audio {
      @apply -rotate-90deg;
    }

    &::before {
      content: '';
      border-color: transparent;
      border-left-color: rgba(var(--color-success));

      @apply absolute right-0.5 top-2 border-8  rounded translate-x-100%;
    }
  }

  .user {
    @apply pr-10 bg-default;

    &::before {
      content: '';
      border-color: transparent;
      border-right-color: rgb(var(--fill-default)) !important;

      @apply absolute -left-3.5 top-2 border-8 rounded;
    }
  }

  @keyframes playing {
    0% {
      @apply i-material-symbols-wifi-1-bar-sharp;
    }

    50% {
      @apply i-material-symbols-wifi-2-bar-sharp;
    }

    100% {
      @apply i-material-symbols-wifi-sharp;
    }
  }
</style>
