<template>
  <v-app-bar app clipped-left color="blue" dense>
    <v-app-bar-nav-icon @click.stop="showHideSidebar()" />
    <template>
      <v-btn @click="redirect('Home')" rounded fab small>
        <Home />
      </v-btn>
    </template>

    <v-spacer />

    <template v-if="!load">
      <template v-if="!loggedIn">
        <div class="text-center">
          <Login />
        </div>

        <div class="text-center">
          <Register />
        </div>
      </template>
      <div class="text-center" v-else>
        <span
          >Welcome
          <v-btn color="blue">{{ username }}</v-btn>
        </span>
        <v-btn rounded color="primary" dark @click="logout">Logout</v-btn>
      </div>
    </template>
    <template v-else>
      <hollow-dots-spinner
        :animation-duration="1000"
        :dot-size="15"
        :dots-num="3"
        color="#ff1d5e"
      />
    </template>
  </v-app-bar>
</template>

<script>
import Login from '@/components/LoginDialog'
import Register from '@/components/RegisterDialog'
import Home from 'vue-material-design-icons/Home'
import { mapActions, mapGetters } from 'vuex'
import { HollowDotsSpinner } from 'epic-spinners'

export default {
  components: {
    Login,
    Register,
    Home,
    HollowDotsSpinner,
  },
  data() {
    return {
      load: true,
    }
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

  created() {
    setTimeout(() => {
      this.load = false
    }, 1000)
  },
}
</script>

<style module>
.homeBtn {
  margin-top: 10px;
}
</style>
