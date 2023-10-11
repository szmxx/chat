<script setup lang="ts">
  const online = useOnline()
  useSeoMeta({
    title: '对话',
    description:
      '在线制作微信聊天记录，免安装支持安卓苹果，支持群聊功能，一键导出图片和视频，快速帮助你创作爆款短视频、热门段子',
  })

  defineOgImage({
    title: '对话',
    description:
      '在线制作微信聊天记录，免安装支持安卓苹果，支持群聊功能，一键导出图片和视频，快速帮助你创作爆款短视频、热门段子',
  })
</script>

<template>
  <Chat v-if="online"></Chat>
  <div v-else text-hint>You're offline</div>
</template>
