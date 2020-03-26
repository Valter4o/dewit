import firebase from 'firebase/app'

export default {
    namespaced: true,
    state: {
        items: {}
    },
    actions: {
        fetchTags: ({ dispatch }, { projectId }) =>
            dispatch('fetchItem', {
                id: projectId, resource: 'tags'
            }, { root: true })
        ,

        updateTags(_, { tags, id }) {
            firebase.firestore()
                .collection('tags')
                .doc(id)
                .update({ tags })
        }
    }
} 