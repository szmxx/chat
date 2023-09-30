<template>
  <div
    class="w-85% h-full z-9 rounded bg-default/20 shadow-sm backdrop-blur-8 relative origin-center-top flex flex-col items-center"
  >
    <img src="~/assets/cloud.png" class="cloud z-9 w-100% scale-65" />

    <div
      ref="containRef"
      class="contain w-full overflow-hidden scale-65 origin-center-top border-b border-b-light/10 h-175 top-40 absolute"
    >
      <div
        v-for="(item, index) in list"
        :key="item.id"
        :style="{
          left: item.left,
          top: item.top,
          fontSize: item.size,
          color: item.color,
          '--speed': item.speed,
          '--deg': item.deg,
        }"
        class="text absolute top-0 uppercase origin-center-bottom"
        @animationend="onended(index)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>

  <div class="flex absolute flex-wrap mask rounded bg-transparent">
    <div v-for="item in imgList" :key="item" class="w-1/4 h-auto">
      <img :src="item" class="w-full h-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
  interface IText {
    id?: string
    top: string
    left: string
    size: string
    text?: string
    speed?: string
    color?: string
    deg?: string
  }
  import { USER_LIST, COLOR_LIST } from '~/config'
  const textList = USER_LIST.join('').split('')
  const list = ref<IText[]>([])
  const imgList = ref([
    (await import('~/assets/wx/1.png'))?.default,
    (await import('~/assets/wx/2.png'))?.default,
    (await import('~/assets/wx/3.png'))?.default,
    (await import('~/assets/wx/4.png'))?.default,
    (await import('~/assets/wx/5.png'))?.default,
    (await import('~/assets/wx/6.png'))?.default,
    (await import('~/assets/wx/7.png'))?.default,
  ])
  imgList.value = imgList.value.concat(imgList.value)
  imgList.value = imgList.value.concat(imgList.value)

  onMounted(() => {
    random(50)
  })

  function random(count: number) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        list.value.push({
          text: text(),
          ...generate(),
          id: crypto.randomUUID(),
        })
      }, i * 200)
    }
  }

  function text() {
    const index = getRandomInt(0, textList.length - 1)
    return textList[index]
  }

  function generate(): Exclude<IText, 'id' & 'text'> {
    const left = getRandomInt(10, 90)
    const size = getRandomInt(12, 30)
    const speed = getRandomInt(1, 10)
    const deg = getRandomInt(0, 360)
    const index = getRandomInt(0, COLOR_LIST.length - 1)
    return {
      left: left + '%',
      top: top + 'px',
      size: size + 'px',
      speed: speed + 's',
      color: COLOR_LIST[index],
      deg: deg + 'deg',
    }
  }

  function onended(index: number) {
    list.value.splice(index, 1)
    list.value.push({
      text: text(),
      ...generate(),
      id: crypto.randomUUID(),
    })
  }
</script>

<style scoped lang="scss">
  .cloud {
    filter: drop-shadow(2px 2px 16px rgba(var(--color-white, 0.1)))
      drop-shadow(-2px -2px 16px rgba(var(--color-white, 0.1)));
  }

  .contain {
    -webkit-box-reflect: below 0%
      linear-gradient(transparent 80%, rgba(var(--fill-dark), 0.2) 20%);
  }

  .text {
    color: var(--color);
    line-height: 1.2em;
    text-shadow:
      0 0 5px rgb(var(--color-white)),
      0 0 15px rgb(var(--color-white)),
      0 0 25px rgb(var(--color-white));
    animation: animate var(--speed) linear;
  }

  @keyframes animate {
    0% {
      transform: translateY(8px) scale(1);
    }

    70% {
      transform: translateY(670px) scale(1);
    }

    100% {
      transform: translateY(678px) scale(0);
    }
  }

  .mask::before {
    content: '';

    @apply absolute w-full h-full bg-dark/10 backdrop-blur-2 rounded;
  }

  .mask {
    animation: slide-top 500s linear infinite alternate;
  }

  @keyframes slide-top {
    0% {
      transform: translate(0, 25%);
    }

    100% {
      transform: translate(0, -25%);
    }
  }
</style>
