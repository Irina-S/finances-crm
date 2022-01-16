import { getDatabase, ref, set } from 'firebase/database'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth'

export default {
  actions: {
    async login({ commit }, { email, password }) {
      const auth = getAuth()
      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        console.log(error)
        commit('setError', error)
        throw error
      }
    },
    async logout({ commit }) {
      const auth = getAuth()
      await signOut(auth)
      commit('clearInfo')
    },
    async register({ dispatch, commit }, { email, password, name }) {
      console.log(dispatch, commit)
      const auth = getAuth()
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        console.log(response)
        const uid = await dispatch('getUid')
        console.log(uid)
        const db = getDatabase()
        await set(ref(db, `users/${uid}/info`), {
          bill: 1000,
          name,
        })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    getUid() {
      const auth = getAuth()
      const user = auth.currentUser
      return user ? user.uid : null
    },
  },
}
