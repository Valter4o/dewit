import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    getUserData(accesor) {
      if (this.loggedInId) {
        if (this.authUser()) {
          return accesor(this.authUser())
        } else {
          return this.fetchUser({ id: this.loggedInId() }).then((user) =>
            accesor(user)
          )
        }
      }
    },
    ...mapActions('user', ['fetchUser']),
    ...mapGetters('auth', ['loggedInId', 'authUser']),
  },
}
