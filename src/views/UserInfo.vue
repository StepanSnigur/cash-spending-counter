<template>
  <v-container>
    <v-btn
      to="/user"
      class="mb-7 mt-3"
      color="orange darken-2"
      dark
    >
      <v-icon
        dark
        left
      > mdi-arrow-left</v-icon>
      Назад
    </v-btn>
    <v-row align="center" class="user-info pb-7 mb-4">
      <div class="profile-image">
        <v-img
          class="profile-icon"
          :src="user.icon || require('../assets/standart-user-icon.png')"
          width="100"
        />
        <v-btn
          class="profile-btn"
          fab
          dark
          large
          color="cyan"
          @click="changingProfileIcon = true"
        >
          <v-icon dark>
            mdi-pencil
          </v-icon>
        </v-btn>
      </div>
      <div class="text-h4 ml-5">
        {{ user.email }}
        <v-btn class="ml-5" elevation="1" @click="changingEmail = true" fab small>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>
      <v-spacer />
      <v-btn @click="logOut" :loading="user.isLoading" color="error" dark>Выйти</v-btn>
    </v-row>
    <Settings />
    <v-dialog max-width="450" v-model="changingProfileIcon">
      <v-card class="pb-5">
        <v-card-title>Сменить изображение профиля</v-card-title>
        <v-divider />
        <v-file-input
          class="ml-5 mr-5"
          show-size
          truncate-length="30"
          prepend-icon="mdi-camera"
          accept="image/png, image/jpeg"
          @change="handleIconChange"
          :loading="user.isIconLoading"
        />
        <v-btn
          class="d-flex justify-center mx-auto mt-3"
          @click="changeIcon"
        >Изменить</v-btn>
      </v-card>
    </v-dialog>
    <v-dialog max-width="450" v-model="changingEmail">
      <v-card class="pb-5">
        <v-card-title>Сменить email</v-card-title>
        <v-divider />
        <v-text-field
          label="Введите новый email"
          class="ml-5 mr-5 mt-3"
          :loading="user.isEmailLoading"
        ></v-text-field>
        <v-btn
          class="d-flex justify-center mx-auto mt-3"
          @click="changeEmail"
        >Изменить</v-btn>
      </v-card>
    </v-dialog>
    <v-alert
      style="position: absolute; top: 0"
      min-width="350px"
      max-width="350px"
      class="mt-8"
      type="error"
      :value="!!user.error"
      transition="scroll-y-transition"
    >
      {{ user.error }}
    </v-alert>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Settings from '../components/UserSettings/Settings.vue'

export default {
  name: 'UserInfo',
  data() {
    return {
      changingProfileIcon: false,
      changingEmail: false,
      newUserIcon: null,
    }
  },
  mounted() {
    if (!this.user.email) this.$router.push('/login')
    console.log(this.user)
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  methods: {
    ...mapActions([
      'logOut',
      'changeUserIcon',
      'changeUserEmail',
    ]),
    handleIconChange(e) {
      this.newUserIcon = e
    },
    async changeIcon() {
      await this.changeUserIcon({
        userId: this.user.id,
        icon: this.newUserIcon,
      })
      this.changingProfileIcon = false
    },
    async changeEmail() {
      await this.changeUserEmail('test23@mail.ru')
      this.changingEmail = false
    },
  },
  components: {
    Settings,
  },
}
</script>

<style scoped>
.container {
  width: 700px;
}
.user-info {
  border-bottom: 1px solid #000;
}
.profile-image {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}
.profile-icon {
  z-index: 1;
}
.profile-icon, .profile-btn {
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.profile-btn {
  opacity: 0;
  transition: .3s;
  z-index: 2;
  border: 1px solid #fff;
}
.profile-image:hover > .profile-btn {
  opacity: 1;
}
</style>
