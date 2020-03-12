<template>
  <div>
    <v-container :class="$style.todoContainer" v-if="asyncDataStatus_ready">
      <h1 :class="$style.headerLarge">
        {{ groupName }}
      </h1>

      <v-simple-table>
        <v-row
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
        </v-row>
      </v-simple-table>

      <AppTodoDialog v-if="dialog" />

      <v-btn dark fab color="red" @click="dialog = !dialog">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-container>

    <v-progress-circular
      :class="$style.spinner"
      v-else
      :width="5"
      size="70"
      color="green"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
import AppTodoDialog from '../components/AddTodoDialog'
import { bus } from '../main'
import firebase from 'firebase'
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import Check from 'vue-material-design-icons/Check'
import DeathStar from 'vue-material-design-icons/DeathStar'

export default {
  name: 'TodoList',
  components: {
    AppTodoDialog,
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
    groupName() {
      return this.groupItems[this.id].name
    },
    todos() {
      return this.groupItems[this.id].todos
    },
  },

  mixins: [asyncDataStatus],

  methods: {
    checkTodo(todo) {
      todo.marked = !todo.marked
      this.updateTodo({ todos: this.todos, groupId: this.id })
    },
    deleteTodo(todo) {
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
.tableRowNotChecked,
.tableRowChecked {
  width: 500px;
  overflow: hidden;
  margin-left: 300px;
}

.tableRowChecked {
  text-decoration: line-through;
}

.headerLarge {
  font-size: 60px;
}

.spinner {
  margin-top: 100px;
}
</style>
