export default {
    install (App, options) {
      App.config.globalProperties.$currency = function(amount, currency) {
        return new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency
      }).format(amount)
      }
    }
}
