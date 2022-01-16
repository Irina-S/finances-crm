import { getDatabase, ref, onValue, update } from 'firebase/database'

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    },
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      const uid = await dispatch('getUid')
      const db = getDatabase()
      try {
        onValue(
          ref(db, `/users/${uid}/info`),
          (snapshot) => {
            const info = snapshot.val()
            commit('setInfo', info)
          },
          {
            onlyOnce: true,
          }
        )
      } catch (error) {
        commit('setError', error)
        console.error(error)
      }
    },
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      const uid = await dispatch('getUid')
      const db = getDatabase()
      try {
        const updateData = {
          ...getters.info,
          ...toUpdate,
        }
        await update(ref(db, `users/${uid}/info`), updateData)
        commit('setInfo', updateData)
      } catch (error) {
        commit('setError', error)
        console.error(error)
      }
    },
  },
  getters: {
    info: (s) => s.info,
  },
}
