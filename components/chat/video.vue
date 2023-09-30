<template>
  <div
    class="flex gap-x-1 w-fit cursor-pointer items-center p-2 relative rounded-1.5"
    :class="[chat.role]"
  >
    <div v-if="chat.role === 'self'" class="flex gap-x-2">
      <div>通话时长</div>
      <div>{{ chat.time }}</div>
      <div
        i-ion-videocam-outline
        :class="{
          'i-ion-call-outline! rotate-135deg': chat.status === 'audio',
        }"
      ></div>
    </div>
    <div v-else class="flex gap-x-2">
      <div
        i-ion-videocam-outline
        :class="{
          'i-ion-call-outline! rotate-135deg': chat.status === 'audio',
        }"
      ></div>
      <div>通话时长</div>
      <div>{{ chat.time }}</div>
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
</script>

<style scoped lang="scss">
  .self {
    @apply bg-success text-auxiliary;

    &::before {
      content: '';
      border-color: transparent;

      @apply absolute right-0.5 top-2 border-8 border-l-success rounded translate-x-100%;
    }
  }

  .user {
    @apply bg-default;

    &::before {
      content: '';
      border-color: transparent;
      border-right-color: rgb(var(--fill-default)) !important;

      @apply absolute -left-3.5 top-2 border-8 rounded;
    }
  }
</style>
