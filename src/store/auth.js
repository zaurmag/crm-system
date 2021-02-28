import firebase from 'firebase/app'

export default {
  namespaced: true,
  actions: {
    async login ({ dispatch, commit }, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        throw error
      }
    },
    async logout() {
      await firebase.auth().singOut
    },
    async register ({ dispatch }, {email, password, name}) {
      try {
        const uid = await dispatch('getUid')
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name
        })
      } catch (error) {
        throw error
      }
    },
    getUid () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    }
  }
}
