<template>
  <div class="flex h-full relative gap-x-1px items-end">
    <div
      v-if="system !== 'ios'"
      class="scale-50 text-xs -mr-0.5 origin-bottom-right"
    >
      <sup class="text-xs">{{ g }}</sup>
      <svg
        fill="currentColor"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1274"
        width="20"
        height="20"
        class="rotate-90deg -mt-2 -mb-1 step"
      >
        <path
          d="M252 462h524c19.9 0 36-16.1 36-36s-16.1-36-36-36H339.4l59-59c14.1-14.1 14.1-36.9 0-50.9-14.1-14.1-36.9-14.1-50.9 0L230.3 397.2c-8.7 6.6-14.3 17-14.3 28.8 0 19.9 16.1 36 36 36zM802 564c-8.5-8.5-20.3-11.9-31.4-10H252c-19.9 0-36 16.1-36 36s16.1 36 36 36h437.1l-58.5 58.5c-14.1 14.1-14.1 36.9 0 50.9 7 7 16.2 10.5 25.5 10.5s18.4-3.5 25.5-10.5L802 615c14-14.1 14-36.9 0-51z"
          p-id="1275"
        ></path>
      </svg>
    </div>
    <div
      v-for="i in 4"
      :key="i"
      class="w-3px bg-dark scale-x-60 rounded-1 overflow-hidden"
      :style="{ height: (i + 1) * 20 + '%' }"
      :class="{ 'bg-info': i > signal }"
    ></div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    signal: {
      type: Number,
      default: 2,
    },
    system: {
      type: String,
      default: 'ios',
    },
    g: {
      type: String,
      default: '5G',
    },
  })
</script>

<style lang="scss" scoped>
  .step {
    animation: step 3s ease-in-out infinite alternate;
  }

  @keyframes step {
    0% {
      opacity: 0.3;
    }

    100% {
      opacity: 1;
    }
  }
</style>
