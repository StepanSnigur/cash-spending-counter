import ThemeManager from '../../src/utils/themeManager'

describe('ThemeManager', () => {
  // eslint-disable-next-line no-proto
  jest.spyOn(window.localStorage.__proto__, 'setItem');
  // eslint-disable-next-line no-proto
  window.localStorage.__proto__.setItem = jest.fn();
  // eslint-disable-next-line no-proto
  jest.spyOn(window.localStorage.__proto__, 'getItem');
  // eslint-disable-next-line no-proto
  window.localStorage.__proto__.getItem = jest.fn(() => JSON.stringify({}));

  const vuetifyMock = {
    theme: {
      dark: true,
    },
  }
  const themeManager = new ThemeManager(vuetifyMock)

  it('Correct get data from local storage', () => {
    themeManager.setThemeFromLocalStorage()
    expect(localStorage.getItem).toBeCalledWith('appTheme')
    expect(vuetifyMock.theme.dark).toBe(false)
  })
  it('Correct change theme', () => {
    const themeObj = {
      title: 'Светлая',
      isDarkTheme: false,
    }
    themeManager.changeTheme(themeObj)
    expect(localStorage.setItem).toHaveBeenCalled()
    expect(vuetifyMock.theme.dark).toBe(false)
  })
})
