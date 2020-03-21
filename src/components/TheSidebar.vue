<template>
  <div>
    <v-navigation-drawer app clipped width="300">
      <template v-if="id">
        <br />

        <router-link :to="{ name: 'ProjectHome' }">
          <v-btn rounded color="green">
            Go to project details
          </v-btn>
        </router-link>
        <div v-if="asyncDataStatus_ready">
          <br />
          <h1>Users in {{ projectName }}</h1>
          <br />
          <v-card class="mx-auto">
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in userList" :key="user._key">
                  <td class="text-left">{{ user.name }}</td>
                  <td class="text-left">{{ user.role }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>
        </div>
      </template>
      <template v-else>
        <h3>
          Select a project so you can see the users here
        </h3>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  mixins: [asyncDataStatus],

  methods: {
    ...mapActions('projects', ['fetchProject']),
  },

  computed: {
    userList() {
      return this.$store.state.projects.items[this.id].users
    },
    projectName() {
      return this.$store.state.projects.items[this.id].name
    },
    id() {
      return this.$router.currentRoute.params.id
    },
  },

  created() {
    if (this.id) {
      const request = this.fetchProject({ id: this.id })
      setTimeout(() => {
        request.then(() => {
          this.asyncDataStatus_fetched()
        }, 1000)
      })
    }
  },
}
</script>
