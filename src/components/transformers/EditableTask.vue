<template>
  <div>
    <v-text-field v-model="task.title" flat> </v-text-field>

    <br />
    <v-text-field v-model="task.description" flat dense> </v-text-field>
    <v-btn rounded color="red" @click="changeEditable">
      Cancel
    </v-btn>
    <v-btn rounded color="green" @click="editTask"> Submit </v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    editTask() {
      const taskId = this.task._key

      this.updateTask({ task: this.task, taskId })
      this.changeEditable()
    },
    changeEditable() {
      this.$emit('toggleEditable')
    },
    ...mapActions('tasks', ['updateTask']),
  },
}
</script>
