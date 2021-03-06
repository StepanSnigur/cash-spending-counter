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
        :rules="passwordRules"
        label="Пароль"
        :type="isPasswordVisible ? 'text' : 'password'"
        :append-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="isPasswordVisible = !isPasswordVisible"
        required
      />
      <v-text-field
        v-model="testPassword"
        :rules="testPasswordRules"
        label="Введите пароль еще раз"
        type="password"
        required
      />
      <v-btn
        type="submit"
        :disabled="!isValid"
        :loading="user.isLoading"
      >Зарегистрироваться</v-btn>
      <ErrorAlert :errorMessage="user.error" />
    </v-form>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { emailRegExp } from './LoginPage.vue'
import ErrorAlert from '../components/ErrorAlert.vue'

const MIN_PASSWORD_LENGTH = 6

export default {
  name: 'RegistrationPage',
  data() {
    return {
      email: '',
      isEmailCorrect: false,
      emailRules: [this.validateEmail],
      password: '',
      isPasswordVisible: false,
      passwordRules: [this.isPasswordLengthValid],
      testPassword: '',
      testPasswordRules: [this.isPasswordsMatch],
    }
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
    isValid() {
      return !!this.email
      && !!this.password
      && this.isEmailCorrect
      && this.isPasswordValid
      && this.isPasswordEquals
      && !this.user.isLoading
    },
    isPasswordValid() {
      return this.password.length >= MIN_PASSWORD_LENGTH
    },
    isPasswordEquals() {
      return this.password === this.testPassword
    },
  },
  methods: {
    ...mapActions([
      'addNewUser',
    ]),
    handleFormSubmit() {
      const { email, password } = this
      this.addNewUser({ email, password })
    },
    validateEmail(email) {
      if (emailRegExp.test(email)) {
        this.isEmailCorrect = true
        return true
      }
      this.isEmailCorrect = false
      return 'Email некорректен'
    },
    isPasswordsMatch() {
      return this.password === this.testPassword || 'Пароли не совпадают'
    },
    isPasswordLengthValid() {
      return this.password.length >= MIN_PASSWORD_LENGTH || 'Пароль слишком короткий'
    },
  },
  components: {
    ErrorAlert,
  },
}
</script>
