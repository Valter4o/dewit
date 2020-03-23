<template>
  <v-dialog
    persistent
    overlay-opacity="0"
    hide-overlay
    max-width="40%"
    v-model="tagsDialogProp"
  >
    <v-card outlined class="mx-auto">
      <h1 :class="$style.tagHeader">
        Tags
        <v-btn :class="$style.addTagButton" @click="changeCreateShow" rounded>
          +
        </v-btn>

        <Create
          :createDialogProp="createDialog"
          @close="changeCreateShow"
          @create="create"
        />
      </h1>
      <v-spacer />

      <v-container v-if="asyncDataStatus_ready">
        <v-btn
          rounded
          @click="addToTask(tag)"
          v-for="tag in tags"
          :key="tags.indexOf(tag)"
          :color="tag.color"
          >{{ tag.value }}</v-btn
        >
      </v-container>
      <v-btn rounded @click="close" :class="$style.closeBtn">
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

  props: {
    tagsDialogProp: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      createDialog: false,
    }
  },

  computed: {
    dialog() {
      return this.tagsDialogProp
    },
    projectId() {
      return this.$router.currentRoute.params.id
    },
    tags() {
      return this.$store.state.tags.items[this.projectId].tags
    },
  },

  methods: {
    close() {
      this.$emit('closeTags')
    },
    changeCreateShow() {
      this.createDialog = !this.createDialog
    },
    create({ value, color }) {
      this.changeCreateShow()
      const tags = this.tags
      tags.push({ value, color })
      this.updateTags({ tags, id: this.projectId })
    },
    addToTask(tag) {
      this.$emit('addTag', tag)
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

.addTagButton {
  margin-left: 20px;
  margin-top: 8px;
}

.closeBtn {
  margin-left: 80%;
  margin-top: 8px;
}
</style>
