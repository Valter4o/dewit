import firebase from 'firebase/app'

export default {
  namespaced: true,
  state: {
    items: {},
  },
  actions: {
    createUser({ state, commit }, { id, email, username }) {
      return new Promise((resolve, reject) => {
        const registeredAt = Math.floor(Date.now() / 1000)
        const usernameLower = username.toLowerCase()
        email = email.toLowerCase()
        const user = {
          email,
          usernameLower,
          registeredAt,
          username,
          projects: [],
        }

        firebase
          .firestore()
          .collection('user')
          .doc(id)
          .set(user)
          .then(() => {
            commit(
              'setItem',
              { resource: 'user', id, item: user },
              { root: true }
            )
            resolve(state.items[id])
          })
      })
    },

    fetchUser: ({ dispatch }, { id }) =>
      dispatch('fetchItem', { resource: 'user', id }, { root: true }),

    updateUser(_, { id, user }) {
      firebase
        .firestore()
        .collection('user')
        .doc(id)
        .update(user)
    },
  },
}
