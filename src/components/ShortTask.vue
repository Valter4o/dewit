<template>
  <div>
    <v-card class="mx-auto" max-width="360" outlined @click="displayDialog">
      <v-list-item three-line>
        <v-list-item-content>
          <h3 :class="$style.headerTask">Pesho dava sledniq task</h3>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <CommentTextMultiple />
        <span :class="$style.commentsCount">5</span>
        <v-spacer></v-spacer>
        <v-list-item>
          <v-btn small rounded @click="bar">Demo tag</v-btn>
          <v-btn small rounded @click="bar">Demo tag</v-btn>
          <v-btn small rounded @click="bar">Demo tag</v-btn>
        </v-list-item>
      </v-card-actions>
    </v-card>
    <LongDialog :dialog="dialog" />
  </div>
</template>

<script>
import CommentTextMultiple from 'vue-material-design-icons/CommentTextMultiple'
import LongDialog from '@/components/LongTaskDialog'

export default {
  components: {
    CommentTextMultiple,
    LongDialog,
  },

  data() {
    return {
      dialog: false,
    }
  },

  props: {
    type: {
      type: String,
      required: true,
    },
  },

  methods: {
    displayDialog() {
      this.dialog = true
    },
    bar(e) {
      e.cancelBubble = true
    },
  },
}
</script>

<style module>
.headerTask,
.commentsCount {
  margin-left: 10px;
}
</style>
