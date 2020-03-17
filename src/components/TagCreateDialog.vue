<template>
  <v-dialog persistent v-model="dialog">
    <v-card>
      <v-text-field v-model="newTag" label="Create Tag"> </v-text-field>
    </v-card>
    <v-btn rounded @click="close">Close</v-btn>
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
    }
  },
  computed: {
    dialog() {
      return this.createDialogProp
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>
