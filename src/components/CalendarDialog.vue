<template>
  <v-dialog v-model="dialog" max-width="300" persistent>
    <template v-slot:activator="{ on }">
      <v-btn fab small color="purple" v-on="on">
        <CalendarClock />
      </v-btn>
    </template>
    <v-date-picker v-model="picker"></v-date-picker>
    <v-btn @click="select" color="green">Select</v-btn>
    <v-btn @click="dialog = false" color="red">Close</v-btn>
  </v-dialog>
</template>

<script>
import CalendarClock from 'vue-material-design-icons/CalendarClock'
import { mapActions } from 'vuex'

export default {
  components: {
    CalendarClock,
  },
  data: () => ({
    dialog: false,
    picker: new Date().toISOString().substr(0, 10),
  }),
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    select(user) {
      this.task.dueDate = this.picker
      this.updateTask({ task: this.task, taskId: this.task._key }).then(() => {
        this.dialog = false
      })
    },
    ...mapActions('tasks', ['updateTask']),
  },

  computed: {
    projectName() {
      return this.$store.state.projects.items[this.id].name
    },
    id() {
      return this.$router.currentRoute.params.id
    },
  },
}
</script>
