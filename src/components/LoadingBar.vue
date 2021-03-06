<template>
  <div v-if="loadingBarState.isLoading" class="loading-bar-container">
    <div class="loading-bar"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LoadingBar',
  computed: {
    ...mapGetters(['loadingBarState']),
  },
}
</script>

<style scoped>
.loading-bar-container {
  position: relative;
  width: 100%;
  height: 3px;
  z-index: 99;
}
.loading-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  max-width: 0;
  background: #07335f;
  animation: loadingAnimation 2s infinite ease-in-out;
}

@keyframes loadingAnimation {
  0% {
    max-width: 20px;
    left: -20%;
  }
  50% {
    max-width: 400px;
    left: 50%;
    transform: translateX(-50%);
  }
  100% {
    max-width: 20px;
    left: 120%;
  }
}
</style>
