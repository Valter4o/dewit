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

    <div class="text-center">
      <v-btn rounded color="primary" dark>
        Login
      </v-btn>
    </div>

    <div class="text-center">
      <v-btn rounded color="primary" dark>
        Register
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    showHideSidebar() {
      this.$emit('changeSideBar')
    },
  },
}
</script>
