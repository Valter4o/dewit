<template>
  <div>
    <h1>Your Todo Groups</h1>
    <br />
    <v-card class="mx-auto" max-width="700" v-if="asyncDataStatus_ready">
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-center">Name</th>
            <th class="text-center">Todos</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="group in groups"
            :key="group['_key']"
            @click="showTodoList(group['_key'])"
          >
            <td>{{ group.name }}</td>
            <td>{{ group.todos.length }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>

    <v-progress-circular
      v-else
      :width="5"
      size="70"
      color="green"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  mixins: [asyncDataStatus],

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    ids() {
      return this.$store.state.projects.items[this.id].todoGroups
    },

    groups() {
      const groups = Object.entries(this.$store.state.todoGroups.items).map(
        (group) => group[1]
      )
      return groups
    },
  },

  methods: {
    showTodoList(id) {
      this.$router.push({
        name: 'TodoList',
        params: {
          id,
        },
      })
    },
    ...mapActions('todoGroups', ['fetchGroups']),
    ...mapActions('projects', ['fetchProject']),
  },

  created() {
    const request = this.fetchProject({ id: this.id }).then(() => {
      this.fetchGroups({ ids: this.ids })
    })
    setTimeout(() => {
      request.then(() => {
        this.asyncDataStatus_fetched()
      })
    }, 1000)
  },
}
</script>
