<template>
  <v-dialog
    persistent
    overlay-opacity="0"
    hide-overlay
    max-width="40%"
    v-model="dialog"
  >
    <template v-slot:activator="{ on }">
      <v-btn rounded color="blue" v-on="on">
        +
      </v-btn>
    </template>
    <v-card outlined class="mx-auto">
      <h1 :class="$style.tagHeader">
        Tags
        <Create @create="create" />
        <v-btn rounded @click="deleting = !deleting">
          <span v-if="deleting">
            Done
          </span>
          <span v-else>
            Delete
          </span>
        </v-btn>
      </h1>
      <v-spacer />

      <v-container v-if="asyncDataStatus_ready">
        <v-btn
          rounded
          @click="addToTask(tag)"
          v-for="tag in tags"
          :key="tags.indexOf(tag)"
          :color="tag.color"
          >{{ tag.value }}
          <template v-if="deleting">
            <v-btn
              height="30"
              width="30"
              fab
              small
              @click="removeTag(tag, $event)"
            >
              -
            </v-btn>
          </template>
        </v-btn>
      </v-container>
      <v-btn rounded @click="dialog = false" :class="$style.closeBtn">
        Close
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import Create from '@/components/TagCreateDialog'
import { mapActions } from 'vuex'
import asyncDataStatus from '../mixins/asyncDataStatus'

export default {
  components: {
    Create,
  },

  mixins: [asyncDataStatus],

  data() {
    return {
      createDialog: false,
      deleting: false,
      dialog: false,
    }
  },

  computed: {
    projectId() {
      return this.$router.currentRoute.params.id
    },
    tags() {
      return this.$store.state.tags.items[this.projectId].tags
    },
  },

  methods: {
    create({ value, color }) {
      const tags = this.tags
      tags.push({ value, color })
      this.updateTags({ tags, id: this.projectId })
    },
    addToTask(tag) {
      this.$emit('addTag', tag)
    },
    removeTag(t, e) {
      e.cancelBubble = true
      const tags = this.tags.filter((tag) => tag != t)
      this.updateTags({ tags, id: this.projectId })
    },
    ...mapActions('tags', ['fetchTags', 'updateTags']),
  },

  created() {
    this.fetchTags({ projectId: this.projectId }).then(() => {
      this.asyncDataStatus_fetched()
    })
  },
}
</script>

<style module>
.tagHeader {
  margin-left: 20px;
}
.closeBtn {
  margin-left: 80%;
  margin-top: 8px;
}
</style>
