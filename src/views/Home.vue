<template>
  <div class="container" v-if="asyncDataStatus_ready">
    <h1 :class="$style.headerLarge">
      DEWIT
    </h1>
    <p :class="$style.textLarge">
      <!--  -->
      Welcome to the best project manager you have ever seen
    </p>

    <v-data-table
      :headers="headers"
      :items="projects"
      :hide-default-footer="true"
      @click:row="redirectProject"
    >
    </v-data-table>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'
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

      projectsIds: ['I0vvw9J5qf2iE6TLm4tE'],
      key: 'z2LIjPKBL1iDKMal7g1c',
    }
  },

  mixins: [asyncDataStatus],

  computed: {
    projects() {
      const displayProjects = []
      const projects = Object.entries(this.$store.state.projects.items).forEach(
        ([id, { name, users }]) => {
          const { role, status } = users.find(
            (user) => user._key === this.key
            //Todo: Replace with authenticated user id
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
  },

  methods: {
    redirectProject(project) {
      this.$router.push({
        name: 'ProjectHome',
        params: {
          id: project.id,
        },
      })
    },
    ...mapActions('projects', ['fetchProjects']),
  },

  created() {
    this.fetchProjects({ ids: this.projectsIds }).then(() => {
      this.asyncDataStatus_fetched()
    })
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
