<script setup lang="ts">
  const online = useOnline()
  useSeoMeta({
    title: '聊天',
    description:
      '寻找国庆节头像制作服务？我们提供专业的国庆头像制作，让您在庆祝国庆节时展示个性化的头像。定制您的国庆头像，展示您对祖国的热爱和祝福。立即联系我们，让我们帮您制作独一无二的国庆头像！',
  })

  defineOgImage({
    title: '聊天',
    description:
      '寻找国庆节头像制作服务？我们提供专业的国庆头像制作，让您在庆祝国庆节时展示个性化的头像。定制您的国庆头像，展示您对祖国的热爱和祝福。立即联系我们，让我们帮您制作独一无二的国庆头像！',
  })
</script>

<template>
  <Chat v-if="online"></Chat>
  <div v-else text-hint>You're offline</div>
</template>
