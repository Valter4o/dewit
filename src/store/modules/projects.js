import firebase from 'firebase/app';

const getDefaultState = () => {
    return {
        items: {},
    }
}
export default {
    namespaced: true,
    state: getDefaultState(),
    actions: {
        fetchProjects: ({ dispatch }, { ids }) =>
            dispatch('fetchItems', {
                ids, resource: 'projects'
            }, {
                root: true
            }),
        fetchProject: ({ dispatch }, { id }) =>
            dispatch('fetchItem', {
                id, resource: 'projects'
            }, {
                root: true
            }),
        createProject(_, { project }) {
            return new Promise((resolve, reject) => {
                firebase.firestore()
                    .collection('projects')
                    .add(project)
                    .then((id) => {
                        resolve(id)
                    })
            })
        },
        updateProject(_, { project, projectId }) {
            return firebase.firestore()
                .collection('projects')
                .doc(projectId)
                .update(project)
        },
        deleteProject({ commit }, { id }) {
            return firebase.firestore()
                .collection('projects')
                .doc(id)
                .delete().then(() => {
                    commit('resetState')
                    return Promise.resolve()
                })
        }
    },
    mutations: {
        resetState(state) {
            Object.assign(state, getDefaultState())
            return Promise.resolve()
        }
    }
} 