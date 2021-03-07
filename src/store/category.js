import firebase from 'firebase/app'

export default {
  actions: {
    async fetchCategory ({ commit, dispatch }) {
      try {
        const uid = await dispatch('auth/getUid')
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    },
    async addCategory ({ commit, dispatch }, { name, limit }) {
      try {
        const uid = await dispatch('auth/getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ name, limit })
        return { name, limit, id: category.key }
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    },
    async editCategory ({ commit, dispatch }, { name, limit, id }) {
      try {
        const uid = await dispatch('auth/getUid')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ name, limit })
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    }
  }
}
