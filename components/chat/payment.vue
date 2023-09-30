<template>
  <div
    class="payment relative w-78% rounded-1 text-white cursor-pointer"
    :class="[chat.role, { done: chat?.status && chat?.status !== 0 }]"
  >
    <div class="flex items-center p-2 gap-x-1.5 <sm:(gap-x-3 p-3)">
      <div
        class="border-2 border-white rounded-full p-0.5"
        :class="{ 'border-white/50': chat?.status && chat?.status !== 0 }"
      >
        <div
          v-if="chat?.status === 1 || chat?.status === 2"
          class="w-6 h-6 <sm:(w-8 h-8)"
          i-material-symbols-done-rounded
        ></div>
        <div
          v-else-if="chat?.status === 3 || chat?.status === 4"
          class="w-6 h-6 <sm:(w-8 h-8)"
          i-material-symbols-undo
        ></div>
        <svg
          v-else
          class="w-6 h-6 <sm:(w-8 h-8)"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1274"
        >
          <path
            d="M252 462h524c19.9 0 36-16.1 36-36s-16.1-36-36-36H339.4l59-59c14.1-14.1 14.1-36.9 0-50.9-14.1-14.1-36.9-14.1-50.9 0L230.3 397.2c-8.7 6.6-14.3 17-14.3 28.8 0 19.9 16.1 36 36 36zM802 564c-8.5-8.5-20.3-11.9-31.4-10H252c-19.9 0-36 16.1-36 36s16.1 36 36 36h437.1l-58.5 58.5c-14.1 14.1-14.1 36.9 0 50.9 7 7 16.2 10.5 25.5 10.5s18.4-3.5 25.5-10.5L802 615c14-14.1 14-36.9 0-51z"
            p-id="1275"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
      <div class="flex flex-col gap-y-1">
        <div class="">¥{{ chat?.price }}</div>
        <div class="opacity-50 line-height-1em scale-80 origin-left">
          {{ text }}
        </div>
      </div>
    </div>
    <div
      class="mx-2.5 py-0.5 border-t opacity-50 border-color/10 line-height-1em scale-80 origin-left"
    >
      微信转账
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

  const text = computed(() => {
    if (props.chat.role === 'user') {
      switch (props.chat.status) {
        // 已接收
        case 1:
          return '已被接收'
        // 已收款
        case 2:
          return '已收款'
        // 已被退还
        case 3:
          return '已被退还'
        // 已退还
        case 4:
          return '已退还'
        // 未接收
        default:
          return props.chat.message
      }
    }
    if (props.chat.role === 'self') {
      switch (props.chat.status) {
        // 已接收
        case 1:
          return '已收款'
        // 已接收
        case 2:
          return '已被接收'
        // 已退还
        case 3:
          return '已退还'
        // 已被退还
        case 4:
          return '已被退还'
        // 未接收
        default:
          return props.chat.message
      }
    }
  })
</script>

<style scoped lang="scss">
  $color: #eda150;
  $done: #f8e2c7;

  .payment {
    background: $color !important;
  }

  .self {
    &::before {
      content: '';
      border-color: transparent;
      border-left-color: $color !important;

      @apply absolute right-0.5 top-2 border-8 rounded translate-x-100%;
    }
  }

  .user {
    &::before {
      content: '';
      border-color: transparent;
      border-right-color: $color !important;

      @apply absolute -left-3.5 top-2 border-8 rounded;
    }
  }

  .done {
    background: $done !important;
  }

  .user.done {
    &::before {
      border-right-color: $done !important;
    }
  }

  .self.done {
    &::before {
      border-left-color: $done !important;
    }
  }
</style>
