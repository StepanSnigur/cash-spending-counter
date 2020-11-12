<template>
  <v-container
    style="min-height: 100%"
    class="d-flex align-center justify-center"
  >
    <v-form
      @submit.prevent="handleFormSubmit"
      class="d-flex flex-column justify-center"
      style="width: 350px"
    >
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Email"
        type="email"
        required
      />
      <v-text-field
        v-model="password"
        label="Пароль"
        type="password"
        required
      />
      <v-btn
        type="submit"
        :disabled="!isValid"
      >Войти</v-btn>
      <v-alert
        style="position: absolute; top: 0"
        min-width="350px"
        max-width="350px"
        class="mt-8"
        type="error"
        :value="user.error"
        transition="scroll-y-transition"
      >
        {{ user.error }}
      </v-alert>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

// eslint-disable-next-line no-useless-escape
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      isEmailCorrect: false,
      password: '',
      emailRules: [this.validateEmail],
    }
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
    isValid() {
      return !!this.email && !!this.password && this.isEmailCorrect && !this.user.isLoading
    },
  },
  methods: {
    ...mapActions([
      'setUser',
    ]),
    handleFormSubmit() {
      const { email, password } = this
      this.setUser({ email, password })
    },
    validateEmail(email) {
      if (emailRegExp.test(email)) {
        this.isEmailCorrect = true
        return true
      }
      this.isEmailCorrect = false
      return 'Email некорректен'
    },
  },
}
</script>
