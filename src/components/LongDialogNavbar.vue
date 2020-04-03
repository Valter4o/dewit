<template>
  <v-app-bar>
    <v-avatar>
      <img src="../assets/images/defaultUser/yoda.png" alt="Y" />
    </v-avatar>

    <h4 :class="$style.userHeading" v-if="!assignedUser">
      Unnasiggned
    </h4>
    <h4 :class="$style.userHeading" v-else>
      {{ assignedUser }}
    </h4>
    <v-spacer />

    <v-menu transition="slide-y-transition" bottom>
      <template v-slot:activator="{ on }">
        <v-btn class="purple" color="primary" rounded dark v-on="on">
          <ViewComfy />
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <AsignDialog :task="task" />

          <v-list-item-title :class="$style.menuTitle"
            >Asign to</v-list-item-title
          >
        </v-list-item>

        <v-list-item @click="deleteT">
          <v-btn fab small color="red">
            <DeleteForever />
          </v-btn>

          <v-list-item-title :class="$style.menuTitle">
            Delete Task
          </v-list-item-title>
        </v-list-item>

        <v-list-item @click="complete">
          <v-btn fab small color="green">
            <ShieldCheck />
          </v-btn>

          <v-list-item-title :class="$style.menuTitle"
            >Complete</v-list-item-title
          >
        </v-list-item>

        <v-list-item @click="changeEditable">
          <v-btn fab small color="blue">
            <SquareEditOutline />
          </v-btn>

          <v-list-item-title :class="$style.menuTitle">Edit</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn @click="close" rounded>
      X
    </v-btn>
  </v-app-bar>
</template>

<script>
import AsignDialog from '@/components/AsignDialog'
import ViewComfy from 'vue-material-design-icons/ViewComfy'
import DeleteForever from 'vue-material-design-icons/DeleteForever'
import ShieldCheck from 'vue-material-design-icons/ShieldCheck'
import SquareEditOutline from 'vue-material-design-icons/SquareEditOutline'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    AsignDialog,
    ViewComfy,
    DeleteForever,
    ShieldCheck,
    SquareEditOutline,
  },
  data() {
    return {
      assignDialog: false,
    }
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    assignedUser() {
      return this.task.assignedUser ? this.task.assignedUser.name : false
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
    changeEditable() {
      this.$emit('edit')
    },

    deleteT() {
      const projectId = this.$router.currentRoute.params.id
      const taskId = this.task._key
      const todoGroupId = this.task.todoGroup

      this.deleteTodoGroup({ todoGroupId }).then(() => {
        const todoGroups = this.todoGroups()(projectId).filter(
          (id) => id !== todoGroupId
        )
        const tasks = this.tasks()(projectId).filter(
          (id) => id !== taskId
          //
        )
        this.deleteTask({ taskId: this.task._key, taskId }).then(() => {
          this.updateTodoGroupsArray({ todoGroups, projectId }).then(() => {
            this.updateTasksArray({ tasks, projectId }).then(() => {
              this.resetState().then(() => {
                this.fetchTasksRef({ projectId }).then((data) => {
                  const ids = data.tasks
                  this.fetchTasks({ ids }).then(() => {
                    this.close()
                  })
                })
              })
            })
          })
        })
      })
    },
    complete() {
      const taskId = this.task._key
      this.task.status = 'Done'
      this.updateTask({ task: this.task, taskId })
    },
    ...mapActions('tasker', [
      'updateTodoGroupsArray',
      'updateTasksArray',
      'fetchTasksRef',
    ]),
    ...mapGetters('tasker', ['todoGroups', 'tasks']),

    ...mapActions('tasks', [
      'updateTask',
      'deleteTask',
      'fetchTasks',
      'resetState',
    ]),
    ...mapActions('todoGroups', ['deleteTodoGroup']),
    ...mapGetters('auth', ['authUser']),
  },
}
</script>

<style module>
.leftCol,
.userHeading,
.menuTitle {
  margin-left: 20px;
}
</style>
