import firebase from 'firebase/app'

export default {
  actions: {
    async fetchRecords ({ dispatch, commit }) {
      try {
        const uid = await dispatch('auth/getUid')
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
        return Object.keys(records).map(key => ({ ...records[key], id: key }))
      } catch (error) {
        commit('setError', e, { root: true })
        throw error
      }
    },
    async addRecord ({ dispatch, commit }, data) {
      try {
        const uid = await dispatch('auth/getUid')
        await firebase.database().ref(`/users/${uid}/records`).push(data)
      } catch (error) {
        commit('setError', error, { root: true })
        throw error
      }
    }
  }
}
