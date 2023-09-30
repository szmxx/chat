<template>
  <div
    class="hongbao relative rounded-1 w-78% text-white cursor-pointer"
    :class="[chat.role, { done: chat?.status && chat?.status !== 0 }]"
  >
    <div class="<sm:(gap-x-3 p-3) flex items-center p-2 gap-x-1.5">
      <div
        class="w-auto h-8 <sm:(h-10) relative"
        :class="{ 'done-img': chat?.status && chat?.status !== 0 }"
      >
        <img
          src="~/assets/hongbao.png"
          class="w-auto h-full relative aspect-40/39"
          alt="hongbao"
        />
      </div>

      <div class="pr-2">
        <div class="line-height-1em">{{ chat.message }}</div>
        <div
          v-show="text"
          class="pt-1 opacity-50 line-height-1em scale-80 origin-left"
        >
          {{ text }}
        </div>
      </div>
    </div>
    <div
      class="mx-2.5 py-0.5 opacity-50 border-t border-color/10 line-height-1em scale-80 origin-left"
    >
      微信红包
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
          return '已领取'
        // 未接收
        default:
          return ''
      }
    }
    if (props.chat.role === 'self') {
      switch (props.chat.status) {
        // 已接收
        case 1:
          return '已被领完'
        // 未接收
        default:
          return ''
      }
    }
  })
</script>

<style scoped lang="scss">
  $color: #eda150;
  $done: #f8e2c7;

  .hongbao {
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

  .done-img {
    opacity: 0.6;
  }

  .done-img::before {
    content: '';
    background: #fdf3e8;

    @apply absolute w-84% h-2/5 rounded-b-4 rounded-t-6 left-8% z-9;
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
