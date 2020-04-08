<template>
  <div>
    <v-dialog v-model="dialog" max-width="60%" persistent>
      <v-card width="98%">
        <Navbar
          @close="close"
          @edit="changeEditable"
          :task="task"
          :color="navbarColor"
        />
        <br />

        <v-row>
          <v-col :class="$style.leftCol">
            <template v-if="edit">
              <v-text-field v-model="task.title" flat> </v-text-field>

              <br />
              <v-text-field v-model="task.description" flat dense>
              </v-text-field>
              <v-btn rounded color="red" @click="changeEditable">
                Cancel
              </v-btn>
              <v-btn rounded color="green" @click="editTask"> Submit </v-btn>
            </template>

            <template v-else>
              <h3>{{ task.title }}</h3>
              <br />
              <p>
                {{ task.description }}
              </p>
              <h4 v-if="dueDate">Due Date:{{ dueDate }}</h4>
            </template>
            <br />
            <TodoList :id="task.todoGroup" />
            <br />
            <h3>Comments:</h3>
            <v-card class="mx-auto" max-width="344">
              <Comment
                v-for="comment in task.comments"
                :key="comment.author"
                :comment="comment"
              />
            </v-card>
          </v-col>

          <v-col>
            <div>
              <v-app-bar dense flat color="white">
                <h3>Tags</h3>
                <v-spacer />
                <Tags @addTag="addTag" />
              </v-app-bar>
              <v-btn
                :class="$style.tag"
                small
                rounded
                v-for="tag in task.tags"
                :color="tag.color"
                :key="task.tags.indexOf(tag)"
                @click="removeTag(tag)"
                >{{ tag.value }}</v-btn
              >
            </div>
            <br />

            <div>
              <h4>Add Comment</h4>
              <br />
              <v-textarea outlined v-model="newComment" label="Add Comment">
              </v-textarea>
              <v-btn rounded color="red" @click="addComment">
                Comment
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Tags from '@/components/TagsShowDialog'
import Comment from '@/components/TaskComment'
import TodoList from '@/components/TodoList'
import Navbar from '@/components/LongTaskDialogNavbar'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Navbar,
    Tags,
    Comment,
    TodoList,
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
      newComment: '',
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
    dueDate() {
      return this.task.dueDate ? this.task.dueDate : false
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
    changeEditable() {
      this.edit = !this.edit
    },
    editTask() {
      const taskId = this.task._key

      this.updateTask({ task: this.task, taskId })
      this.edit = false
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

    addComment() {
      if (this.newComment) {
        const name = this.user.username ? this.user.username : this.user.email

        const taskId = this.task._key
        const newComment = {
          text: this.newComment,
          name,
          commentTime: Date.now(),
        }
        this.task.comments.unshift(newComment)
        this.updateTask({ task: this.task, taskId })
        this.newComment = ''
      }
    },
    ...mapActions('tasks', ['updateTask']),
    ...mapActions('tasker', ['updateTodoGroupsArray']),
    ...mapActions('todoGroups', ['deleteTodoGroup']),
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
</style>
