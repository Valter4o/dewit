<template>
  <div>
    <h3>{{ task.title }}</h3>
    <br />
    <p>
      {{ task.description }}
    </p>
    <h4 v-if="dueDate">Due Date:{{ dueDate }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dueDate() {
      return this.task.dueDate ? this.task.dueDate : false
    },
  },
}
</script>
