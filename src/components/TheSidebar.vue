<template>
  <div>
    <v-navigation-drawer app clipped width="300">
      <template v-if="isLoggedIn">
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
          <v-col>
            <JoinProject />
            <h2>Or</h2>
            <CreateProject />
          </v-col>
        </template>
      </template>
      <template v-else>
        <h2>Log in in order to be able to create or join projects</h2>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import CreateProject from '@/components/CreateProjectDialog'
import JoinProject from '@/components/JoinProjectDialog'

export default {
  mixins: [asyncDataStatus],
  components: {
    CreateProject,
    JoinProject,
  },
  methods: {
    ...mapGetters('auth', ['authUser']),
    ...mapActions('projects', ['fetchProject']),
  },

  computed: {
    isLoggedIn() {
      return this.authUser()
    },
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
