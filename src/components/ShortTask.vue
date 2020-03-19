<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="360"
      min-width="360"
      outlined
      elevation="5"
      @click="displayDialog"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <h3 :class="$style.headerTask">{{ task.title }}</h3>
          <br />
          <p>
            {{ task.description }}
          </p>
        </v-list-item-content>
      </v-list-item>

      <v-btn
        :class="$style.tag"
        small
        rounded
        v-for="tag in task.tags"
        :color="tag.color"
        :key="tag._key"
        >{{ tag.value }}</v-btn
      >
      <v-footer color="white">
        <template v-if="commentsCount > 0">
          <CommentTextMultiple />
          <span :class="$style.commentsCount">{{ commentsCount }}</span>
        </template>
        <!-- 
        <template>
          <DnsOutline />
          <span :class="$style.commentsCount">5</span>
        </template> -->
      </v-footer>
    </v-card>
    <LongDialog :dialogProp="dialog" @close="close" :task="task" />
  </div>
</template>

<script>
import CommentTextMultiple from 'vue-material-design-icons/CommentTextMultiple'
import DnsOutline from 'vue-material-design-icons/DnsOutline'
import LongDialog from '@/components/LongTaskDialog'

export default {
  components: {
    CommentTextMultiple,
    DnsOutline,
    LongDialog,
  },

  data() {
    return {
      dialog: false,
    }
  },

  props: {
    task: {
      type: Object,
      required: true,
    },
  },

  computed: {
    commentsCount() {
      return this.task.comments.length
    },
  },

  methods: {
    displayDialog() {
      this.dialog = true
    },
    close() {
      this.dialog = !this.dialog
    },
  },
}
</script>

<style module>
.headerTask,
.commentsCount {
  margin-left: 10px;
  margin-right: 10px;
}
.tag {
  margin: 5px;
}
</style>
