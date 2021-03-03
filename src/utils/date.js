export default {
  install(App, options) {
    App.config.globalProperties.$dateF = function(html) {
      new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: 'numeric',
        second: 'numeric'
      }).format(new Date(html))
    }
  }
}
