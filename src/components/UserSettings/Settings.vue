<template>
  <v-container>
    <SettingElement
      type="select"
      placeholder="Тема приложения"
      :value="themes.map(theme => theme.title)"
      :defaultTheme="defaultTheme"
      @change="handleThemeChange"
    />
  </v-container>
</template>

<script>
import SettingElement from './SettingElement.vue'
import ThemeManager from '../../utils/themeManager'

const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches

export default {
  name: 'Settings',
  data() {
    return {
      defaultTheme: 'Светлая',
      themes: [
        {
          title: 'Светлая',
          isDarkTheme: false,
        },
        {
          title: 'Темная',
          isDarkTheme: true,
        },
        {
          title: 'Системная',
          isDarkTheme: getSystemTheme(),
        },
      ],
    }
  },
  components: {
    SettingElement,
  },
  methods: {
    handleThemeChange(value) {
      const currentTheme = this.themes.find((theme) => theme.title === value)
      new ThemeManager(this.$vuetify).changeTheme(currentTheme)
    },
  },
}
</script>
