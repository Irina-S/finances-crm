import { getDatabase, ref, push, get, child, update } from 'firebase/database'

export default {
  actions: {
    async fetchCategories({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase()
        const categories =
          (await (await get(ref(db, `/users/${uid}/categories`))).val()) || {}

        return Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }))
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async fetchCategoryById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase()
        const category =
          (await (
            await get(child(ref(db, `/users/${uid}/categories/`), id))
          ).val()) || {}

        return {
          ...category,
          id,
        }
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async createCategory({ dispatch, commit }, { title, limit }) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase()
        const category = push(ref(db, `users/${uid}/categories`), {
          title,
          limit,
        })
        return {
          title,
          limit,
          id: category.key,
        }
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async updateCategory({ dispatch, commit }, { title, limit, id }) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase()
        const category = child(ref(db, `users/${uid}/categories`), id)
        await update(category, { title, limit })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
  },
}
