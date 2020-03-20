<template>
  <v-dialog
    v-model="mainDialog"
    persistent
    max-width="500px"
    overlay-opacity="0"
  >
    <v-card>
      <template v-if="asyncDataStatus_ready">
        <v-btn btn color="green" @click="close">
          Close
        </v-btn>
        <v-simple-table>
          <v-col
            v-for="todo in todos"
            :class="
              todo.marked ? $style.tableRowChecked : $style.tableRowNotChecked
            "
            :key="todos.indexOf(todo)"
          >
            <td>
              <v-btn
                class="mx-2"
                fab
                small
                color="primary"
                @click="checkTodo(todo)"
              >
                <template v-if="todo.marked">
                  <Check />
                </template>
              </v-btn>
              <v-btn
                v-if="todo.marked"
                class="mx-2"
                fab
                small
                color="primary"
                @click="deleteTodo(todo)"
              >
                <DeathStar />
              </v-btn>
              <span>{{ todo.value }}</span>
            </td>
          </v-col>
        </v-simple-table>

        <AddTodoDialog v-if="dialog" :groupId="id" />
        <v-btn
          dark
          fab
          color="red"
          @click="dialog = !dialog"
          :class="$style.addBtn"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-progress-circular
        :class="$style.spinner"
        v-else
        :width="5"
        size="70"
        color="green"
        indeterminate
      ></v-progress-circular>
    </v-card>
  </v-dialog>
</template>

<script>
import AddTodoDialog from '../components/AddTodoDialog'
import { bus } from '../main'
import firebase from 'firebase'
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import Check from 'vue-material-design-icons/Check'
import DeathStar from 'vue-material-design-icons/DeathStar'
require('howler')

export default {
  name: 'TodoList',
  components: {
    AddTodoDialog,
    Check,
    DeathStar,
  },

  data() {
    return {
      dialog: false,
      groupItems: this.$store.state.todoGroups.items,
    }
  },

  props: {
    mainDialog: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    todos() {
      return this.groupItems[this.id].todos
    },
  },

  mixins: [asyncDataStatus],

  methods: {
    close() {
      this.$emit('closeTodoList')
    },
    playSound(src) {
      var sound = new Howl({
        autoplay: true,
        src: [require(`../assets/sounds/${src}.mp3`)],
        volume: 0.5,
      })
      sound.play()
    },

    checkTodo(todo) {
      todo.marked = !todo.marked
      this.updateTodo({ todos: this.todos, groupId: this.id })
      this.playSound('Gooood')
    },

    deleteTodo(todo) {
      this.playSound('Do it')
      const todos = this.todos.filter((td) => td !== todo)
      this.updateTodo({ todos, groupId: this.id })
    },

    ...mapActions('todoGroups', ['fetchGroup', 'updateTodo']),
  },

  created() {
    const request = this.fetchGroup({ id: this.id })
    setTimeout(() => {
      request.then(() => {
        this.asyncDataStatus_fetched()
      })
    }, 1000)
  },
}
</script>

<style module>
.tableRowChecked {
  text-decoration: line-through;
}

.addBtn {
  margin-left: 200px;
  margin-bottom: 20px;
}
.spinner {
}
</style>
