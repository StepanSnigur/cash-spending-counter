class ThemeManager {
  constructor($vuetify) {
    this.$vuetify = $vuetify
  }

  changeTheme = (theme) => {
    localStorage.setItem('appTheme', JSON.stringify(theme))
    this.$vuetify.theme.dark = theme.isDarkTheme
  }

  setThemeFromLocalStorage = () => {
    const theme = JSON.parse(localStorage.getItem('appTheme'))?.isDarkTheme ?? false
    this.$vuetify.theme.dark = theme
  }
}

export default ThemeManager
