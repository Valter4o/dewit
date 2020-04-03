import firebase from 'firebase/app'

const getDefaultState = () => {
    return {
        items: {},
    }
}

export default {
    namespaced: true,
    state: getDefaultState(),

    getters: {
        filteredTasks: (state, getters, rootState) => (status) => {
            return Object.values(rootState.tasks.items).filter((task) => task.status === status)
        },
    },

    actions: {
        fetchTask: ({ dispatch }, { id }) =>
            dispatch('fetchItem', {
                id, resource: 'tasks'
            }, { root: true }),
        fetchTasks: ({ dispatch }, { ids }) =>
            dispatch('fetchItems', {
                ids, resource: 'tasks'
            }, { root: true }),
        createTask(_, { task }) {
            return firebase.firestore()
                .collection('tasks')
                .add(task)
        },
        updateTask(_, { task, taskId }) {
            firebase.firestore()
                .collection('tasks')
                .doc(taskId)
                .update(task)
        },
        deleteTask({ commit }, { taskId }) {
            firebase.firestore()
                .collection('tasks')
                .doc(taskId)
                .delete()
        },
        resetState({ commit }) {
            commit('resetState')
        }
    },
    mutations: {
        resetState(state) {
            Object.assign(state, getDefaultState())
        }
    }
}
