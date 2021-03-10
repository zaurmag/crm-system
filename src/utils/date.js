import { useStore } from 'vuex'

export default {
  install (App, format) {
    App.config.globalProperties.$dateF = function (html, format = 'date') {
      const store = useStore()
      const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      }
      if (format === 'datetime') {
        options.hour = '2-digit'
        options.minute = 'numeric'
        options.second = 'numeric'
      }
      const locale = store.getters.info.locale || 'ru-RU'
      return new Intl.DateTimeFormat(locale, options).format(new Date(html))
    }
  }
}
