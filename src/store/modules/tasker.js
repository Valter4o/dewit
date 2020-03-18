import firebase from 'firebase/app'

export default {
    namespaced: true,
    state: {
        items: {}
    },

    getters: {
        filteredTasks: (state, getters, rootState, rootGetters) => (status) => {
            return Object.values(rootState.tasker.items).filter((task) => task.status === status)
        },
    },

    actions: {
        fetchTasks: ({ commit, state }, { projectId }) => {
            return new Promise((resolve, reject) => {
                firebase.firestore()
                    .collection('tasker')
                    .doc(projectId)
                    .collection('tasks')
                    .onSnapshot((s) => {

                        s.docs.map(d => {
                            const id = d.id;
                            commit('setItem', { item: d.data(), id, resource: 'tasker' }, { root: true });
                            return d.data()
                        });
                        resolve(state.items);
                    })
            })
        },
        createTask(ctx, { projectId, task }) {
            return new Promise((resolve, reject) => {
                firebase.firestore()
                    .collection('tasker')
                    .doc(projectId)
                    .collection('tasks')
                    .add(task)
                    .then(() => {
                        resolve();
                    })
            })
        }
    }
}