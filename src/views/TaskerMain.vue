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
  data() {
    return {
      transition: 'scale-transition',
    }
  },

  mixins: [asyncDataStatus],

  methods: {
    fetchTasksMethod() {
      const request = this.fetchTasks({ projectId: this.id })
      setTimeout(() => {
        request.then((data) => {
          this.asyncDataStatus_fetched()
        })
      }, 1000)
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
