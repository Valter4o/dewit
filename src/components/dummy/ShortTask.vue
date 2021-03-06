<template>
  <div>
    <v-card
      class="mx-auto"
      min-width="100%"
      outlined
      elevation="5"
      @click="displayDialog"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <h3 :class="$style.headerTask">{{ task.title }}</h3>
          <br />
          <p>
            {{ task.description }}
          </p>
        </v-list-item-content>
      </v-list-item>

      <v-btn
        :class="$style.tag"
        small
        rounded
        v-for="tag in task.tags"
        :color="tag.color"
        :key="tag._key"
        >{{ tag.value }}</v-btn
      >
      <v-footer>
        <template v-if="commentsIcon > 0">
          <CommentTextMultiple />
          <span :class="$style.bottomIcons">{{ commentsIcon }}</span>
        </template>

        <template v-if="todos">
          <template v-if="todos.total > 0">
            <DnsOutline />
            <span :class="$style.bottomIcons">
              {{ todos.marked }}/{{ todos.total }}
            </span>
          </template>
        </template>
        <template v-if="task.dueDate">
          <ClockAlert />
        </template>
        <v-spacer />
        <v-btn
          rounded
          color="red"
          @click="moveLeft"
          v-if="previousStatus[task.status]"
        >
          <ArrowLeftBoldOutline />
        </v-btn>
        <v-btn
          rounded
          color="red"
          @click="moveRight"
          v-if="nextStatus[task.status]"
        >
          <ArrowRightBoldOutline />
        </v-btn>
      </v-footer>
    </v-card>
    <LongDialog :dialogProp="dialog" @close="close" :task="task" />
  </div>
</template>

<script>
import CommentTextMultiple from 'vue-material-design-icons/CommentTextMultiple'
import DnsOutline from 'vue-material-design-icons/DnsOutline'
import ArrowRightBoldOutline from 'vue-material-design-icons/ArrowRightBoldOutline'
import ArrowLeftBoldOutline from 'vue-material-design-icons/ArrowLeftBoldOutline'
import ClockAlert from 'vue-material-design-icons/ClockAlert'
import LongDialog from '@/pages/LongTaskDialog'
import { mapActions } from 'vuex'

export default {
  components: {
    CommentTextMultiple,
    DnsOutline,
    LongDialog,
    ArrowRightBoldOutline,
    ArrowLeftBoldOutline,
    ClockAlert,
  },

  data() {
    return {
      dialog: false,
      nextStatus: {
        Inbox: 'To do',
        'To do': 'In Progress',
        'In Progress': 'Done',
        Done: '',
      },
      previousStatus: {
        Inbox: '',
        'To do': 'Inbox',
        'In Progress': 'To do',
        Done: 'In Progress',
      },
    }
  },

  props: {
    task: {
      type: Object,
      required: true,
    },
  },

  computed: {
    commentsIcon() {
      return this.task.comments.length
    },
    todos() {
      const t = this.$store.state.todoGroups.items[this.task.todoGroup]
      if (t) {
        const todos = t.todos
        const total = todos.length
        const markedTodos = todos.filter((todo) => todo.marked === true)
        const marked = markedTodos ? markedTodos.length : 0

        return {
          marked,
          total,
        }
      }
    },
  },

  methods: {
    moveLeft(e) {
      e.cancelBubble = true
      const prev = this.previousStatus[this.task.status]
      if (prev) {
        this.task.status = prev
        this.update()
      }
    },
    moveRight(e) {
      e.cancelBubble = true
      const next = this.nextStatus[this.task.status]
      if (next) {
        this.task.status = next
        this.update()
      }
    },
    update() {
      const projectId = this.$router.currentRoute.params.id

      this.updateTask({ task: this.task, taskId: this.task._key })
    },
    displayDialog() {
      this.dialog = true
    },
    close() {
      this.dialog = !this.dialog
    },
    ...mapActions('tasks', ['updateTask']),
    ...mapActions('todoGroups', ['fetchGroup']),
  },

  created() {
    this.fetchGroup({ id: this.task.todoGroup })
  },
}
</script>

<style module>
.headerTask,
.bottomIcons {
  margin-left: 10px;
  margin-right: 10px;
}
.tag {
  margin: 5px;
}
</style>
