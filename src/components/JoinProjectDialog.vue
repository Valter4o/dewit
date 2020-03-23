<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="red" rounded dark v-on="on">Join Project</v-btn>
    </template>
    <v-card>
      <v-card-title>
        Enter the project ID in order to join
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field label="ID" v-model="id" required></v-text-field>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Close</v-btn>
        <v-btn color="blue darken-1" text @click="join">Join</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    dialog: false,
    id: '',
  }),

  methods: {
    close() {
      this.dialog = false
    },
    join() {
      this.fetchProject({ id: this.id }).then(() => {
        const project = this.$store.state.projects.items[this.id]

        if (project) {
          const user = {
            _key: this.authUser()._key,
            name: this.authUser().username,
            role: 'Pion',
          }
          project.users.push(user)
          this.updateProject({ project, projectId: this.id }).then(() => {
            const u = this.authUser()
            u.projects.push({
              id: this.id,
              role: 'Pion',
            })

            this.updateUser({ id: u._key, user: u })
            this.close()
          })
        } else {
          alert('Invalid id')
        }
      })
    },
    ...mapActions('projects', ['fetchProject', 'updateProject']),
    ...mapActions('user', ['updateUser']),
    ...mapGetters('auth', ['authUser']),
  },
}
</script>
