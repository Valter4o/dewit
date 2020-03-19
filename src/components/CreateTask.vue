<template>
  <v-dialog max-width="600" persistent v-model="dialog">
    <v-card class="mx-auto" max-width="600">
      <v-row>
        <h3 :class="$style.title">
          Create Task
        </h3>
        <v-spacer />
        <v-btn fab small :class="$style.closeBtn" @click="close">
          x
        </v-btn>
      </v-row>
      <v-col>
        <v-text-field label="Title" v-model="title"></v-text-field>

        <v-text-field label="Description" v-model="description"></v-text-field>
      </v-col>
      <v-row>
        <v-spacer />
        <v-btn :class="$style.submitBtn" rounded color="orange" @click="submit"
          >Submit</v-btn
        >
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: '',
      description: '',
    }
  },
  methods: {
    close() {
      this.$emit('closeDialog')
    },

    submit() {
      this.createTodoGroup().then((id) => {
        const task = {
          title: this.title,
          description: this.description,
          status: 'Inbox',
          todoGroup: id,
          createdAt: Date.now(),
          comments: [],
          tags: [],
        }
        const projectId = this.$router.currentRoute.params.id

        this.createTask({ projectId, task }).then(() => {
          this.title = ''
          this.description = ''
          this.close()
        })
      })
    },
    ...mapActions('tasker', ['createTask']),
    ...mapActions('todoGroups', ['createTodoGroup']),
  },
}
</script>

<style module>
.closeBtn {
  margin-right: 50px;
  margin-top: 10px;
}
.submitBtn {
  margin-right: 50px;
  margin-bottom: 20px;
}
.title {
  margin-left: 50px;
  margin-top: 15px;
}
</style>
