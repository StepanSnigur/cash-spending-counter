<template>
  <v-alert
    style="position: absolute; top: 0"
    min-width="350px"
    max-width="350px"
    class="mt-8"
    type="error"
    :value="!!errorMessage"
    transition="scroll-y-transition"
  >
    {{ errorMessage }}
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
