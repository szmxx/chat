<template>
  <div class="flex flex-col gap-y-4 w-full">
    <fieldset
      class="w-full flex border hover:border-primary rounded p-4 flex-col gap-y-4"
    >
      <legend pl-2>群聊模式</legend>
      <div class="flex gap-x-2 items-center">
        <div>开启群聊</div>
        <UiSwitch v-model="config.enabled"></UiSwitch>
      </div>

      <div class="flex w-full gap-x-2 items-center">
        <div>群聊名称</div>
        <input
          v-model="config.name"
          placeholder="请输入群聊名称"
          class="border bg-color min-w-0 rounded flex-1 px-2 py-1"
        />
      </div>
      <div class="flex w-full gap-x-2 items-center">
        <div>群聊人数</div>

        <UiRange
          v-model="config.number"
          :max="500"
          :min="3"
          class="flex-1 py-1"
        >
        </UiRange>
      </div>
    </fieldset>

    <fieldset
      class="w-full flex hover:border-primary border rounded p-4 flex-col gap-y-4"
    >
      <legend pl-2>背景设置</legend>
      <div class="flex w-full relative flex-col gap-y-4">
        <div>颜色背景</div>
        <UiColor v-model="currentColor" class="z-99"></UiColor>
      </div>
      <div class="flex flex-col gap-y-4">
        <div>自定义背景</div>
        <UiUpload class="w-fit" @change="onUpload">
          <button
            class="bg-color center flex-col gap-x-1 h-15 w-15 text-white rounded"
          >
            <div i-ion-plus-round class="text-6 text-primary"></div>
          </button>
        </UiUpload>
        <UiRadio v-model="currentBgMode" class="flex gap-2" :list="bgModeList">
        </UiRadio>
      </div>
      <div class="flex w-full relative flex-col gap-y-4">
        <div>自定义水印</div>
        <div class="flex gap-x-2 items-center">
          <div class="text-hint">开启水印</div>
          <UiSwitch v-model="isWatermark" size="16px"></UiSwitch>
        </div>
        <div class="flex gap-x-2 w-full items-center">
          <div class="text-hint">水印内容</div>
          <input
            v-model="watermark"
            placeholder="请输入水印内容"
            class="border rounded flex-1 bg-color px-2 py-1"
          />
        </div>
      </div>
    </fieldset>
    <fieldset
      class="w-full flex border hover:border-primary rounded p-4 flex-col gap-y-4"
    >
      <legend pl-2>导出设置</legend>

      <div class="flex gap-x-2 items-center">
        <div>仅截取内容</div>
        <UiSwitch v-model="exportConfig.onlyContent" size="16px"></UiSwitch>
      </div>
      <div class="flex gap-x-2 items-center">
        <div>截图弹窗</div>
        <UiSwitch v-model="exportConfig.dialog" size="16px"></UiSwitch>
      </div>
      <div class="flex w-full gap-2 flex-wrap items-center">
        <div
          class="border rounded px-2 gap-x-1 center py-1 cursor-pointer"
          :class="{ 'pointer-events-none': exportLoading }"
          @click="onExport"
        >
          <div v-show="exportLoading" class="loading h-4 w-4" />
          导出图片
        </div>
        <div
          class="border rounded px-2 py-1 gap-x-1 cursor-pointer"
          :class="{ 'pointer-events-none': longLoading }"
          @click="onLongExport"
        >
          <div v-show="longLoading" class="loading h-4 w-4" />
          导出长图
        </div>
      </div>
    </fieldset>
    <fieldset
      class="w-full flex border hover:border-primary rounded p-4 flex-col gap-y-4"
    >
      <legend pl-2>动作</legend>
      <div class="flex gap-x-2 items-center">
        <div>消息免打扰</div>
        <UiSwitch v-model="isDisturb" size="16px"></UiSwitch>
      </div>
      <div class="flex w-full gap-2 flex-wrap items-center">
        <div
          class="border rounded relative px-2 py-1 gap-x-1 cursor-pointer"
          @click="onRecord"
        >
          录制视频
          <sup
            v-show="recording"
            class="w-2 h-2 flex absolute top-0 right-0 bg-danger rounded-full"
          ></sup>
        </div>
        <div
          class="border rounded relative px-2 py-1 gap-x-1 cursor-pointer"
          @click="onPreview"
        >
          预览视频
        </div>
        <div class="border rounded px-2 py-1 cursor-pointer" @click="onClear">
          清除记录
        </div>
      </div>
    </fieldset>

    <fieldset
      class="w-full flex border hover:border-primary rounded p-4 flex-col gap-y-4"
    >
      <legend pl-2>其他设置</legend>
      <div class="flex w-full relative gap-x-4 items-center">
        <div>插入时间</div>
        <UiTime v-model="currentDate" type="day">
          <div class="flex gap-x-2">
            <div>
              {{ currentDate[0] }} 号 {{ currentDate[1] }} :
              {{ currentDate[2] }}
            </div>
          </div>
        </UiTime>
        <div
          class="bg-primary cursor-pointer px-2 py-1 rounded text-white"
          @click="onTime"
        >
          发送
        </div>
      </div>
      <div class="flex gap-x-2 items-center">
        <div>消息数量</div>
        <input
          v-model="msgNumber"
          min="0"
          type="number"
          class="border rounded flex-1 bg-color px-2 py-1"
        />
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: Number,
      default: 1,
    },
    disturb: {
      type: Boolean,
      default: false,
    },
    group: {
      type: Object as PropType<IGroupConfig>,
      default: () => {},
    },
  })

  const date = new Date()
  const emit = defineEmits([
    'bg',
    'time',
    'operate',
    'update:disturb',
    'group',
    'update:modelValue',
  ])

  const isDisturb = computed<boolean>({
    set(value) {
      emit('update:disturb', value)
    },
    get() {
      return props.disturb
    },
  })

  const msgNumber = computed<number>({
    set(value) {
      emit('update:modelValue', value)
    },
    get() {
      return props.modelValue
    },
  })

  const currentDate = ref<string[]>([
    date.getDate().toString(),
    date.getHours().toString(),
    date.getMinutes().toString(),
  ])

  function onTime() {
    const time = formatTime(currentDate.value)
    emit('time', time)
  }

  const currentColor = ref()
  const currentBgMode = ref('auto')
  const bgModeList = [
    {
      name: '默认',
      value: 'auto',
    },
    {
      name: '包含',
      value: 'contain',
    },
    {
      name: '填充',
      value: 'cover',
    },
  ]
  watch(currentColor, (newVal) => {
    emit('bg', { type: 'color', value: newVal })
  })
  watch(currentBgMode, () => {
    emit('bg', { mode: currentBgMode.value, type: 'custom' })
  })
  function onUpload(evt: FileList) {
    const reader = new FileReader()
    reader.onload = function (event) {
      emit('bg', {
        type: 'custom',
        value: event?.target?.result,
        mode: currentBgMode.value,
      })
    }
    // 读取文件内容
    reader.readAsDataURL(evt[0])
  }

  function onClear() {
    emit('operate', {
      type: 'clear',
    })
  }
  const exportConfig = ref({
    onlyContent: false,
    dialog: false,
  })
  const exportLoading = ref(false)
  function onExport() {
    exportLoading.value = true
    emit(
      'operate',
      {
        type: 'export',
        ...exportConfig.value,
      },
      () => {
        exportLoading.value = false
      },
    )
  }
  const longLoading = ref(false)
  function onLongExport() {
    longLoading.value = true
    emit(
      'operate',
      {
        type: 'long_export',
        ...exportConfig.value,
      },
      () => {
        longLoading.value = false
      },
    )
  }
  const recording = ref(false)

  function onRecord() {
    recording.value = !recording.value
    ScreenRecorder?.toggle?.()
  }

  function onPreview() {
    return navigateTo({
      path: '/replay',
    })
  }

  onUnmounted(() => {
    ScreenRecorder?.stop?.()
  })

  const isWatermark = ref(false)
  const watermark = ref('')
  const { $watermark } = useNuxtApp()

  watch([isWatermark, watermark], ([bool, value]) => {
    if (bool) {
      $watermark?.(value)
    } else {
      $watermark?.('')
    }
  })

  const config = ref(props.group)

  watch(config, (newVal) => {
    emit('group', newVal)
  })
</script>
