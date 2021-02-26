export default {
  install (App, options) {
    // console.log(App)
    const message = App.config.globalProperties.$message = function(html) {
      M.toast({html})
    }

    const error = App.config.globalProperties.$error = function(html) {
      M.toast({html: `[Ошибка]: ${html}`})
    }

    App.provide('message', message)
    App.provide('error', error)
  }
}