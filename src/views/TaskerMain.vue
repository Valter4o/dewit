<template>
  <div>
    <v-row v-if="asyncDataStatus_ready">
      <Column status="Inbox" color="orange" />
      <Column status="To do" color="red" />
      <Column status="In Progress" color="blue" />
      <Column status="Done" color="green" />
    </v-row>
    <div v-else>
      Loading
    </div>
  </div>
</template>

<script>
import Column from '@/components/ColumnTasker'
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  components: {
    Column,
  },
  props: {
    id: {
      type: String,
      requiredL: true,
    },
  },

  mixins: [asyncDataStatus],

  methods: {
    fetchTasksMethod() {
      this.fetchTasks({ projectId: this.id }).then((data) => {
        this.asyncDataStatus_fetched()
      })
    },
    ...mapActions('tasker', ['fetchTasks']),
    ...mapActions('projects', ['fetchProject']),
  },

  created() {
    if (!this.$store.state.projects.items[this.id]) {
      this.fetchProject({ id: this.id }).then(() => {
        this.fetchTasksMethod()
      })
    } else {
      this.fetchTasksMethod()
    }
  },
}
</script>
