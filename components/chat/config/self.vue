<template>
  <div class="flex flex-col gap-y-4">
    <fieldset
      class="flex border hover:bg-primary/10 min-w-auto rounded p-4 flex-col gap-y-4"
    >
      <legend pl-2 font-bold>基本设置</legend>
      <div
        class="w-32 flow flex user flex-col gap-y-2 p-2 shadow-sm rounded bg-default"
      >
        <UiUpload class="relative" @change="onAvatarUpload">
          <div class="relative h-28 w-28 center">
            <img
              :src="map?.['self'].url"
              class="w-full rounded h-full object-cover"
            />
            <div class="bg-dark/20 z-1 absolute rounded center w-full h-full">
              <div i-ion-plus-round class="text-6 absolute bg-primary"></div>
            </div>
          </div>
        </UiUpload>
        <div class="center gap-x-1 relative overflow-hidden border rounded">
          <input
            v-model="username"
            placeholder="请输入用户昵称"
            class="w-full text-sm p-1"
            @input="onChangeUserName"
          />
          <div
            class="bg-default text-xs px-1 h-full absolute right-0 center cursor-pointer"
            @click="onRandom"
          >
            <div i-ion-color-wand></div>
          </div>
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
      <div class="flex w-full gap-x-2 items-center">
        <input
          v-model="paipai"
          placeholder="请输入拍一拍内容"
          class="border bg-color min-w-0 rounded flex-1 px-2 py-1"
        />
        <button
          class="bg-primary w-fit whitespace-nowrap py-1.5 px-3 text-white rounded"
          @click="onPai"
        >
          <div i-ion-send text-xs></div>
        </button>
      </div>
    </fieldset>
    <fieldset
      class="w-full hover:bg-primary/10 flex border rounded p-4 flex-col gap-y-4"
    >
      <legend pl-2 font-bold>图片</legend>
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
      class="w-full hover:bg-primary/10 flex min-w-auto border rounded p-4 flex-col gap-y-4"
    >
      <legend pl-2 font-bold>支付</legend>
      <div class="whitespace-nowrap">红包</div>
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
      <div class="whitespace-nowrap">转账</div>
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
      class="w-full hover:bg-primary/10 flex border rounded p-4 flex-col gap-y-4"
    >
      <legend pl-2 font-bold>语音</legend>
      <div class="flex w-full gap-x-2 items-center">
        <div class="whitespace-nowrap">语音时长</div>

        <UiRange v-model="audio" :max="60" :min="1" class="flex-1"> </UiRange>
        <button
          class="bg-primary whitespace-nowrap py-1 px-3 text-white rounded"
          @click="onAudio"
        >
          <div class="i-ion-send text-xs"></div>
        </button>
      </div>
      <div class="flex w-full relative gap-x-2 items-center">
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
          <div class="i-ion-send text-xs"></div>
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
          <div class="i-ion-send text-xs"></div>
        </button>
      </div>
    </fieldset>
    <fieldset
      class="w-full flex hover:bg-primary/10 border rounded p-4 flex-col gap-y-4"
    >
      <legend pl-2 font-bold>动作</legend>
      <div class="flex w-full gap-x-2 items-center">
        <div class="border rounded px-2 py-1 cursor-pointer" @click="onAdd">
          添加好友
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
  import { USER_LIST } from '~/config'
  const props = defineProps({
    map: {
      type: Object as PropType<Record<string, Record<string, string>>>,
      default: () => {},
    },
  })

  const emit = defineEmits(['operate', 'update:modelValue'])
  const modeList = [
    {
      name: '正常模式',
      value: 0,
    },
    {
      name: '时间模式',
      value: 3,
    },
    {
      name: '拉黑模式',
      value: 1,
    },
    {
      name: '删除模式',
      value: 2,
    },
  ]
  function onUpload(evt: FileList) {
    const reader = new FileReader()
    reader.onload = function (event) {
      emit('operate', {
        role: 'self',
        user: 'self',
        type: 'image',
        value: event?.target?.result,
      })
    }
    // 读取文件内容
    reader.readAsDataURL(evt[0])
  }

  const date = new Date()
  const currentDate = ref<string[]>([
    date.getDate().toString(),
    date.getHours().toString(),
    date.getMinutes().toString(),
  ])

  const inputVal = ref('')
  const status = ref(0)
  function onInput() {
    if (inputVal.value.trim()) {
      emit('operate', {
        role: 'self',
        user: 'self',
        type: 'input',
        value: inputVal.value.trim(),
        status: status.value,
        time: status.value === 3 && formatTime(currentDate.value),
      })
      inputVal.value = ''
    }
  }

  const hongbao = ref({
    number: 1,
    message: '恭喜发财，大吉大利',
  })
  function onHongbao() {
    emit('operate', {
      role: 'self',
      user: 'self',
      type: 'hongbao',
      value: hongbao.value.number,
      message: hongbao.value.message,
    })
  }
  const payment = ref({
    number: 1,
    message: '你发起了一笔转账',
  })
  function onPayment() {
    emit('operate', {
      role: 'self',
      user: 'self',
      type: 'payment',
      value: payment.value.number,
      message: payment.value.message,
    })
  }
  const audio = ref(1)
  function onAudio() {
    emit('operate', {
      role: 'self',
      type: 'audio',
      user: 'self',
      value: audio.value,
    })
  }

  const paipai = ref('大哭')
  function onPai() {
    emit('operate', {
      role: 'user',
      type: 'paiyipai',
      message: paipai.value,
      status: 0,
    })
    paipai.value = ''
  }

  function onAdd() {
    emit('operate', {
      role: 'user',
      type: 'add',
    })
  }

  const audioTime = ref(['00', '00'])

  function onAudioTime() {
    emit('operate', {
      role: 'self',
      user: 'self',
      type: 'video',
      status: 'audio',
      value: audioTime.value.join(':'),
    })
  }

  const videoTime = ref(['00', '00'])
  function onVideoTime() {
    emit('operate', {
      role: 'self',
      user: 'self',
      type: 'video',
      status: 'video',
      value: videoTime.value.join(':'),
    })
  }

  function onAvatarUpload(evt: FileList) {
    const reader = new FileReader()
    reader.onload = function (event) {
      if (props?.map?.['self'] && event?.target?.result) {
        // eslint-disable-next-line vue/no-mutating-props
        props.map['self'].url = event?.target?.result?.toString()
      }
    }
    // 读取文件内容
    reader.readAsDataURL(evt[0])
  }

  const username = ref(props.map['self'].name)
  function onChangeUserName() {
    if (props.map['self']) {
      // eslint-disable-next-line vue/no-mutating-props
      props.map['self'].name = username.value
    }
  }

  function onRandom() {
    const index = getRandomInt(0, USER_LIST.length - 1)
    username.value = USER_LIST[index]
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
