<template>
  <div>
    <h4>Add Comment</h4>
    <br />
    <v-textarea outlined v-model="newComment" label="Add Comment"> </v-textarea>
    <v-btn rounded color="red" @click="addComment">
      Comment
    </v-btn>
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
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newComment: '',
    }
  },
  methods: {
    addComment() {
      if (this.newComment) {
        const name = this.user.username ? this.user.username : this.user.email

        const taskId = this.task._key
        const newComment = {
          text: this.newComment,
          name,
          commentTime: Date.now(),
        }
        this.task.comments.unshift(newComment)
        this.updateTask({ task: this.task, taskId })
        this.newComment = ''
      }
    },
    ...mapActions('tasks', ['updateTask']),
  },
}
</script>
