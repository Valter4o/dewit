import firebase from 'firebase/app'
import { TestScheduler } from 'jest'

export default {
    namespaced: true,
    state: {
        items: {}
    },

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
                firebase.firestore()
                    .collection('tasker')
                    .doc(projectId)
                    .update(todoGroups).then(() => {

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
        deleteTask(_, { taskId, projectId }) {
            firebase.firestore()
                .collection('tasker')
                .doc(projectId)
                .collection('tasks')
                .doc(taskId)
                .delete()

        },
        createTasker(_, { id, firstTask }) {
            return firebase.firestore()
                .collection('tasker')
                .doc(id)
                .collection('tasks')
                .add(firstTask)
        },
        delTasker(_, { id }) {
            return firebase.firestore()
                .collection('tasker')
                .doc(id)
                .delete()
        }

    }
}
