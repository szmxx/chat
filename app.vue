<!--
 * @Author: cola
 * @Date: 2023-08-06 17:42:54
 * @LastEditors: cola
 * @Description:
-->
<script setup lang="ts">
import { name } from "./package.json";

useHead({
  title: name,
});
</script>

<template>
  <Html dir="ltr">
    <Head>
      <VitePwaManifest />
    </Head>
    <Body>
      <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
