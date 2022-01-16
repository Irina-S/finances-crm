import { getDatabase, ref, push, get, child } from 'firebase/database'

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase()
        await push(ref(db, `users/${uid}/records`), record)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase()
        const records =
          (await (await get(ref(db, `/users/${uid}/records`))).val()) || {}

        return Object.keys(records).map((key) => ({
          ...records[key],
          id: key,
        }))
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async fetchRecordById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase()
        const record =
          (await (
            await get(child(ref(db, `/users/${uid}/records/`), id))
          ).val()) || {}

        return {
          ...record,
          id,
        }
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
  },
}
