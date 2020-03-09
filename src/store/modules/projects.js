import firebase from 'firebase/app'
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        items: {}
    },

    actions: {
        fetchProjects({ state, commit }) {
            return new Promise((resolve, reject) => {
                firebase
                    .firestore()
                    .collection('projects')
                    .get()
                    .then((queryS) => {
                        queryS.forEach((doc) => {
                            const { name, users } = doc.data()
                            const user = users.find((u) => u.name === 'Pesho');


                            const obj = ({
                                name,
                                role: user.role,
                                participants: users.length,
                                status: user.status,
                            })

                            commit('setProject', { obj, id: doc.id })
                        })
                        resolve(state.items);
                    })

            })
        }
    },

    mutations: {
        setProject(state, { obj, id }) {
            obj['_key'] = id;
            Vue.set(state.items, id, obj);
        }
    }
}