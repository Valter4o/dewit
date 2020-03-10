<template>
  <div>
    <h1>Your Todo Groups</h1>
    <br />
    <v-card class="mx-auto" max-width="700">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">Name</th>
              <th class="text-center">Todos</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="group in groups"
              :key="group['_key']"
              @click="showTodoList(group['_key'])"
            >
              <td>{{ group.name }}</td>
              <td>{{ group.todos.length }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      groups: [
        {
          _key: 0,
          name: 'Group 1',
          todos: ['Todo 1', 'Todo 2'],
        },
        {
          _key: 1,
          name: 'Group 2',
          todos: ['Todo 1'],
        },
      ],
    }
  },

  props: {
    ids: {
      type: Array,
      required: true,
    },
  },

  methods: {
    showTodoList(id) {
      console.log(id)
    },
    ...mapActions[('todoGroups', ['fetchGroups'])],
  },

  created() {},
}
</script>
