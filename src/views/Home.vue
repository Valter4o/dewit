<template>
  <div>
    <template v-if="load">
      <intersecting-circles-spinner
        :class="$style.loader"
        :animation-duration="1200"
        :size="200"
        color="#ff1d5e"
      />
    </template>
    <template v-else>
      <template v-if="loggedInId()">
        <div class="container">
          <h1 :class="$style.headerLarge">Your Projects</h1>
          <template v-if="asyncDataStatus_ready">
            <v-data-table
              dark
              :headers="headers"
              :items="projects"
              :hide-default-footer="true"
              @click:row="redirectProject"
            ></v-data-table>
          </template>
          <template v-else>
            <v-progress-linear
              indeterminate
              color="yellow darken-2"
            ></v-progress-linear>
          </template>
        </div>
      </template>
      <template v-else>
        <NotLoggedInId />
        <Footer />
      </template>
    </template>
  </div>
</template>

<script>
import NotLoggedInId from '@/components/dummy/NotLoggedIn'
import Footer from '@/components/common/TheFooter'

import { IntersectingCirclesSpinner } from 'epic-spinners'

import asyncDataStatus from '@/mixins/asyncDataStatus'
import userData from '@/mixins/userData'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    NotLoggedInId,
    IntersectingCirclesSpinner,
    Footer,
  },
  data() {
    return {
      load: false,
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
      ],
    }
  },

  mixins: [asyncDataStatus, userData],

  computed: {
    projectIds() {
      const accesor = (user) => user.projects.map((project) => project.id)
      return this.getUserData(accesor)
    },
    projects() {
      const displayProjects = []
      const projects = Object.entries(this.$store.state.projects.items).forEach(
        ([id, { name, users }]) => {
          const { role } =
            users.find((user) => user._key === this.loggedInId()) ?? {}

          if (role) {
            const validObj = {
              name,
              participants: users.length,
              role,
              id,
            }
            displayProjects.push(validObj)
          }
        }
      )
      return displayProjects
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
    async getProjects() {
      if (this.loggedInId) {
        this.fetchProjects({ ids: await this.projectIds }).then((res) => {
          this.load = false
          this.asyncDataStatus_fetched()
        })
      }
    },
    ...mapActions('projects', ['fetchProjects']),
    ...mapGetters('auth', ['loggedInId']),
  },

  created() {
    if (this.loggedInId()) {
      this.load = true
      this.getProjects()
    }
  },
}
</script>

<style module>
.loader {
  margin-top: 15%;
  margin-left: 45%;
}
.headerLarge {
  color: goldenrod;
  font-size: 100px;
}
</style>
