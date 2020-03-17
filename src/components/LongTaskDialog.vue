<template>
  <v-dialog
    v-model="dialog"
    max-width="60%"
    persistent
    overlay-opacity="0"
    hide-overlay
  >
    <v-card class="mx-auto" outlined>
      <v-app-bar>
        <h3>Pesho dava sledniq task</h3>
        <v-spacer />
        <v-btn @click="close" rounded>
          X
        </v-btn>
      </v-app-bar>
      <br />
      <v-row>
        <v-col :class="$style.leftCol">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </v-col>

        <v-col>
          <div>
            <v-app-bar dense flat color="white">
              <h3>Tags</h3>
              <v-spacer />
              <v-btn rounded @click="changeTagsShow">+</v-btn>
              <Tags :tagsDialogProp="tagDialog" @closeTags="changeTagsShow" />
            </v-app-bar>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import Tags from '@/components/TagsShowDialog'

export default {
  components: {
    Tags,
  },
  props: {
    dialogProp: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      tagDialog: false,
    }
  },
  computed: {
    dialog() {
      return this.dialogProp
    },
  },

  methods: {
    close() {
      this.$emit('close')
    },

    changeTagsShow() {
      this.tagDialog = !this.tagDialog
    },
  },
}
</script>

<style module>
.leftCol {
  margin-left: 20px;
}

.tag {
  margin: 5px;
}
</style>
