<template>
  <div>
    <h3>Comments:</h3>
    <v-card class="mx-auto" max-width="344">
      <Comment
        v-for="comment in comments"
        :key="comment.author"
        :comment="comment"
      />
    </v-card>
  </div>
</template>

<script>
import Comment from '@/components/dummy/BaseComment'
export default {
  components: {
    Comment,
  },
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
}
</script>
