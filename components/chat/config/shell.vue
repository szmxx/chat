<template>
  <div class="flex flex-col gap-y-2 w-full">
    <fieldset
      class="w-full hover:bg-primary/10 flex border rounded p-4 flex-col gap-y-4"
    >
      <legend pl-2 font-bold>系统设置</legend>
      <div class="flex w-full relative flex-col gap-y-4">
        <UiRadio v-model="system" :list="systemList" class="flex gap-2">
        </UiRadio>
      </div>
    </fieldset>
    <fieldset
      class="w-full hover:bg-primary/10 flex border rounded p-4 flex-col gap-y-4"
    >
      <legend pl-2 font-bold>组件设置</legend>

      <div class="relative flex gap-x-2">
        <div>系统时间</div>

        <UiTime v-model="currentTime">
          <div class="flex gap-x-2">
            <div>{{ currentTime.join(' : ') }}</div>
          </div>
        </UiTime>
      </div>

      <div>信号强度</div>
      <UiRadio v-model="config.signal" class="flex gap-2" :list="signalList">
      </UiRadio>

      <div>WIFI强度</div>
      <div class="flex gap-x-2 items-center">
        <div>开启WIFI</div>
        <UiSwitch v-model="config.enable_wifi" size="16px"></UiSwitch>
      </div>
      <UiRadio
        v-show="config.enable_wifi"
        v-model="config.wifi"
        class="flex gap-2"
        :list="wifiList"
      >
      </UiRadio>

      <UiRadio
        v-show="!config.enable_wifi"
        v-model="config.g"
        class="flex gap-2"
        :list="gList"
      >
      </UiRadio>

      <div>电池</div>
      <div class="flex gap-x-2 items-center">
        <div class="text-hint">开启充电</div>
        <UiSwitch v-model="config.enable_battery" size="16px"></UiSwitch>
      </div>
      <div class="flex w-full gap-x-2 items-center">
        <div class="text-hint whitespace-nowrap">电池电量</div>

        <UiRange v-model="config.battery" :max="100" :min="1" class="flex-1">
        </UiRange>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    system: {
      type: String,
      default: '',
    },
  })

  const systemList = [
    {
      name: '苹果',
      value: 'ios',
    },
    {
      name: '安卓',
      value: 'android',
    },
  ]

  const wifiList = [
    {
      name: '0格',
      value: 0,
    },
    {
      name: '1格',
      value: 1,
    },
    {
      name: '2格',
      value: 2,
    },
    {
      name: '3格',
      value: 3,
    },
  ]

  const signalList = [
    {
      name: '0格',
      value: 0,
    },
    {
      name: '1格',
      value: 1,
    },
    {
      name: '2格',
      value: 2,
    },
    {
      name: '3格',
      value: 3,
    },
    {
      name: '4格',
      value: 4,
    },
  ]
  const gList = [
    {
      name: 'E',
      value: 'E',
    },
    {
      name: '2G',
      value: '2G',
    },
    {
      name: '3G',
      value: '3G',
    },
    {
      name: '4G',
      value: '4G',
    },
    {
      name: '5G',
      value: '5G',
    },
    {
      name: '6G',
      value: '6G',
    },
  ]

  const emit = defineEmits(['config', 'update:modelValue', 'update:system'])

  const system = computed<string>({
    set(value) {
      emit('update:system', value)
    },
    get() {
      return props.system
    },
  })

  const currentTime = computed<string[]>({
    set(value) {
      emit('update:modelValue', value)
    },
    get() {
      return props.modelValue
    },
  })

  const config = ref({
    battery: 100,
    signal: 4,
    wifi: 3,
    g: '5G',
    enable_wifi: true,
    enable_battery: false,
  })

  watch(
    config,
    () => {
      emit('config', config.value)
    },
    { immediate: true },
  )
</script>
