<template>
  <div>
    <v-row>
      <Column type="Inbox" color="orange" />
      <Column type="To do" color="red" />
      <Column type="In Progress" color="blue" />
      <Column type="Done" color="green" />
    </v-row>
  </div>
</template>

<script>
import Column from '@/components/ColumnTasker'

export default {
  components: {
    Column,
  },
  data: () => ({}),
}
</script>
