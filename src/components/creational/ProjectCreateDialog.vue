<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="red" rounded dark v-on="on">Create Project</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Project Info</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Name" v-model="name" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Description"
                v-model="description"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Close</v-btn>
        <v-btn color="blue darken-1" text @click="create">Create</v-btn>
      </v-card-actions>
      <v-progress-linear
        indeterminate
        height="7"
        color="yellow darken-2"
        v-if="creating"
      ></v-progress-linear>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    dialog: false,
    name: '',
    description: '',
    creating: false,
  }),

  methods: {
    close() {
      this.dialog = false
    },
    create() {
      this.creating = true
      const users = []

      const user = {
        _key: this.authUser()._key,
        name: this.authUser().username,
        role: 'Creator',
      }

      users.push(user)

      const project = {
        name: this.name,
        description: this.description ? this.description : '',
        users,
      }

      this.createProject({ project }).then(({ id }) => {
        const u = this.authUser()
        u.projects.push({
          id,
          role: 'Creator',
        })

        this.createTodoGroup().then((todoGroupId) => {
          this.createTasker({ id }).then(() => {
            this.updateUser({ id: u._key, user: u }).then(() => {
              this.createProjectTags({ id }).then(() => {
                this.creating = false
                this.close()
                this.$router.push({
                  name: 'Tasker',
                  params: {
                    id,
                  },
                })
              })
            })
          })
        })
      })
    },
    ...mapActions('todoGroups', ['createTodoGroup']),
    ...mapActions('projects', ['createProject']),
    ...mapActions('tasker', ['createTasker']),
    ...mapActions('tags', ['createProjectTags']),
    ...mapActions('user', ['updateUser']),
    ...mapGetters('auth', ['authUser']),
  },
}
</script>
