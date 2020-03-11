<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-text-field
      v-model="newTodoValue"
      class="todoInput"
      :placeholder="placeholder"
      :clearable="clearable"
      @keyup.13="submit"
    />

    <button @click="submit()">
      Submit
    </button>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AddTodoDialog',
  data() {
    return {
      dialog: true,
      placeholder: 'Add todo',
      newTodoValue: '',
      clearable: true,
    }
  },

  computed: {
    groupId() {
      return this.$router.app._route.params.id
    },
    todos() {
      return this.$store.state.todoGroups.items[this.groupId].todos
    },
  },

  methods: {
    submit() {
      if (this.newTodoValue) {
        const todo = {
          value: this.newTodoValue,
          marked: false,
        }
        const todos = this.todos
        todos.push(todo)

        this.createTodo({ todos, groupId: this.groupId })
        this.newTodoValue = ''
      }
    },
    ...mapActions('todoGroups', ['createTodo']),
  },
}
</script>

<style scoped>
.todoInput {
  overflow: hidden;
}
</style>
