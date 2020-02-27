<template>
  <div>
    <v-container fluid>
      <h1 :class="$style.headerLarge">
        Your todo list
      </h1>

      <v-simple-table>
        <template>
          <tbody>
            <tr
              v-for="todo in todoList"
              :key="todoList.indexOf(todo)"
            >
              <td>{{ todo.value }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <br>

      <v-row>
        <v-text-field
          v-model="newTodoValue"
          :placeholder="placeholder"
          :clearable="clearable"
          @keyup.13="submit()"
        />
      </v-row>

      <button @click="submit()">
        Submit
      </button>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data() {
    return {
      todoList: [
        //
        {
          value: 'Todo1'
        },
        {
          value: 'Todo2'
        },
      ],
      newTodoValue: '',
      placeholder: 'Add todo',
      clearable: true,
    }
  },

  methods: {
    submit() {
      if (this.newTodoValue) {
        const todo = {};
        this.$set(todo, 'value', this.newTodoValue)
        this.todoList.push(todo);
        this.newTodoValue = '';
      }
    },
  },
}
</script>

<style module>
v-simple-table {
  height: 200px;
  font-size: 50px;
}

.headerLarge {
  font-size: 80px;
}

.todoText {
  font-size: 40px;
}

.todoInput {
  height: 50px;
  width: 500px;
  font-size: 40px;
}
</style>