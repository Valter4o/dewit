<template>
  <v-app-bar app clipped-left color="red" dense>
    <v-app-bar-nav-icon @click.stop="showHideSidebar()" />
    <v-toolbar-title class="mr-12 align-center">
      <router-link to="/home" class="title">
        <span>
          DEWIT
        </span>
      </router-link>
    </v-toolbar-title>

    <v-spacer />

    <div class="text-center" v-if="!loggedIn">
      <Login />
    </div>

    <div class="text-center" v-if="!loggedIn">
      <Register />
    </div>

    <div class="text-center" v-else>
      <span
        >Welcome
        <v-btn color="blue">{{ username }}</v-btn>
      </span>
      <v-btn rounded color="primary" dark @click="logout">Logout</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import Login from '@/components/LoginDialog'
import Register from '@/components/RegisterDialog'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Login,
    Register,
  },
  computed: {
    loggedIn() {
      return this.authUser()
    },
    username() {
      return this.authUser().username
    },
  },
  methods: {
    showHideSidebar() {
      this.$emit('changeSideBar')
    },
    logout() {
      this.signOut()
    },
    ...mapActions('auth', ['signOut']),
    ...mapGetters('auth', ['authUser']),
  },
}
</script>
