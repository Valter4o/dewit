import firebase from 'firebase/app'
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        items: {}
    },

    actions: {
        fetchProjects: ({ dispatch }, { ids }) =>
            dispatch('fetchItems', { ids, resource: 'projects' }, {
                root: true
            })
    }
}