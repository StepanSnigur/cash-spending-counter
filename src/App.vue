<template>
  <v-app>
    <LoadingBar />
    <Header />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue'
import LoadingBar from './components/LoadingBar.vue'

export default {
  name: 'App',
  components: {
    Header,
    LoadingBar,
  },
};
</script>

<style>
html { overflow-y: auto !important }
</style>
