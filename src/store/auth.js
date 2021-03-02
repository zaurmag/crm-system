import firebase from 'firebase/app'

export default {
  namespaced: true,
  actions: {
    async login ({ commit }, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        commit('setError', error, { root: true })
        throw error
      }
    },
    async logout ({ commit }) {
      await firebase.auth().singOut
      commit('clearInfo', { root: true })
    },
    async register ({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name
        })
      } catch (error) {
        commit('setError', error, { root: true })
        throw error
      }
    },
    getUid () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    }
  }
}
