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
              <v-icon dark disabled="">mdi-heart</v-icon>
            </v-btn>
            <span>{{ todo[1].value }}</span>
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
      todoList: null,
      dialog: false,
      db: firebase.database().ref('todos'),
    }
  },

  methods: {
    submit(value) {
      if (value) {
        const todo = {
          value,
        }
        // this.db.push(todo)
      }
      firebase
        .firestore()
        .collection('projects')
        .get()
        .then((q) => {
          q.forEach((d) => {
            console.log(d.data())
          })
        })
      // .onSnapshot((s) => {
      //   console.log(s.data())
      // })
    },

    removeTodo(todo) {
      // this.db.child(todo[0]).remove()
    },
  },

  created() {
    bus.$on('submit', ({ value }) => {
      this.submit(value)
    })
    this.$store.dispatch('foo')
    // const x = this.db.on('value', (snapshot) => {
    //   this.todoList = Object.entries(snapshot.val())
    // })
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
