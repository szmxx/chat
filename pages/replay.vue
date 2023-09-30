<script setup lang="ts">
  import Player from 'rrweb-player'
  import 'rrweb-player/dist/style.css'
  import { saveAs } from 'file-saver'
  const player = ref()
  const container = ref()
  const events = computed(() => ScreenRecorder.events)
  const loading = ref(false)
  onMounted(() => {
    if (ScreenRecorder.events.length < 2) return navigateTo('/')

    const { clientHeight, clientWidth } = container.value
    const instance = new Player({
      target: player.value, // 可以自定义 DOM 元素
      // 配置项
      props: {
        events: events.value,
        mouseTail: false,
        width: clientWidth,
        height: clientHeight - 80,
        showController: true,
        insertStyleRules: [
          `.rr-block {
          display: none !important
        }`,
          `main {
          background: rgba(var(--fill-default)) !important
        }`,
          `.markdown-item button::before {
          'mask-image': var(--un-icon) !important
        }`,
        ],
      },
    })
    useEventListener(window, 'resize', () => {
      instance.triggerResize()
    })
  })

  async function onExport() {
    if (!loading.value) {
      loading.value = true
      const { data } = await usePost(
        '/api/export',
        {
          events: events.value,
        },
        { responseType: 'blob' },
      )
      if (data.value) {
        const url = URL.createObjectURL(data?.value as Blob)
        saveAs(url, '视频.webm')
        ScreenRecorder.clear()
      }
      loading.value = false
    }
  }

  function onClear() {
    ScreenRecorder.clear()
  }

  function onBack() {
    return navigateTo('/')
  }
</script>

<template>
  <div
    ref="container"
    class="relative h-90% w-90% center flex-col p-4 shadow-sm bg-default"
  >
    <div ref="player">
      <div
        class="absolute bottom-3 right-2 z-9 center cursor-pointer gap-x-1 rounded p-1 text-xs bg-primary text-white"
        @click="onExport"
      >
        <div v-show="loading" class="loading h-3 w-3" />
        导出视频
      </div>
      <div
        class="absolute bottom-3 left-2 z-9 center cursor-pointer gap-x-1 rounded p-1 text-xs bg-primary text-white"
        @click="onClear"
      >
        清空记录
      </div>
    </div>
    <div
      i-ion-arrow-back-circle
      class="absolute top-0 cursor-pointer left-0 text-6 bg-primary"
      @click="onBack"
    ></div>
  </div>
</template>
