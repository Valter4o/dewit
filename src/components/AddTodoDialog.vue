<template>
  <v-dialog v-model="dialog" overlay-opacity="0" hide-overlay max-width="300px">
    <v-card>
      <v-text-field
        v-model="newTodoValue"
        class="todoInput"
        :placeholder="placeholder"
        :clearable="clearable"
        @keyup.13="submit"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import playSound from '@/utils/playSound'

export default {
  name: 'AddTodoDialog',
  data() {
    return {
      dialog: true,
      dark: true,
      placeholder: 'Add todo',
      newTodoValue: '',
      clearable: true,
    }
  },
  props: {
    groupId: {
      type: String,
      required: true,
    },
  },

  computed: {
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

        this.updateTodos({ todos, groupId: this.groupId })
        this.newTodoValue = ''

        playSound('Do it')
      }
    },
    ...mapActions('todoGroups', ['updateTodos']),
  },
}
</script>

<style scoped>
.todoInput {
  overflow: hidden;
}
</style>
