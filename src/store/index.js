import { createStore } from 'vuex'
import auth from './auth'
import info from './info'

export default createStore({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    },
    setInfo (state, info) {
      state.info = info
    },
    clearInfo () {
      state.info = {}
    }
  },
  actions: {

  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth,
    info
  }
})
