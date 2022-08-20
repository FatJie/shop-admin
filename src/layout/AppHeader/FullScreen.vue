<template>
  <div
    class="full-screen"
    @click="toggleFullScreen"
  >
    全屏
  </div>
</template>

<script lang="ts" setup>
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
</script>

<style lang="scss" scoped>
  .full-screen {
    border: #ccc 1px solid;
    font-size: 12px;
    color: #777;
    padding: 5px 3px;
    cursor:pointer;
  }
</style>
