<template>
  <div>
    <v-container :class="$style.todoContainer">
      <h1 :class="$style.headerLarge">
        Your todo list
      </h1>

      <v-simple-table>
        <v-row
          v-for="todo in todoList"
          :class="$style.tableRow"
          :key="todoList.indexOf(todo)"
        >
          <td>
            <v-btn
              class="mx-2"
              fab
              dark
              small
              color="primary"
              @click="removeTodo(todo)"
            >
              <v-icon dark>mdi-minus</v-icon>
            </v-btn>
            {{ todo.value }}
          </td>
        </v-row>
      </v-simple-table>
      <AppTodoDialog v-if="dialog" />

      <v-btn dark fab color="red" @click="dialog = !dialog">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import AppTodoDialog from '../components/AddTodoDialog'
import { bus } from '../main'
import firebase from 'firebase'

export default {
  name: 'TodoList',
  components: {
    AppTodoDialog,
  },

  data() {
    return {
      todoList: [
        {
          value: 'Todo 1',
        },
        {
          value: 'Todo 2',
        },
      ],
      dialog: false,
    }
  },

  methods: {
    submit(value) {
      if (value) {
        const todo = {}
        this.$set(todo, 'value', value)
        this.todoList.push(todo)
      }
    },

    removeTodo(todo) {
      this.todoList = this.todoList.filter((el) => el !== todo)
    },
  },

  created() {
    bus.$on('submit', ({ value }) => {
      this.submit(value)
    })
    const x = firebase
      .database()
      .ref('todos')
      .on('value', (snapshot) => {
        debugger
        console.log(snapshot.val())
      })
  },
}
</script>

<style module>
.tableRow {
  width: 500px;
  overflow: hidden;
  margin-left: 300px;
}

.headerLarge {
  font-size: 60px;
}
</style>
