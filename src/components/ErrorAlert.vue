<template>
  <v-alert
    min-width="350px"
    max-width="350px"
    class="alert-wrapper mt-8"
    type="error"
    :value="!!errorMessage"
    transition="scroll-y-transition"
  >
    {{ errorMessage || '' }}
  </v-alert>
</template>

<script>
export default {
  name: 'ErrorAlert',
  props: {
    errorMessage: [String, Boolean],
  },
}
</script>

<style scoped>
.alert-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
