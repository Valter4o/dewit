<template>
  <div>
    <div v-if="asyncDataStatus_ready">
      <h1>{{ project.name }}</h1>
      <template>
        <v-card class="mx-auto" max-width="700">
          <v-card-text>
            <h1>Project Description</h1>
            <br />
            <p>
              {{ project.description }}
            </p>
          </v-card-text>
          <v-card-actions :class="$style.buttonsContainer">
            <router-link :to="{ name: 'UsersList' }">
              <v-btn
                text
                rounded="rounded"
                max-width="200px"
                color="deep-purple"
              >
                <AccountDetails />
                Users List
              </v-btn>
            </router-link>
            <router-link :to="{ name: 'TodoGroups', params: { id } }">
              <v-btn
                text
                rounded="rounded"
                max-width="200px"
                color="deep-purple"
              >
                <CheckBoxMultipleOutline />
                Todo List
              </v-btn>
            </router-link>
            <router-link :to="{ name: 'Tasker' }">
              <v-btn
                text
                rounded="rounded"
                max-width="200px"
                color="deep-purple"
              >
                <InboxFull />

                Tasker
              </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </template>
    </div>
    <div v-else>
      <v-skeleton-loader
        :loading="!asyncDataStatus_ready"
        :transition="transition"
        type="card-heading"
        width="700"
        class="mx-auto"
      >
      </v-skeleton-loader>
      <v-skeleton-loader
        :loading="!asyncDataStatus_ready"
        :transition="transition"
        type="article"
        width="700"
        class="mx-auto"
      >
      </v-skeleton-loader>
      <v-skeleton-loader
        :loading="!asyncDataStatus_ready"
        :transition="transition"
        height="500"
        type="actions"
        width="700"
        class="mx-auto"
      >
      </v-skeleton-loader>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import InboxFull from 'vue-material-design-icons/InboxFull'
import CheckBoxMultipleOutline from 'vue-material-design-icons/CheckBoxMultipleOutline'
import AccountDetails from 'vue-material-design-icons/AccountDetails'

export default {
  components: {
    InboxFull,
    CheckBoxMultipleOutline,
    AccountDetails,
  },
  data() {
    return {
      rounded: true,
      transition: 'scale-transition',
    }
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    project() {
      return this.$store.state.projects.items[this.id]
    },
  },

  mixins: [asyncDataStatus],

  methods: {
    ...mapActions('projects', ['fetchProject']),
  },

  created() {
    const request = this.fetchProject({ id: this.id })
    setTimeout(() => {
      request.then(() => {
        this.asyncDataStatus_fetched()
      })
    }, 1000)
  },
}
</script>

<style module>
.buttonsContainer {
  justify-content: center;
}
</style>
