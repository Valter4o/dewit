<template>
  <v-dialog max-width="600" persistent v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn class="mx-2" fab small dark color="indigo" v-on="on">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card class="mx-auto" max-width="100%">
      <v-btn fab small :class="$style.closeBtn" @click="dialog = false">
        x
      </v-btn>
      <h3 :class="$style.title">
        Create Task
      </h3>
      <v-spacer />
      <v-text-field
        label="Title"
        v-model="title"
        :class="$style.textField"
      ></v-text-field>

      <v-text-field
        label="Description"
        v-model="description"
        :class="$style.textField"
      ></v-text-field>
      <v-spacer />
      <v-btn :class="$style.submitBtn" rounded color="orange" @click="submit"
        >Submit</v-btn
      >
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      title: '',
      description: '',
      dialog: false,
    }
  },
  methods: {
    submit() {
      const projectId = this.$router.currentRoute.params.id

      const todoGroups = this.todoGroups()(projectId)
      const tasks = this.tasks()(projectId)

      this.createTodoGroup().then((id) => {
        const task = {
          title: this.title,
          description: this.description,
          status: 'Inbox',
          todoGroup: id,
          createdAt: Date.now(),
          comments: [],
          tags: [],
        }
        todoGroups.push(id)

        this.createTask({ task }).then((res) => {
          tasks.push(res.id)
          this.updateTasksArray({ tasks, projectId }).then(() => {
            this.updateTodoGroupsArray({ todoGroups, projectId }).then(() => {
              this.fetchTasksRef({ projectId }).then((data) => {
                const ids = data.tasks
                this.fetchTasks({ ids }).then(() => {
                  this.title = ''
                  this.description = ''

                  this.dialog = false
                })
              })
            })
          })
        })
      })
    },
    ...mapActions('tasker', [
      'updateTasksArray',
      'updateTodoGroupsArray',
      'fetchTasksRef',
    ]),
    ...mapGetters('tasker', ['todoGroups', 'tasks']),

    ...mapActions('tasks', ['createTask', 'updateTask', 'fetchTasks']),
    ...mapActions('todoGroups', ['createTodoGroup']),
  },
}
</script>

<style module>
.closeBtn {
  margin-left: 80%;
  margin-top: 10px;
}
.submitBtn {
  margin-left: 80%;
  margin-bottom: 20px;
}
.title {
  margin-left: 50px;
}
.textField {
  margin-left: 20px;
}
</style>
