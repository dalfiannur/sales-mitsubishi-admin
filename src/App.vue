<script setup lang="ts">
import { darkTheme } from 'naive-ui'
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <router-view />
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>