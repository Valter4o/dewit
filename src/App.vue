<template>
  <v-app id="inspire">
    <Sidebar v-if="sidebar" />

    <Navbar @changeSideBar="sidebar = !sidebar" />

    <v-content>
      <router-view />
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default {
  components: {
    Sidebar,
    Navbar,
    Footer
  },

  data() {
    return {
      sidebar: false,
    }
  },

  created() {
    this.$vuetify.theme.dark = true
  },

};
</script>

<style>
v-content {
  margin-left: 500px;
}

.title {
  word-break: break-all;
}
</style>
