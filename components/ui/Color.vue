<!--
 * @Author: cola
 * @Date: 2023-09-01 23:42:59
 * @LastEditors: cola
 * @Description:
-->
<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  })
  const emit = defineEmits(['update:modelValue'])
  const colorList = [
    '#A1CCD150',
    '#E9B38450',
    '#7C9D9650',
    '#FEBBCC50',
    '#D4E2D450',
    '#4682A950',
    '#DBC4F050',
    '#91C8E450',
    '#916DB350',
    '#C8AE7D50',
    '#6C342850',
    '#7A9D5450',
    '#FD8D1450',
    '#FBA1B750',
    '#DAC0A350',
    '#9ED2BE50',
    '#900C3F50',
    '#44506950',
    '#33BBC550',
    '#E1989850',
    '#BEADFA50',
    '#F94C1050',
    '#614BC350',
  ]
  const colorRef = ref()
  onMounted(() => {
    onClickOutside(colorRef, () => {
      onHidden()
    })
  })
  const isShowColor = ref(false)
  const current = computed<string>({
    set(value) {
      emit('update:modelValue', value)
    },
    get() {
      return props.modelValue
    },
  })
  function onColorPick(evt: MouseEvent) {
    const color = (evt.target as HTMLElement)?.dataset?.color
    current.value = color!
    isShowColor.value = false
  }

  function onClick() {
    isShowColor.value = !isShowColor.value
  }

  function onHidden() {
    isShowColor.value = false
  }
</script>

<template>
  <div class="h-full w-full flex items-center gap-x-2 rounded">
    <div class="center flex-1">
      <div
        :class="{ blank: !current }"
        :style="{ background: current }"
        class="h-8 w-full center cursor-pointer rounded text-sm text-light"
        @click="onClick"
      >
        {{ current }}
      </div>
    </div>
    <Transition name="fade">
      <div
        v-show="isShowColor"
        ref="colorRef"
        class="absolute top-0 mt-18 right-0 max-w-50 flex flex-wrap gap-2 rounded p-2 shadow-sm bg-default"
        @click="onColorPick"
      >
        <div
          v-for="color in colorList"
          :key="color"
          :style="{ background: color }"
          class="h-10 w-10 center cursor-pointer rounded-2 text-light"
          :data-color="color"
        >
          <div
            v-show="color === current"
            :data-color="color"
            i-ion-checkmark-circle
          />
        </div>
        <div
          class="blank h-10 w-10 center cursor-pointer border rounded-2 text-light"
          data-color=""
        >
          <div v-show="'' === current" data-color="" i-ion-checkmark-circle />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
  .blank {
    background-image: linear-gradient(
        45deg,
        rgb(var(--fill-hover)) 25%,
        transparent 25%,
        transparent 75%,
        rgb(var(--fill-hover)) 75%
      ),
      linear-gradient(
        45deg,
        rgb(var(--fill-hover)) 25%,
        transparent 25%,
        transparent 75%,
        rgb(var(--fill-hover)) 75%
      );
    background-position:
      0 0,
      5px 5px;
    background-size: 10px 10px;
  }
</style>
