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
import ThemeManager from './utils/themeManager'

export default {
  name: 'App',
  components: {
    Header,
    LoadingBar,
  },
  mounted() {
    // eslint-disable-next-line no-new
    new ThemeManager(this.$vuetify).setThemeFromLocalStorage()
  },
};
</script>

<style>
html { overflow-y: auto !important }
</style>
