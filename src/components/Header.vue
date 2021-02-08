<template>
  <v-app-bar
    app
    color="primary"
  >
    <div class="d-flex align-center">
      <v-img
        alt="CSC Logo"
        class="shrink mr-2"
        contain
        src="../assets/logo.png"
        transition="scale-transition"
        width="50"
      />
    </div>

    <v-spacer></v-spacer>

    <v-btn
      class="mr-5"
      @click="goBack"
    >Назад</v-btn>
    <v-btn
      v-if="user.email"
      to="/user/info"
      height="auto"
      class="pt-1 pb-1"
    >
      <v-img
        contain
        width="40"
        alt="User icon"
        :src="user.icon || require('../assets/stock-user-icon.png')"
      />
    </v-btn>
    <v-btn v-else to="/login">
      Войти
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  methods: {
    goBack() {
      console.log('goback', this.$router);
      this.$router.go(-1)
    },
  },
}
</script>
