<template>
  <div
    class="w-full center relative line-height-1em origin-center-center text-info"
    :class="{ 'text-color!': isCustomBg }"
    @mouseover="mouseover"
    @mouseout="mouseout"
  >
    <template v-if="chat.type === 'time'">
      <div class="bg-color/60 p-1 rounded scale-80 origin-center-center">
        {{ chat.time }}
      </div>
    </template>
    <template v-if="chat.type === 'revert'">
      <div class="bg-color/60 p-1 rounded scale-80 origin-center-center">
        <template v-if="chat.status === 0">
          你撤回了一条消息
          <a class="cursor-pointer" style="color: #586b95">重新编辑</a>
        </template>
        <template v-if="chat.status === 1">
          "{{ map[chat?.user as keyof typeof map]?.name }}" 撤回了一条消息
        </template>
      </div>
    </template>
    <template v-if="chat.type === 'hongbao'">
      <div
        v-if="chat.status === 0"
        class="center p-1 rounded bg-color/60 scale-80"
      >
        <img
          src="~/assets/hongbao.png"
          class="w-auto h-3.5 opacity-80 mr-1.5"
          alt="hongbao"
        />
        <div>{{ map[chat?.user as keyof typeof map]?.name }}</div>
        <div>领取了你的</div>
        <div class="text-primary">红包</div>
      </div>
      <div
        v-if="chat.status === 1"
        class="center bg-color/60 p-1 scale-80 rounded"
      >
        <img
          src="~/assets/hongbao.png"
          class="w-auto h-3.5 opacity-80 mr-1.5"
          alt="hongbao"
        />
        <div>你领取了{{ map[chat?.user as keyof typeof map]?.name }}的</div>
        <div class="text-primary">红包</div>
      </div>
    </template>
    <template v-if="chat.type === 'paiyipai'">
      <div
        v-if="chat.status === 1"
        class="font-bold scale-80 bg-color/60 p-1 rounded flex gap-x-1"
      >
        <div>"{{ map[chat?.user as keyof typeof map]?.name }}"</div>
        <div>拍了拍我{{ chat.message }}</div>
      </div>
      <div v-else class="flex bg-color/60 p-1 rounded scale-80 gap-x-1">
        <div>我拍了拍</div>
        <div>" {{ map[chat?.user as keyof typeof map]?.name }}"</div>
        <div>{{ chat.message }}</div>
      </div>
    </template>
    <template v-if="chat.type === 'delete'">
      <div
        class="bg-color/60 p-1 rounded origin-center-center line-height-1.5em scale-80 w-120% text-center"
      >
        {{
          username
        }}开启了朋友验证，你还不是他（她）朋友。请先发送朋友验证请求，对方验证通过后，才能聊天。<a
          style="color: #586b95"
          class="cursor-pointer"
          >发送朋友验证</a
        >
      </div>
    </template>
    <template v-if="chat.type === 'add'">
      <div class="flex flex-col origin-center-center center scale-80 gap-y-3">
        <div class="bg-color/60 p-1 rounded">以上是打招呼的内容</div>
        <div class="bg-color/60 p-1 rounded text-center">
          你已添加了{{ username }}，现在可以开始聊天了。
        </div>
      </div>
    </template>
    <template v-if="chat.type === 'rejected'">
      <div class="scale-80 bg-color/60 p-1 rounded">
        消息已发出，但被对方拒收了。
      </div>
    </template>
    <div
      v-if="isShowTool"
      i-ion-close-circle
      class="cursor-pointer rr-block absolute right-0 bg-primary/80"
      @click="onDelete"
    ></div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    chat: {
      type: Object as PropType<Record<string, unknown>>,
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
    map: {
      type: Object as PropType<Record<string, Record<string, string>>>,
      default: () => {},
    },
  })
  const emit = defineEmits(['delete'])

  function onDelete() {
    emit('delete')
  }

  const isShowTool = ref(false)
  function mouseover() {
    isShowTool.value = true
  }
  const timeout = ref()
  function mouseout() {
    clearTimeout(timeout.value)

    timeout.value = setTimeout(() => {
      isShowTool.value = false
    }, 500)
  }
</script>
