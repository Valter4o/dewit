<template>
  <v-card>
    <v-col>
      <v-app-bar :color="color">
        <template v-if="status === 'Inbox'">
          <v-btn fab small>
            <InboxArrowDownOutline />
          </v-btn>
        </template>
        <template v-else-if="status === 'To do'">
          <v-btn fab small>
            <Clippy />
          </v-btn>
        </template>
        <template v-else-if="status === 'In Progress'">
          <v-btn fab small>
            <ProgressWrench />
          </v-btn>
        </template>
        <template v-else-if="status === 'Done'">
          <v-btn fab>
            <Check />
          </v-btn>
        </template>
        <v-spacer
          ><h2>{{ status }}</h2>
        </v-spacer>
        <v-btn
          v-if="status === 'Inbox'"
          class="mx-2"
          fab
          small
          dark
          color="indigo"
          @click="changeDialog"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <CreateTask :dialog="createTaskDialog" :close="changeDialog" />
      </v-app-bar>
      <br />
      <template v-if="tasks">
        <template v-for="task in tasks">
          <ShortTask :key="task._key" :task="task" />
          <br />
        </template>
      </template>
      <template v-else>
        <NoProjects />
      </template>
    </v-col>
  </v-card>
</template>

<script>
import ShortTask from '@/components/ShortTask'
import NoProjects from '@/components/NoProjects'
import CreateTask from '@/components/CreateTask'
import InboxArrowDownOutline from 'vue-material-design-icons/InboxArrowDownOutline'
import Clippy from 'vue-material-design-icons/Clippy'
import ProgressWrench from 'vue-material-design-icons/ProgressWrench'
import Check from 'vue-material-design-icons/Check'
import { mapGetters } from 'vuex'

export default {
  components: {
    ShortTask,
    InboxArrowDownOutline,
    Clippy,
    CreateTask,
    ProgressWrench,
    Check,
    NoProjects,
  },

  props: {
    status: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      createTaskDialog: false,
    }
  },

  computed: {
    tasks() {
      const tasks = this.filteredTasks()(this.status)
      if (tasks.length > 0) {
        return tasks
      }
      return false
    },
  },

  methods: {
    changeDialog() {
      this.createTaskDialog = !this.createTaskDialog
    },
    ...mapGetters('tasker', ['filteredTasks']),
  },
}
</script>
