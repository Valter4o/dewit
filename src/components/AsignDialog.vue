<template>
  <v-dialog v-model="dialog" width="300">
    <v-card v-if="asyncDataStatus_ready">
      <v-col>
        <h1>Users in {{ projectName }}</h1>
        <br />
        <v-card class="mx-auto">
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">Name</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in userList"
                :key="user._key"
                @click="asign(user)"
              >
                <td class="text-left">{{ user.name }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  mixins: [asyncDataStatus],

  props: {
    dialogProp: {
      type: Boolean,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    asign(user) {
      const projectId = this.$router.currentRoute.params.id

      this.updateTask({ task: this.task, projectId })
      this.$emit('close')
    },
    ...mapActions('projects', ['fetchProject']),
    ...mapActions('tasker', ['updateTask']),
  },

  computed: {
    dialog() {
      return this.dialogProp
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
    this.fetchProject({ id: this.id }).then(() => {
      this.asyncDataStatus_fetched()
    })
  },
}
</script>
