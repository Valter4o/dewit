<template>
  <div>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title>
          <v-avatar color="indigo" size="35">
            <img :src="comment.avatarUrl" :alt="comment.name" />
          </v-avatar>
          {{ comment.name }}</v-list-item-title
        >
        <v-list-item-subtitle>
          <h4>
            {{ comment.text }}
          </h4>
        </v-list-item-subtitle>
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
