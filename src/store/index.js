import { createStore } from 'vuex'
import auth from './auth'
import info from './info'

export default createStore({
  state: {
    error: null
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    async fetchFixer () {
      const key = process.env.VUE_APP_FIXER
      const result = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
      return result.json()
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth,
    info
  }
})
