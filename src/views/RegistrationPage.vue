<template>
  <v-container
    style="min-height: 100%"
    class="d-flex align-center justify-center"
  >
    <v-form
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
      <v-text-field
        v-model="testPassword"
        label="Введите пароль еще раз"
        type="password"
        required
      />
      <v-btn
        type="submit"
        :disabled="!isValid"
      >Зарегистрироваться</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { emailRegExp } from './LoginPage.vue'

const MIN_PASSWORD_LENGTH = 6

export default {
  name: 'RegistrationPage',
  data() {
    return {
      email: '',
      isEmailCorrect: false,
      password: '',
      emailRules: [this.validateEmail],
      testPassword: '',
    }
  },
  computed: {
    isValid() {
      return !!this.email
      && !!this.password
      && this.isEmailCorrect
      && this.isPasswordValid
      && this.isPasswordEquals /* && !this.user.isLoading */
    },
    isPasswordValid() {
      return this.password.length >= MIN_PASSWORD_LENGTH
    },
    isPasswordEquals() {
      return this.password === this.testPassword
    },
  },
  methods: {
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
