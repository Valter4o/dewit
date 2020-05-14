<template>
  <v-app id="inspire">
    <Sidebar v-if="sidebar" />

    <Navbar @changeSideBar="sidebar = !sidebar" />

    <v-content align="center" justify="center">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Sidebar from './components/common/TheSidebar'
import Navbar from './components/common/TheNavbar'

export default {
  components: {
    Sidebar,
    Navbar,
  },

  data() {
    return {
      sidebar: false,
    }
  },

  created() {
    this.$vuetify.theme.dark = true
  },
}
</script>
