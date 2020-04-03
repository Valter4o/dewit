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
        tasks: (s, gs, rootState) => (projectId) => {
            return rootState.tasker.items[projectId].tasks
        },
        todoGroups: (s, gs, rootState) => (projectId) => {
            return rootState.tasker.items[projectId].todoGroups
        }
    },

    actions: {
        fetchTasksRef: ({ dispatch }, { projectId }) =>
            dispatch('fetchItem', {
                id: projectId, resource: 'tasker'
            }, { root: true }),
        createTasker(_, { id }) {
            return firebase.firestore()
                .collection('tasker')
                .doc(id)
                .set({
                    todoGroups: [],
                    tasks: []
                })
        },
        updateTodoGroupsArray(_, { todoGroups, projectId }) {
            return firebase.firestore()
                .collection('tasker')
                .doc(projectId)
                .update({ todoGroups })
        },
        updateTasksArray(_, { tasks, projectId }) {
            return firebase.firestore()
                .collection('tasker')
                .doc(projectId)
                .update({ tasks })
        },
        deleteTasker(_, { projectId }) {
            return firebase.firestore()
                .collection('tasker')
                .doc(projectId)
                .delete()
        }
    },

    mutations: {
        resetState(state) {
            Object.assign(state, getDefaultState())
        }
    }
}
