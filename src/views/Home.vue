<template>
  <div class="container" v-if="asyncDataStatus_ready">
    <h1 :class="$style.headerLarge">
      DEWIT
    </h1>
    <p :class="$style.textLarge">
      <!--  -->
      Welcome to the best todo list you have ever seen
    </p>

    <v-data-table
      :headers="headers"
      :items="projects"
      :hide-default-footer="true"
      @click:row="foo"
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
    }
  },

  mixins: [asyncDataStatus],

  computed: {
    projects() {
      return Object.entries(this.$store.state.projects.items).map((el) => el[1])
    },
  },

  methods: {
    foo(d) {
      console.log(d)
    },
    ...mapActions('projects', ['fetchProjects']),
  },

  created() {
    this.fetchProjects().then(() => {
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
