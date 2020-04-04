<template>
  <v-app-bar app clipped-left color="red" dense>
    <v-app-bar-nav-icon @click.stop="showHideSidebar()" />
    <template>
      <v-btn @click="redirect('Home')" rounded fab small>
        <Home />
      </v-btn>
    </template>

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
import Home from 'vue-material-design-icons/Home'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Login,
    Register,
    Home,
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
    redirect(name) {
      if (this.$router.currentRoute.name !== name) {
        this.$router.push({
          name,
        })
      }
    },
    showHideSidebar() {
      this.$emit('changeSideBar')
    },
    logout() {
      this.signOut().then(() => {
        this.$router.push({ name: 'Home' })
      })
    },
    ...mapActions('auth', ['signOut']),
    ...mapGetters('auth', ['authUser']),
  },
}
</script>

<style module>
.homeBtn {
  margin-top: 10px;
}
</style>
