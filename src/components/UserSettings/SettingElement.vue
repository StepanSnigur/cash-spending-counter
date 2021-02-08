<template>
  <v-container class="d-flex justify-space-between">
    <h3>{{ placeholder }}</h3>
    <v-select
      v-if="value instanceof Array"
      class="setting-select"
      v-model="theme"
      :items="value"
      label="Выберите тему оформления"
      @change="handleSelectChange"
      return-object
    ></v-select>
  </v-container>
</template>

<script>
export default {
  name: 'SettingElement',
  props: {
    placeholder: String,
    type: String,
    value: [Array, Boolean],
    defaultTheme: String,
  },
  data() {
    return {
      theme: JSON.parse(localStorage.getItem('darkTheme')).title || this.defaultTheme,
    }
  },
  methods: {
    handleSelectChange(value) {
      this.$emit('change', value)
    },
  },
}
</script>

<style scoped>
.setting-select {
  max-width: 200px;
}
</style>
