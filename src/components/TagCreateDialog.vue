<template>
  <v-dialog persistent v-model="dialog" max-width="500">
    <v-card>
      <v-text-field v-model="newTag" height="60" label="Create Tag">
      </v-text-field>
      <v-color-picker v-model="color" class="mx-auto"> </v-color-picker>
      <br />
      <v-btn :color="color" @click="close">Close</v-btn>
      <v-btn :color="color" @click="create">Create</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    createDialogProp: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      newTag: '',
      color: '',
    }
  },
  computed: {
    dialog() {
      return this.createDialogProp
    },
  },
  methods: {
    close() {
      this.newTag = ''
      this.$emit('close')
    },
    create() {
      this.$emit('create', { value: this.newTag, color: this.color })
      this.newTag = ''
    },
  },
}
</script>
