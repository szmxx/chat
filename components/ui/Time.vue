<template>
  <div class="flex">
    <div ref="timeRef" class="cursor-pointer" @click="onToggle">
      <slot></slot>
    </div>
    <div
      v-show="isShowPanel"
      ref="panelRef"
      class="flex absolute bottom-110% p-2.5 overflow-hidden rounded bg-default shadow-sm"
      :class="{ 'top-110% bottom-auto': direction === 'bottom' }"
    >
      <div
        v-if="type === 'day'"
        ref="dayRef"
        class="max-h-30 flex flex-col gap-y-2 nonescrollbar preserve-3d overflow-y-auto snap-y snap-mandatory"
        @click="onDay"
      >
        <div
          v-for="(day, index) in days"
          :key="'day' + day"
          :data-index="index"
          class="snap-center px-2 min-h-4.5 cursor-pointer center"
        >
          {{ day }}
        </div>
      </div>

      <div
        ref="hourRef"
        class="max-h-30 flex flex-col gap-y-2 nonescrollbar overflow-y-auto snap-y snap-mandatory"
        @click="onHour"
      >
        <div
          v-for="(hour, index) in hours"
          :key="'hour' + hour"
          class="snap-center px-2 min-h-4.5 center cursor-pointer"
          :data-index="index"
        >
          {{ hour }}
        </div>
      </div>
      <div
        ref="minuteRef"
        class="max-h-30 flex flex-col gap-y-2 nonescrollbar overflow-y-auto snap-y snap-mandatory"
        @click="onMinute"
      >
        <div
          v-for="(minute, index) in minutes"
          :key="'minute' + minute"
          :data-index="index"
          class="snap-center px-2 cursor-pointer min-h-4.5 center"
        >
          {{ minute }}
        </div>
      </div>

      <div class="mask rounded"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    type: {
      type: String,
      default: 'hour',
    },
    direction: {
      type: String,
      default: 'top',
    },
  })
  const panelRef = ref()
  const isShowPanel = ref(false)
  const timeRef = ref()

  const dayRef = ref()
  const hourRef = ref()
  const minuteRef = ref()

  const emit = defineEmits(['update:modelValue'])
  const current = computed<string[]>({
    set(value) {
      emit('update:modelValue', value)
    },
    get() {
      return props.modelValue
    },
  })

  watch(isShowPanel, (newVal) => {
    if (newVal) {
      const [day, hour, minute] =
        props.type === 'day' ? current.value : ['', ...current.value]
      if (day) {
        const index = days.findIndex((i) => parseInt(i) === parseInt(day))
        scrollToDay(index)
      }
      if (hour) {
        const index = hours.findIndex((i) => parseInt(i) === parseInt(hour))
        scrollToHour(index)
      }
      if (minute) {
        const index = minutes.findIndex((i) => parseInt(i) === parseInt(minute))
        scrollToMinute(index)
      }
    }
  })
  onMounted(() => {
    let i = 0
    if (props.type === 'day') {
      useEventListener(dayRef.value, 'scroll', () => {
        const index = Math.floor(dayRef.value.scrollTop / 26)
        if (days[index + 2]) {
          current.value[0] = days[index + 2].slice(0, -1)
        }
      })
      i++
    }

    useEventListener(hourRef.value, 'scroll', () => {
      const index = Math.floor(hourRef.value.scrollTop / 26)
      if (hours[index + 2]) {
        current.value[i] = hours[index + 2].slice(0, -1)
      }
    })

    useEventListener(minuteRef.value, 'scroll', () => {
      const index = Math.floor(minuteRef.value.scrollTop / 26)
      if (minutes[index + 2]) {
        current.value[i + 1] = minutes[index + 2].slice(0, -1)
      }
    })
  })

  onMounted(() => {
    onClickOutside(
      panelRef,
      () => {
        isShowPanel.value = false
      },
      {
        ignore: [timeRef],
      },
    )
  })

  function onToggle() {
    isShowPanel.value = !isShowPanel.value
  }

  const days = getDays()
  days.push('', '')
  days.unshift('', '')
  const hours = Array.from({ length: 24 }).map(
    (_, index) => (index < 10 ? '0' + index : index) + '时',
  )
  hours.push('', '')
  hours.unshift('', '')
  const minutes = Array.from({ length: 60 }).map(
    (_, index) => (index < 10 ? '0' + index : index) + '分',
  )
  minutes.push('', '')
  minutes.unshift('', '')

  function getDays(count = 30) {
    const days = []
    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - count / 2)
    while (count > 0) {
      const date = currentDate.getDate()
      days.push((date < 10 ? '0' + date : date) + '号')
      currentDate.setDate(currentDate.getDate() + 1)
      count--
    }
    return days
  }

  function scrollToDay(index: number, type = 'auto') {
    if (index > 0) {
      setTimeout(() => {
        dayRef?.value.scrollTo({
          behavior: type,
          top: (index - 2) * 24,
        })
      }, 0)
    }
  }

  function scrollToHour(index: number, type = 'auto') {
    if (index > 0) {
      setTimeout(() => {
        hourRef?.value.scrollTo({
          behavior: type,
          top: index * 24,
        })
      }, 0)
    }
  }

  function scrollToMinute(index: number, type = 'auto') {
    if (index > 0) {
      setTimeout(() => {
        minuteRef?.value.scrollTo({
          behavior: type,
          top: index * 24,
        })
      }, 0)
    }
  }

  function onDay(evt: MouseEvent) {
    const index = (evt?.target as HTMLElement)?.dataset?.index
    if (index) scrollToDay(+index, 'smooth')
  }
  function onHour(evt: MouseEvent) {
    const index = (evt?.target as HTMLElement)?.dataset?.index
    if (index) scrollToHour(+index, 'smooth')
  }
  function onMinute(evt: MouseEvent) {
    const index = (evt?.target as HTMLElement)?.dataset?.index
    if (index) scrollToMinute(+index, 'smooth')
  }
</script>

<style scoped lang="scss">
  .mask {
    position: absolute;
    inset: 0;
    z-index: 3;
    background-position: top, bottom;
    background-repeat: no-repeat;
    background-size: 100% 60px;
    background-image: linear-gradient(
        180deg,
        rgba(var(--fill-default), 0.9),
        rgba(var(--fill-default), 0.6)
      ),
      linear-gradient(
        0deg,
        rgba(var(--fill-default), 0.9),
        rgba(var(--fill-default), 0.6)
      );

    @apply pointer-events-none z-3 center;
  }
</style>
