<template>
  <v-card>
    <v-col>
      <v-app-bar :color="color">
        <template v-if="type === 'Inbox'">
          <v-btn fab small>
            <InboxArrowDownOutline />
          </v-btn>
        </template>
        <template v-else-if="type === 'To do'">
          <v-btn fab small>
            <Clippy />
          </v-btn>
        </template>
        <template v-else-if="type === 'In Progress'">
          <v-btn fab small>
            <ProgressWrench />
          </v-btn>
        </template>
        <template v-else-if="type === 'Done'">
          <v-btn fab small>
            <Check />
          </v-btn>
        </template>
        <v-spacer
          ><h2>{{ type }}</h2>
        </v-spacer>
        <v-btn
          v-if="type === 'Inbox'"
          class="mx-2"
          fab
          small
          dark
          color="indigo"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-app-bar>
      <br />
      <template v-for="i in 5">
        <ShortTask :key="i" :type="type" />
      </template>
    </v-col>
  </v-card>
</template>

<script>
import ShortTask from '@/components/ShortTask'
import InboxArrowDownOutline from 'vue-material-design-icons/InboxArrowDownOutline'
import Clippy from 'vue-material-design-icons/Clippy'
import ProgressWrench from 'vue-material-design-icons/ProgressWrench'
import Check from 'vue-material-design-icons/Check'

export default {
  components: {
    ShortTask,
    InboxArrowDownOutline,
    Clippy,
    ProgressWrench,
    Check,
  },

  props: {
    type: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
}
</script>
