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
  }),

  methods: {
    close() {
      this.dialog = false
    },
    create() {
      const users = []
      const user = {
        _key: this.authUser()._key,
        name: this.authUser().name,
        role: 'Creator',
      }
      users.push(user)

      const project = {
        name: this.name,
        description: this.description,
        users,
      }

      this.createProject({ project }).then(({ id }) => {
        const u = this.authUser()
        u.projects.push({
          id,
          role: 'Creator',
        })

        this.updateUser({ id: u._key, user: u })
        this.close()
      })
    },
    ...mapActions('projects', ['createProject']),
    ...mapActions('user', ['updateUser']),
    ...mapGetters('auth', ['authUser']),
  },
}
</script>
