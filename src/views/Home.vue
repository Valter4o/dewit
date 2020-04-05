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
      <template v-if="loggedIn">
        <v-parallax :src="img" height="600">
          <div class="container">
            <h1 :class="$style.headerLarge">
              Your Projects
            </h1>
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
          </div>
        </v-parallax>
      </template>
      <template v-else>
        <NotLoggedIn />
      </template>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import NotLoggedIn from '@/components/NotLoggedIn'
import { IntersectingCirclesSpinner } from 'epic-spinners'

export default {
  components: {
    NotLoggedIn,
    IntersectingCirclesSpinner,
  },
  data() {
    return {
      load: false,
      img:
        'https://www.cv-library.co.uk/career-advice/wp-content/uploads/2018/06/What-is-it-like-working-in-IT.jpg',
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
          const { role } = users.find((user) => user._key === this.userId)
            ? users.find((user) => user._key === this.userId)
            : ''

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
    this.load = true
    this.loggedIn
    setTimeout(() => {
      this.getProjects()
      this.load = false
    }, 2000)
  },
  updated() {
    this.getProjects()
  },
}
</script>

<style module>
.loader {
  margin-top: 100px;
  margin-left: 650px;
}
.headerLarge {
  color: green;
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
