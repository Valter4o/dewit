<template>
  <div class="container">
    <h1 :class="$style.headerLarge">
      DEWIT
    </h1>
    <p :class="$style.textLarge">
      <!--  -->
      Welcome to the best project manager you have ever seen
    </p>

    <template v-if="loggedIn">
      <template v-if="asyncDataStatus_ready">
        <v-data-table
          :headers="headers"
          :items="projects"
          :hide-default-footer="true"
          @click:row="redirectProject"
        >
        </v-data-table>
      </template>
      <template v-else>
        <v-progress-linear
          indeterminate
          color="yellow darken-2"
        ></v-progress-linear>
      </template>
    </template>
    <template v-else>
      <h3>Loggin or Register to see your projects</h3>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapActions, mapGetters } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  name: 'Home',
  data() {
    return {
      headers: [
        {
          text: 'Project Name',
          value: 'name',
        },
        {
          text: 'Role',
          value: 'role',
        },
        {
          text: 'Participants',
          value: 'participants',
        },
        {
          text: 'Status',
          value: 'status',
        },
      ],
    }
  },

  mixins: [asyncDataStatus],

  computed: {
    userId() {
      if (this.loggedIn) {
        return this.authUser()._key
      }
    },
    projectIds() {
      if (this.loggedIn) {
        return this.authUser().projects.map((project) => project.id)
      }
    },
    projects() {
      const displayProjects = []
      const projects = Object.entries(this.$store.state.projects.items).forEach(
        ([id, { name, users }]) => {
          const { role, status } = users.find(
            (user) => user._key === this.userId
          )

          if (role && status) {
            const validObj = {
              name,
              participants: users.length,
              role,
              status,
              id,
            }
            displayProjects.push(validObj)
          }
        }
      )
      return displayProjects
    },
    loggedIn() {
      return this.authUser()
    },
  },

  methods: {
    redirectProject(project) {
      this.$router.push({
        name: 'Tasker',
        params: {
          id: project.id,
        },
      })
    },
    getProjects() {
      if (this.loggedIn) {
        const request = this.fetchProjects({ ids: this.projectIds })
        setTimeout(() => {
          request.then(() => {
            this.asyncDataStatus_fetched()
          })
        }, 1000)
      }
    },
    ...mapActions('projects', ['fetchProjects']),
    ...mapGetters('auth', ['authUser']),
  },

  created() {
    this.userId
    this.getProjects()
  },
  updated() {
    this.getProjects()
  },
}
</script>

<style module>
.headerLarge {
  font-size: 100px;
}

.textLarge {
  font-size: 50px;
}

.link {
  font-size: 40px;
  text-decoration-line: none;
  color: #42b883;
}
</style>
