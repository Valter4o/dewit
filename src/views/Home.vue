<template>
  <div :class="$style.main">
    <template v-if="load">
      <intersecting-circles-spinner
        :class="$style.loader"
        :animation-duration="1200"
        :size="200"
        color="#ff1d5e"
      />
    </template>
    <template v-else>
      <template v-if="loggedIn">
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
        <NotLoggedIn />
        <Footer />
      </template>
    </template>
  </div>
</template>

<script>
import NotLoggedIn from '@/components/NotLoggedIn'
import Footer from '@/components/TheFooter'

import { IntersectingCirclesSpinner } from 'epic-spinners'

import asyncDataStatus from '@/mixins/asyncDataStatus'
import userData from '@/mixins/userData'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    NotLoggedIn,
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
      if (this.loggedIn) {
        this.fetchProjects({ ids: await this.projectIds }).then((res) => {
          this.asyncDataStatus_fetched()
        })
      }
    },
    ...mapActions('projects', ['fetchProjects']),
    ...mapGetters('auth', ['loggedIn']),
  },

  created() {
    this.load = true
    this.getProjects()
    setTimeout(() => {
      this.load = false
    }, 1000)
  },
}
</script>

<style module>
.loader {
  margin-top: 100px;
  margin-left: 650px;
}
.headerLarge {
  color: goldenrod;
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
