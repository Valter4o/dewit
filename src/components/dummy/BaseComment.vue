<template>
  <div>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title>
          <v-avatar color="red" size="40">
            <img src="@/assets/images/defaultUser/yoda.png" />
          </v-avatar>
          {{ comment.name }}</v-list-item-title
        >
        <v-list-item-subtitle>
          <h4>
            {{ comment.text }}
          </h4>
        </v-list-item-subtitle>
        <h6>
          {{ comment.commentTime | moment('dddd, MMMM Do YYYY, h:mm:ss a') }}
        </h6>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
}
</script>
