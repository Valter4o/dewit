export default {
    namespaced: true,
    state: {
        items: {}
    },

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
            })
    }
}