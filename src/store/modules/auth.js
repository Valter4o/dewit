import firebase from 'firebase/app'

export default {
    namespaced: true,
    state: {
        authId: null,
    },

    getters: {
        authUser(state, getters, rootState) {
            return state.authId ? rootState.user.items[state.authId] : null
        }
    },

    actions: {
        registerUserWithEmailAndPassword({ dispatch }, { username, email, password }) {
            return firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    return dispatch('user/createUser', { id: user.user.uid, username, email }, { root: true })
                })
                .then(() => dispatch('fetchAuthUser'))
        },
        authWithGoogle({ dispatch }, { register }) {
            const provider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithPopup(provider).then(({ user: { displayName, email, uid } }) => {
                if (register) {
                    return dispatch('user/createUser', { id: uid, username: displayName, email }, { root: true })
                }
            })
        },
        fetchAuthUser({ dispatch, commit }) {
            if (firebase.auth().currentUser) {
                const userId = firebase.auth().currentUser.uid
                return new Promise((resolve, reject) => {
                    firebase.firestore().collection('user').doc(userId).onSnapshot((s) => {
                        if (s) {
                            return dispatch('user/fetchUser', { id: userId }, { root: true })
                                .then((user) => {
                                    commit('setAuthId', userId)
                                    resolve(user);
                                })
                        } else {
                            resolve(null)
                        }
                    })
                })
            }
        },

        signInWithEmailAndPassword({ dispatch }, { email, password }) {
            return firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() =>
                    dispatch('fetchAuthUser'))

        },

        signOut({ commit }) {
            return new Promise((resolve, reject) => {
                firebase.auth().signOut()
                    .then(() => {
                        commit('setAuthId', null)
                        resolve();
                    })
            })
        },
    },
    mutations: {
        setAuthId(state, id) {
            state.authId = id
        }
    }
}