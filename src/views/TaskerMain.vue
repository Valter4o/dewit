<template>
  <div>
    <v-row v-if="asyncDataStatus_ready">
      <Column status="Inbox" color="orange" />
      <Column status="To do" color="red" />
      <Column status="In Progress" color="blue" />
      <Column status="Done" color="green" />
    </v-row>
    <div v-else>
      <v-row>
        <v-col v-for="i in 4" :key="i">
          <v-skeleton-loader
            :loading="!asyncDataStatus_ready"
            :transition="transition"
            type="card"
            width="360"
            height="60"
            class="mx-auto"
          >
          </v-skeleton-loader>
          <v-col>
            <v-skeleton-loader
              v-for="j in 3"
              :key="j"
              class="mb-6"
              type="article, actions"
            ></v-skeleton-loader>
          </v-col>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Column from '@/pages/ColumnTasker'
import { mapActions, mapGetters } from 'vuex'
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
  data() {
    return {
      transition: 'scale-transition',
    }
  },

  mixins: [asyncDataStatus],

  methods: {
    fetchTasksMethod() {
      this.fetchTasksRef({ projectId: this.id }).then((data) => {
        const ids = data.tasks
        this.fetchTasks({ ids }).then(() => {
          this.asyncDataStatus_fetched()
        })
      })
    },
    ...mapActions('tasker', ['fetchTasksRef']),
    ...mapActions('tasks', ['fetchTasks', 'resetState']),
    ...mapActions('projects', ['fetchProject']),
  },

  created() {
    this.fetchTasksMethod()
  },
  destroyed() {
    this.resetState()
  },
}
</script>
