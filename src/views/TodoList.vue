<template>
  <div>
    <v-container :class="$style.todoContainer">
      <h1 :class="$style.headerLarge">
        Your todo list
      </h1>

      <v-simple-table>
        <v-row
          v-for="todo in todos"
          :class="$style.tableRow"
          :key="todos.indexOf(todo)"
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
            <span>{{ todo.value }}</span>
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
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  name: 'TodoList',
  components: {
    AppTodoDialog,
  },

  data() {
    return {
      dialog: false,
    }
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  mixins: [asyncDataStatus],

  computed: {
    todos() {
      return this.$store.state.todoGroups.items[this.id].todos
    },
  },

  methods: {
    submit(value) {},

    removeTodo(todo) {},
    ...mapActions('todoGroups', ['fetchGroup']),
  },

  created() {
    this.fetchGroup({ id: this.id }).then(() => {
      this.asyncDataStatus_fetched()
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
