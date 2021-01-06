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
      <h5 class="ml-auto mr-auto mt-3">
        У вас нет аккаунта? <v-btn text small to="/registration">Зарегитрируйтесь!</v-btn>
      </h5>
      <ErrorAlert :errorMessage="user.error" />
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ErrorAlert from '../components/ErrorAlert.vue'

// eslint-disable-next-line no-useless-escape
export const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

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
  components: {
    ErrorAlert,
  },
}
</script>
