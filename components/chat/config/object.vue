<template>
  <div class="flex flex-col gap-y-4">
    <fieldset
      class="flex border min-w-0 hover:border-primary min-w-auto rounded p-4 flex-col gap-y-4"
    >
      <legend pl-2>基本设置</legend>
      <div class="flex gap-4 flex-wrap">
        <div
          v-for="(item, index) in list"
          :key="item.value"
          :class="{ flow: currentUser === item.value }"
          class="w-32 flex border-2px border-transparent flex-col gap-y-2 p-2 shadow-sm rounded bg-default"
        >
          <UiUpload class="relative" @change="onAvatarUpload($event, item)">
            <div
              class="relative h-28 w-28 center"
              :class="{
                'border-primary': currentUser === item.value,
              }"
            >
              <img :src="item.url" class="w-full rounded h-full object-cover" />
              <div class="bg-dark/20 z-1 absolute rounded center w-full h-full">
                <div i-ion-plus-round class="text-6 absolute bg-primary"></div>
              </div>
            </div>
            <div
              i-ion-android-checkbox-outline-blank
              class="absolute right-1 bottom-1 text-xl text-white z-2"
              :class="{
                'i-ion-checkbox bg-primary': currentUser === item.value,
              }"
              @click.prevent.stop="onSelect(item.value)"
            ></div>
            <div
              v-show="index !== 0"
              i-ion-close-circle
              class="absolute -top-4 z-9 -right-4 text-xl bg-danger"
              @click.prevent.stop="onDelete(item.value)"
            ></div>
          </UiUpload>
          <div class="center gap-x-1 relative overflow-hidden border rounded">
            <input
              v-model="item.name"
              placeholder="请输入用户昵称"
              class="w-full text-sm p-1"
              @input="onChangeUserName(item)"
            />
            <div
              class="bg-default text-xs px-1 h-full absolute right-0 center cursor-pointer"
              @click="onRandom(item)"
            >
              <div i-ion-color-wand></div>
            </div>
          </div>
        </div>
        <div
          v-if="isGroup"
          class="w-10 h-10 border cursor-pointer center rounded self-end"
          @click="onAddUser"
        >
          <div class="i-ion-plus-round text-6 bg-dark"></div>
        </div>
      </div>
      <UiRadio v-model="status" :list="modeList" class="flex gap-2"> </UiRadio>
      <div v-show="status === 3" class="relative z-9 flex gap-x-2">
        <div>选择日期</div>

        <UiTime v-model="currentDate" type="day">
          <div class="flex gap-x-2">
            <div>
              {{ currentDate[0] }} 号 {{ currentDate[1] }} :
              {{ currentDate[2] }}
            </div>
          </div>
        </UiTime>
      </div>
      <div class="flex gap-x-2 relative">
        <textarea
          v-model="inputVal"
          placeholder="请输入聊天内容"
          class="border rounded flex-1 p-2 min-h-20 bg-color"
          @keyup.enter.exact="onInput"
        />
        <div
          class="absolute bg-primary text-white rounded right-3 cursor-pointer bottom-2 px-2 py-1"
          @click="onInput"
        >
          <div class="i-ion-send text-xs"></div>
        </div>
      </div>
    </fieldset>
    <fieldset
      class="w-full flex hover:border-primary border min-w-auto rounded p-4 flex-col gap-y-4"
    >
      <legend pl-2>图片</legend>
      <div class="flex w-full gap-y-4 flex-col">
        <div>发送图片</div>
        <UiUpload class="w-fit" @change="onUpload">
          <button
            class="bg-color center flex-col gap-x-1 h-15 w-15 text-white rounded"
          >
            <div i-ion-plus-round class="text-6 text-primary"></div>
          </button>
        </UiUpload>

        <div>表情包</div>
        <div class="text-hint">开发中...</div>
      </div>
    </fieldset>
    <fieldset
      class="w-full flex hover:border-primary border min-w-auto rounded p-4 flex-col gap-y-4"
    >
      <legend pl-2>支付</legend>
      <div>红包</div>
      <div class="flex w-full gap-x-2 items-center">
        <div class="text-hint whitespace-nowrap">金额</div>
        <input
          v-model="hongbao.number"
          type="number"
          :min="0.01"
          class="border bg-color min-w-0 rounded flex-1 px-2 py-1"
        />
      </div>
      <div class="flex w-full gap-x-2 items-center">
        <div class="text-hint whitespace-nowrap">文案</div>
        <input
          v-model="hongbao.message"
          placeholder="请输入红包备注"
          class="border bg-color min-w-0 rounded flex-1 px-2 py-1"
        />
      </div>
      <button
        class="bg-primary w-fit py-1 whitespace-nowrap px-3 text-white rounded"
        @click="onHongbao"
      >
        <div i-ion-send text-xs></div>
      </button>
      <div>转账</div>
      <div class="flex w-full gap-x-2 items-center">
        <div class="text-hint whitespace-nowrap">金额</div>
        <input
          v-model="payment.number"
          type="number"
          :min="0.01"
          class="border bg-color min-w-0 rounded flex-1 px-2 py-1"
        />
      </div>
      <div class="flex w-full gap-x-2 items-center">
        <div class="text-hint whitespace-nowrap">文案</div>
        <input
          v-model="payment.message"
          placeholder="请输入转账备注"
          class="border bg-color min-w-0 rounded flex-1 px-2 py-1"
        />
      </div>
      <button
        class="bg-primary py-1 px-3 w-fit whitespace-nowrap text-white rounded"
        @click="onPayment"
      >
        <div i-ion-send text-xs></div>
      </button>
    </fieldset>
    <fieldset
      class="w-full flex hover:border-primary min-w-auto border rounded p-4 flex-col gap-y-4"
    >
      <legend pl-2>语音</legend>
      <div class="flex w-full gap-x-2 items-center overflow-hidden">
        <div class="whitespace-nowrap">语音时长</div>

        <UiRange v-model="audio" :max="60" :min="1" class="flex-1"> </UiRange>
        <button
          class="bg-primary whitespace-nowrap py-1 px-3 text-white rounded"
          @click="onAudio"
        >
          <div i-ion-send text-xs></div>
        </button>
      </div>
      <div class="flex w-full gap-x-2 relative items-center">
        <div>语音聊天</div>

        <UiTime v-model="audioTime">
          <div class="flex gap-x-2">
            <div>{{ audioTime.join(' : ') }}</div>
          </div>
        </UiTime>

        <button
          class="bg-primary whitespace-nowrap py-1 px-3 text-white rounded"
          @click="onAudioTime"
        >
          <div i-ion-send text-xs></div>
        </button>
      </div>
      <div class="flex w-full gap-x-2 relative items-center">
        <div>视频聊天</div>

        <UiTime v-model="videoTime">
          <div class="flex gap-x-2">
            <div>{{ videoTime.join(' : ') }}</div>
          </div>
        </UiTime>
        <button
          class="bg-primary whitespace-nowrap py-1 px-3 text-white rounded"
          @click="onVideoTime"
        >
          <div i-ion-send text-xs></div>
        </button>
      </div>
    </fieldset>
    <fieldset
      class="w-full hover:border-primary flex border rounded p-4 flex-col gap-y-4"
    >
      <legend pl-2>动作</legend>
      <div class="flex w-full gap-x-2 items-center">
        <div class="border rounded px-2 py-1 cursor-pointer" @click="onPai">
          拍一拍
        </div>
        <div class="border rounded px-2 py-1 cursor-pointer" @click="onAgree">
          同意好友申请
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
  import { USER_LIST } from '~/config'
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    map: {
      type: Object as PropType<Record<string, Record<string, string>>>,
      default: () => {},
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['create', 'operate', 'delete', 'update:modelValue'])

  const currentUser = computed<string>({
    set(value) {
      emit('update:modelValue', value)
    },
    get() {
      return props.modelValue
    },
  })
  const status = ref(0)
  const modeList = [
    {
      name: '正常模式',
      value: 0,
    },
    {
      name: '时间模式',
      value: 3,
    },
  ]

  const date = new Date()
  const currentDate = ref<string[]>([
    date.getDate().toString(),
    date.getHours().toString(),
    date.getMinutes().toString(),
  ])

  const inputVal = ref('')
  function onInput() {
    if (inputVal.value.trim()) {
      emit('operate', {
        role: 'user',
        type: 'input',
        value: inputVal.value.trim(),
        user: currentUser.value,
        status: status.value,
        time: status.value === 3 && formatTime(currentDate.value),
      })
      inputVal.value = ''
    }
  }

  function onUpload(evt: FileList) {
    const reader = new FileReader()
    reader.onload = function (event) {
      emit('operate', {
        role: 'user',
        type: 'image',
        value: event?.target?.result,
        user: currentUser.value,
      })
    }
    // 读取文件内容
    reader.readAsDataURL(evt[0])
  }

  const hongbao = ref({
    number: 1,
    message: '恭喜发财，大吉大利',
  })
  function onHongbao() {
    emit('operate', {
      role: 'user',
      type: 'hongbao',
      value: hongbao.value.number,
      message: hongbao.value.message,
      user: currentUser.value,
    })
  }
  const payment = ref({
    number: 1,
    message: '请收款',
  })
  function onPayment() {
    emit('operate', {
      role: 'user',
      type: 'payment',
      value: payment.value.number,
      message: payment.value.message,
      user: currentUser.value,
    })
  }
  const audio = ref(1)
  function onAudio() {
    emit('operate', {
      role: 'user',
      type: 'audio',
      value: audio.value,
      user: currentUser.value,
    })
  }
  function onPai() {
    emit('operate', {
      role: 'user',
      type: 'paiyipai',
      status: 1,
    })
  }

  function onAgree() {
    emit('operate', {
      role: 'user',
      type: 'input',
      value: '我通过了你的朋友验证请求，现在我们可以开始聊天了',
      user: currentUser.value,
    })
  }

  const audioTime = ref(['00', '00'])

  function onAudioTime() {
    emit('operate', {
      role: 'user',
      type: 'video',
      status: 'audio',
      value: audioTime.value.join(':'),
      user: currentUser.value,
    })
  }

  const videoTime = ref(['00', '00'])
  function onVideoTime() {
    emit('operate', {
      role: 'user',
      type: 'video',
      status: 'video',
      value: videoTime.value.join(':'),
      user: currentUser.value,
    })
  }

  const list = ref<Record<string, string>[]>([])

  watch(
    [props?.map, () => props.isGroup],
    () => {
      list.value =
        Object.keys(props?.map || {})
          .filter((i) => (!props.isGroup ? i === 'user' : i !== 'self'))
          .map((i) => {
            return {
              name: props?.map?.[i]?.name,
              value: i,
              url: props?.map?.[i]?.url,
            }
          }) || []
    },
    { immediate: true },
  )

  function onRandom(item: Record<string, string>) {
    const index = getRandomInt(0, USER_LIST.length - 1)
    item.name = USER_LIST[index]
    nextTick(() => {
      onChangeUserName(item)
    })
  }

  function onAvatarUpload(evt: FileList, item: Record<string, string>) {
    const reader = new FileReader()
    reader.onload = function (event) {
      const key = item?.value as keyof typeof props.map
      if (props?.map?.[key] && event?.target?.result) {
        // eslint-disable-next-line vue/no-mutating-props
        props.map[key].url = event?.target?.result?.toString()
      }
    }
    // 读取文件内容
    reader.readAsDataURL(evt[0])
  }

  function onDelete(key: string) {
    emit('delete', key)
  }
  function onChangeUserName(item: Record<string, string>) {
    const key = item?.value as keyof typeof props.map
    if (props.map[key]) {
      // eslint-disable-next-line vue/no-mutating-props
      props.map[key].name = item.name
    }
  }

  function onAddUser() {
    if (props.isGroup) {
      const id = crypto?.randomUUID?.()
      currentUser.value = id
      const index = getRandomInt(0, USER_LIST.length - 1)
      emit('create', {
        id: id,
        name: USER_LIST[index],
        url: '/logo.svg',
      })
    }
  }

  function onSelect(user: string) {
    currentUser.value = user
  }
</script>

<style lang="scss" scoped>
  .flow {
    border: 2px solid transparent; /* Set the initial border */
    animation: flow 1s ease-in-out infinite;
  }

  @keyframes flow {
    0% {
      border-image-source: linear-gradient(
        45deg,
        rgb(var(--color-primary)),
        rgb(var(--color-success)),
        rgb(var(--color-danger))
      );
      border-image-slice: 1;
    }

    100% {
      border-image-source: linear-gradient(
        45deg,
        rgb(var(--color-danger)),
        rgb(var(--color-warning)),
        rgb(var(--color-success))
      );
      border-image-slice: 2;
    }
  }
</style>
