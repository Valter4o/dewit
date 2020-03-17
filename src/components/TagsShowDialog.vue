<template>
  <v-dialog
    persistent
    overlay-opacity="0"
    hide-overlay
    max-width="40%"
    v-model="tagsDialogProp"
  >
    <v-card outlined class="mx-auto">
      <v-row>
        <h1 :class="$style.tagHeader">Tags</h1>
        <v-btn :class="$style.addTagButton" @click="changeCreateShow" rounded>
          +
        </v-btn>

        <Create :createDialogProp="createDialog" @close="changeCreateShow" />
        <v-spacer />

        <v-btn rounded @click="close" :class="$style.closeBtn">
          Close
        </v-btn>
      </v-row>
      <v-container>
        <v-chip>Demo tag</v-chip>
        <v-chip>Demo tag</v-chip>
        <v-chip>Demo tag</v-chip>
        <v-chip>Demo tag</v-chip>
        <v-chip>Demo tag</v-chip>
        <v-chip>Demo tag</v-chip>
        <v-chip>Demo tag</v-chip>
        <v-chip>Demo tag</v-chip>
        <v-chip>Demo tag</v-chip>
        <v-chip>Demo tag</v-chip>
        <v-chip>Demo tag</v-chip>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import Create from '@/components/TagCreateDialog'

export default {
  components: {
    Create,
  },

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
  },

  methods: {
    close() {
      this.$emit('closeTags')
    },
    changeCreateShow() {
      this.createDialog = !this.createDialog
    },
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
  margin-right: 20px;
  margin-top: 8px;
}
</style>
