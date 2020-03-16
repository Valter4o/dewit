<template>
  <v-dialog v-model="dialog" overlay-opacity="0" hide-overlay max-width="700">
    <v-card class="mx-auto" max-width="700" max-height="700" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <h3>Pesho dava sledniq task</h3>
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
        <span>5</span>
        <v-spacer></v-spacer>
        <v-list-item>
          <v-btn small rounded>Demo tag</v-btn>
          <v-btn small rounded>Demo tag</v-btn>
          <v-btn small rounded>Demo tag</v-btn>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
