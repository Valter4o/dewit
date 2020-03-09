import firebase from 'firebase'

export default {
    foo({ commit }, x) {
        firebase
            .firestore()
            .collection('projects')
    }
}