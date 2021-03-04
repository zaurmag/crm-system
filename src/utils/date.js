export default {
  install (App, format) {
    App.config.globalProperties.$dateF = function (html, format = 'date') {
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
      return new Intl.DateTimeFormat('ru-RU', options).format(new Date(html))
    }
  }
}
