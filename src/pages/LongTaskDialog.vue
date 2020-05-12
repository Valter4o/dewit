<template>
  <div>
    <v-dialog v-model="dialog" max-width="60%" persistent>
      <v-card width="98%">
        <!-- Navbar -->
        <v-app-bar width="100%" :color="navbarColor">
          <v-avatar>
            <img src="@/assets/images/defaultUser/yoda.png" alt="Y" />
          </v-avatar>

          <h4 :class="$style.userHeading" v-if="!assignedUser">
            Unnasiggned
          </h4>
          <h4 :class="$style.userHeading" v-else>
            {{ assignedUser }}
          </h4>
          <v-spacer />
        <Menu
          @close="close"
          @edit="toggleEditable"
          :task="task"
        />
          <v-btn @click="close" rounded>
            X
          </v-btn>
        </v-app-bar>
        <br />

        <v-row>
          <!-- Left Column -->
          <v-col :class="$style.leftCol">
            <!-- Editable task -->
            <template v-if="edit">
              <EditableTask :task="task" @toggleEditable="toggleEditable" />
            </template>

            <!-- Static task -->
            <template v-else>
              <BaseText :task="task" />
            </template>

            <br />

            <!-- TodoList -->
            <TodoList :id="task.todoGroup" />
            <br />
            <!-- Comments -->
            <CommentsShow :comments="task.comments" />
          </v-col>

          <!-- Right Column -->
          <v-col :class="$style.rightCol">
            <div>
              <!-- Tags -->
              <template>
                <v-app-bar dense flat>
                  <h3>Tags</h3>
                  <v-spacer />
                  <Tags @addTag="addTag" />
                </v-app-bar>

                <v-btn
                  v-for="tag in task.tags"
                  :key="task.tags.indexOf(tag)"
                  @click="removeTag(tag)"
                  :class="$style.tag"
                  :color="tag.color"
                  small
                  rounded
                  >{{ tag.value }}</v-btn
                >
              </template>
            </div>
            <br />
            <!-- CreateComment -->
            <CreateComment :user="user" :task="task" />
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Tags from '@/pages/TagsShowDialog'
import TodoList from '@/pages/TodoList'

import CreateComment from '@/components/creational/CommentCreate'

import EditableTask from '@/components/transformers/EditableTask'
import Menu from '@/components/transformers/OptionsMenuTaskNavbar'

import BaseText from '@/components/dummy/BaseTextLongTask'
import CommentsShow from '@/components/dummy/CommentsShow'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Menu,
    Tags,
    CommentsShow,
    TodoList,
    CreateComment,
    BaseText,
    EditableTask,
  },
  props: {
    dialogProp: {
      type: Boolean,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      edit: false,
    }
  },
  computed: {
    dialog() {
      return this.dialogProp
    },
    user() {
      return this.authUser()
    },
    assignedUser() {
      return this.task.assignedUser ? this.task.assignedUser.name : false
    },

    navbarColor() {
      const colors = {
        Inbox: 'orange',
        'To do': 'red',
        'In Progress': 'blue',
        Done: 'green',
      }
      return colors[this.task.status]
    },
  },

  methods: {
    close() {
      this.$emit('close')
    },

    toggleEditable() {
      this.edit = !this.edit
    },

    addTag(tag) {
      const task = this.task

      if (!task.tags.find((t) => t.value === tag.value)) {
        task.tags.push(tag)

        const taskId = this.task._key

        this.updateTask({ task, taskId })
      }
    },
    removeTag(tag) {
      const taskId = this.task._key

      this.task.tags.splice(this.task.tags.indexOf(tag), 1)
      this.updateTask({ task: this.task, taskId })
    },

    ...mapActions('tasks', ['updateTask']),
    ...mapGetters('auth', ['authUser']),
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
.userHeading{
  margin-left: 20px;
}
</style>

