<template>
  <v-card width="25%">
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
          <v-btn fab small>
            <Check />
          </v-btn>
        </template>
        <v-spacer
          ><h2>{{ status }}</h2>
        </v-spacer>

        <CreateTask v-if="status === 'Inbox'" />
      </v-app-bar>
      <br />
      <template v-if="tasks">
        <template v-for="task in tasks">
          <ShortTask :key="task._key" :task="task" />
          <br />
        </template>
      </template>
      <template v-else>
        <NoTasks />
      </template>
    </v-col>
  </v-card>
</template>

<script>
import ShortTask from '@/components/dummy/ShortTask'
import NoTasks from '@/components/dummy/NoTasks'
import CreateTask from '@/components/creational/TaskCreateDialog'

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
    NoTasks,
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
    ...mapGetters('tasks', ['filteredTasks']),
  },
}
</script>
