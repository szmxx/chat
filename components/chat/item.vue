<template>
  <div
    v-if="chat.role !== 'system'"
    class="flex gap-x-3 relative"
    :class="{
      'flex-row-reverse': chat.role === 'self',
      'pt-1.5': chat.role !== 'self' && isGroup,
    }"
    @mouseover="mouseover"
    @mouseout="mouseout"
  >
    <UiUpload @change="onUpload">
      <img
        :src="(map[chat.user as keyof typeof map]?.url as string) || ''"
        class="<sm:(max-w-9.2 max-h-9.2 min-w-9.2 min-h-9.2) max-w-8 max-w-8 min-w-8 min-h-8 bg-white aspect-1/1 object-cover rounded-0.5"
      />
    </UiUpload>
    <div
      class="h-full relative flex flex-col justify-center w-full"
      :class="{ 'items-end': chat.role === 'self' }"
    >
      <div
        v-if="chat.role !== 'self' && isGroup"
        class="text-hint -mt-1.5 mb-0.2 scale-80 origin-left-center"
      >
        {{ map[chat?.user as keyof typeof map]?.name }}
      </div>
      <div
        v-if="!chat.type"
        class="message <sm:(px-3!) relative w-fit flex items-center max-w-78% rounded whitespace-break-spaces break-all p-2"
        :class="[
          chat.role,
          {
            'max-w-72%!': chat.status && chat.status !== 0,
          },
        ]"
      >
        {{ chat.message }}
        <div
          v-if="chat.status === 1 || chat.status === 2"
          class="bg-white absolute -left-1.8rem p-0 w-4.5 h-4.5 overflow-hidden rounded-full"
        >
          <div
            class="i-ion-alert-circle bg-danger text-lg w-6 h-6 absolute -top-0.75 -left-0.75 border-0"
          ></div>
        </div>
      </div>
      <img
        v-else-if="chat.type === 'image'"
        :src="chat.url as string"
        class="max-w-50% w-fit rounded"
      />
      <ChatHongbao
        v-else-if="chat.type === 'hongbao'"
        :chat="chat"
        @click="onHongbao"
        @touchstart="onHongbao"
      ></ChatHongbao>
      <ChatPayment
        v-else-if="chat.type === 'payment'"
        :chat="chat"
        @click="onPayment"
        @touchstart="onPayment"
      >
      </ChatPayment>
      <ChatYuyin v-else-if="chat.type === 'yuyin'" :chat="chat"> </ChatYuyin>
      <ChatVideo v-else-if="chat.type === 'video'" :chat="chat"> </ChatVideo>
    </div>

    <div
      v-show="isShowTool"
      class="absolute flex gap-x-1 rr-block bg-default/90 rounded top-0 -translate-y-100%"
    >
      <div
        i-ion-arrow-up-a
        class="cursor-pointer bg-primary"
        @click="onUp"
      ></div>
      <div
        i-ion-arrow-down-a
        class="cursor-pointer bg-primary"
        @click="onDown"
      ></div>
      <div
        i-ion-arrow-undo
        class="cursor-pointer bg-primary"
        @click="onRevert"
      ></div>
      <div
        i-ion-close-circle
        class="cursor-pointer bg-primary"
        @click="onDelete"
      ></div>
    </div>
  </div>
  <ChatSystem
    v-else
    :is-custom-bg="isCustomBg"
    :chat="chat"
    :username="username"
    :map="map"
    @delete="onDelete"
  ></ChatSystem>
</template>

<script setup lang="ts">
  const props = defineProps({
    chat: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => {},
    },
    map: {
      type: Object as PropType<Record<string, Record<string, string>>>,
      default: () => {},
    },
    username: {
      type: String,
      default: '',
    },
    isCustomBg: {
      type: Boolean,
      default: false,
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits([
    'delete',
    'avatar',
    'hongbao',
    'payment',
    'revert',
    'down',
    'up',
  ])
  function onUpload(evt: FileList) {
    const reader = new FileReader()
    reader.onload = function (event) {
      emit('avatar', props.chat.user, event?.target?.result)
    }
    // 读取文件内容
    reader.readAsDataURL(evt[0])
  }

  function onHongbao() {
    if (!props.chat.status || props.chat.status === 0) {
      // eslint-disable-next-line vue/no-mutating-props
      props.chat.status = 1
      emit('hongbao', props.chat.role)
    }
  }
  function onPayment() {
    const { role, status, price } = props.chat
    if (!status || status === 0) {
      // eslint-disable-next-line vue/no-mutating-props
      props.chat.status = role === 'self' ? 2 : 1
      emit('payment', {
        role: role,
        price: price,
        status: props.chat.status,
      })
    }
  }

  function onDelete() {
    emit('delete')
  }

  function onRevert() {
    const { type, role, status, price } = props.chat
    if ((!status || status === 0) && type === 'payment') {
      // eslint-disable-next-line vue/no-mutating-props
      props.chat.status = role === 'self' ? 4 : 3
      emit('payment', {
        role: role,
        price: price,
        status: props.chat.status,
      })
    } else {
      emit('revert', role === 'user' ? 1 : 0)
    }
  }

  function onUp() {
    emit('up')
  }
  function onDown() {
    emit('down')
  }

  const isShowTool = ref(false)
  function mouseover() {
    isShowTool.value = true
  }

  function mouseout() {
    isShowTool.value = false
  }
</script>

<style lang="scss" scoped>
  .message {
    line-height: 1.3;
  }

  .message.self {
    @apply text-auxiliary;
  }

  .self {
    @apply bg-success;

    &::before {
      content: '';
      border-color: transparent;
      border-left-color: rgba(var(--color-success));

      @apply absolute right-0.5 top-2 border-8 rounded translate-x-100%;
    }
  }

  .user {
    @apply bg-default;

    &::before {
      content: '';
      border-color: transparent;
      border-right-color: rgb(var(--fill-default));

      @apply absolute -left-3.5 top-2 border-8 rounded;
    }
  }
</style>
