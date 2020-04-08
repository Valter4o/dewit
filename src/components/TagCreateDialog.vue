<template>
  <v-dialog persistent v-model="dialog" max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn rounded color="blue" v-on="on">
        Create Tag
      </v-btn>
    </template>
    <v-card>
      <v-text-field v-model="newTag" height="60" label="Create Tag">
      </v-text-field>
      <v-color-picker v-model="color" class="mx-auto"> </v-color-picker>
      <br />
      <v-btn :color="color" @click="dialog = false">Close</v-btn>
      <v-btn :color="color" @click="create">Create</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      newTag: '',
      color: '',
      dialog: false,
    }
  },
  methods: {
    create() {
      this.$emit('create', { value: this.newTag, color: this.color })
      this.newTag = ''
      this.dialog = false
    },
  },
}
</script>
