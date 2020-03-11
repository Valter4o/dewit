<template>
  <div v-if="asyncDataStatus_ready">
    <h1>Users in {{ projectName }}</h1>
    <br />
    <v-card class="mx-auto" max-width="700">
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

<script>
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

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
  },

  created() {
    this.fetchProject({ id: this.id }).then(() => {
      this.asyncDataStatus_fetched()
    })
  },
}
</script>
