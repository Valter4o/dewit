import firebase from 'firebase/app'

export default {
    namespaced: true,
    state: {
        authId: null,
        unsubscribeAuthObserver: null
    },

    getters: {
        authUser(state, getters, rootState) {
            return state.authId ? rootState.users.items[state.authId] : null
        }
    },

    actions: {

    },
    mutations: {
        setAuthId(state, id) {
            state.authId = id
        }
    }
}