import firebase from 'firebase';

export default {
    namespaced: true,
    state: {
        items: {}
    },

    actions: {
        fetchGroup: ({ dispatch }, { id }) =>
            dispatch('fetchItem', {
                id,
                resource: 'todoGroups'
            }, {
                root: true
            }),
        fetchGroups: ({ dispatch }, { ids }) =>
            dispatch('fetchItems', {
                ids,
                resource: 'todoGroups'
            }, {
                root: true
            }),

        updateTodos(_, { todos, groupId }) {
            return firebase.firestore()
                .collection('todoGroups')
                .doc(groupId)
                .update({ todos })
        },

        createTodoGroup() {
            return new Promise((resolve, reject) => {
                firebase.firestore()
                    .collection('todoGroups')
                    .add({
                        todos: []
                    })
                    .then((docRef) => {
                        resolve(docRef.id);
                    })
            })
        },
        deleteTodoGroup(_, { todoGroupId }) {
            return firebase.firestore()
                .collection('todoGroups')
                .doc(todoGroupId)
                .delete()
        }
    }
}