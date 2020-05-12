<template>
  <v-dialog v-model="dialog" persistent max-width="500px" overlay-opacity="0">
    <template v-slot:activator="{ on }">
      <v-btn rounded color="blue" v-on="on">
        Open Todo List for this task
      </v-btn>
    </template>
    <v-card>
      <template v-if="asyncDataStatus_ready">
        <v-btn btn color="green" @click="dialog = false">
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
import AddTodoDialog from '@/components/creational/TodoCreateDialog'
import firebase from 'firebase'
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import Check from 'vue-material-design-icons/Check'
import DeathStar from 'vue-material-design-icons/DeathStar'
import playSound from '@/utils/playSound'

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
    checkTodo(todo) {
      todo.marked = !todo.marked
      this.updateTodos({ todos: this.todos, groupId: this.id })
    },

    deleteTodo(todo) {
      playSound('Gooood')

      const todos = this.todos.filter((td) => td !== todo)
      this.updateTodos({ todos, groupId: this.id })
    },

    ...mapActions('todoGroups', ['fetchGroup', 'updateTodos']),
  },

  created() {
    this.fetchGroup({ id: this.id }).then(() => {
      this.asyncDataStatus_fetched()
    })
  },
}
</script>

<style module>
.tableRowChecked {
  text-decoration: line-through;
}
</style>
