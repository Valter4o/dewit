<template>
  <v-dialog v-model="dialog" width="300">
    <template v-slot:activator="{ on }">
      <v-btn fab small color="orange" v-on="on">
        <AccountArrowRight />
      </v-btn>
    </template>
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
import AccountArrowRight from 'vue-material-design-icons/AccountArrowRight'

export default {
  mixins: [asyncDataStatus],
  components: {
    AccountArrowRight,
  },
  data: () => ({
    dialog: false,
  }),
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    asign(user) {
      const projectId = this.$router.currentRoute.params.id

      const task = this.task
      task.assignedUser = user
      this.updateTask({ task, projectId })
      this.dialog = false
    },
    ...mapActions('projects', ['fetchProject']),
    ...mapActions('tasker', ['updateTask']),
  },

  computed: {
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
