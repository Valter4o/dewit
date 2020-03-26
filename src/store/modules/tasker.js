import firebase from 'firebase/app'

function updateTodoGroups(todoGroups, projectId) {
    return firebase.firestore()
        .collection('tasker')
        .doc(projectId)
        .update({ todoGroups })
}

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
        fetchTodoGroups: ({ dispatch }, { projectId }) =>
            dispatch('fetchItem', {
                id: projectId, resource: 'tasker'
            }, { root: true })
        ,
        createTask(ctx, { projectId, task, todoGroups }) {
            return new Promise((resolve, reject) => {
                updateTodoGroups(todoGroups, projectId).then(() => {
                    firebase.firestore()
                        .collection('tasker')
                        .doc(projectId)
                        .collection('tasks')
                        .add(task)
                        .then(() => {
                            resolve();
                        })
                })
            })
        },
        updateTask(_, { task, projectId }) {
            firebase.firestore()
                .collection('tasker')
                .doc(projectId)
                .collection('tasks')
                .doc(task['_key'])
                .update(task)
        },
        deleteTask({ commit }, { taskId, projectId }) {
            firebase.firestore()
                .collection('tasker')
                .doc(projectId)
                .collection('tasks')
                .doc(taskId)
                .delete()
                .then(() => {
                    commit('resetState')
                })

        },
        createTasker(_, { id, firstTask }) {
            firebase.firestore()
                .collection('tasker')
                .doc(id)
                .set({
                    todoGroups: []
                })
            return firebase.firestore()
                .collection('tasker')
                .doc(id)
                .collection('tasks')
                .add(firstTask)
        },
        delTasker(_, { projectId }) {
            return firebase.firestore()
                .collection('tasker')
                .doc(projectId)
                .delete()
        },
        updateTodoGroupsArray(_, { todoGroups, projectId }) {
            return updateTodoGroups(todoGroups, projectId)
        }
    },

    mutations: {
        resetState(state) {
            Object.assign(state, getDefaultState())
        }
    }
}
