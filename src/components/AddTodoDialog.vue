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
import { bus } from '../main';

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
  methods: {
    submit() {
      bus.$emit('submit', { value: this.newTodoValue });
      this.newTodoValue = '';
    }
  },
}
</script>

<style scoped>
.todoInput {
  overflow: hidden;
}
</style>