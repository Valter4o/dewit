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

      <v-btn :class="$style.tag" small rounded @click="bar">Demo tag</v-btn>
      <v-btn :class="$style.tag" small rounded @click="bar">Demo tag</v-btn>
      <v-btn :class="$style.tag" small rounded @click="bar">Demo tag</v-btn>
      <v-btn :class="$style.tag" small rounded @click="bar">Demo tag</v-btn>
      <v-btn :class="$style.tag" small rounded @click="bar">Demo tag</v-btn>
      <v-btn :class="$style.tag" small rounded @click="bar">Demo tag</v-btn>
      <v-btn :class="$style.tag" small rounded @click="bar">Demo tag</v-btn>
      <v-btn :class="$style.tag" small rounded @click="bar">Demo tag</v-btn>
      <v-footer>
        <CommentTextMultiple />
        <span :class="$style.commentsCount">5</span>
        <DnsOutline />
        <span :class="$style.commentsCount">5</span>
      </v-footer>
    </v-card>
    <LongDialog :dialogProp="dialog" @close="close" />
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
    close() {
      this.dialog = false
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
