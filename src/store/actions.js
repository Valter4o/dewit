import firebase from 'firebase'
import checkForLongerPath from './utils'

export default {
    fetchItem({ commit, state }, { id, resource }) {
        return new Promise((resolve, reject) => {
            firebase
                .firestore()
                .collection(resource)
                .doc(id)
                .onSnapshot((snap) => {
                    resource = checkForLongerPath(resource);
                    commit('setItem', { item: snap.data(), id, resource })
                    resolve(state[resource].items[id]);
                })
        })
    },

    fetchItems({ dispatch }, { ids, resource }) {
        return Promise.all(ids.map(id => dispatch('fetchItem', { id, resource })))
    }
}