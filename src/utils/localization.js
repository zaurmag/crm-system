import { useStore } from 'vuex'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'

export default {
  install (App) {
    const localData = {
      'ru-RU': ru,
      'en-US': en
    }
    const localize = App.config.globalProperties.$localize = function (key) {
      const store = useStore()
      const lang = store.getters.info.locale || 'ru-RU'
      return localData[lang][key] || `[Ошибка локализации - ключ ${key} не найден]`
    }

    App.provide('localize', localize)
  }
}
