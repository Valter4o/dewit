export default {
    namespaced: true,
    state: {
        items: {}
    },

    actions: {
        fetchGroups: ({ dispatch }, { ids }) =>
            dispatch('fetchItems', { ids, resource: 'todoGroups' }, {
                root: true
            })
    }
}