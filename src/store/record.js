import firebase from 'firebase/app'

export default {
  actions: {
    async addRecord ({ dispatch, commit }, data) {
      try {
        const uid = await dispatch('auth/getUid')
        await firebase.database().ref(`/users/${uid}/records`).push(data)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  }
}
