<template>
  <v-dialog
    v-model="dialog"
    max-width="60%"
    persistent
    overlay-opacity="0"
    hide-overlay
  >
    <v-card>
      <v-app-bar>
        <v-btn fab small>
          A
        </v-btn>

        <h4 :class="$style.userHeading">
          Unnasiggned
        </h4>
        <v-spacer />

        <v-menu transition="slide-y-transition" bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="purple" color="primary" rounded dark v-on="on">
              <ViewComfy />
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="asign">
              <v-btn fab small color="orange">
                <AccountArrowRight />
              </v-btn>

              <v-list-item-title :class="$style.menuTitle"
                >Asign to</v-list-item-title
              >
            </v-list-item>

            <v-list-item @click="deleteTask">
              <v-btn fab small color="red">
                <DeleteForever />
              </v-btn>

              <v-list-item-title :class="$style.menuTitle">
                Delete Task
              </v-list-item-title>
            </v-list-item>

            <v-list-item @click="complete">
              <v-btn fab small color="green">
                <ShieldCheck />
              </v-btn>

              <v-list-item-title :class="$style.menuTitle"
                >Complete</v-list-item-title
              >
            </v-list-item>

            <v-list-item @click="changeEditable">
              <v-btn fab small color="blue">
                <SquareEditOutline />
              </v-btn>

              <v-list-item-title :class="$style.menuTitle"
                >Edit</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn @click="close" rounded>
          X
        </v-btn>
      </v-app-bar>

      <br />

      <v-row>
        <v-col :class="$style.leftCol">
          <template v-if="edit">
            <v-text-field v-model="task.title" flat> </v-text-field>

            <br />
            <v-text-field v-model="task.description" flat dense> </v-text-field>
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
          </template>

          <v-btn rounded color="blue" @click="redirectToTodoList">
            Go to the todolist for this task
          </v-btn>
          <br />
          <div>
            <h3>Comments</h3>
            <v-card
              outlined
              class="mx-auto"
              max-width="344"
              v-for="comment in task.comments"
              :key="comment.author"
            >
              <Comment :comment="comment" />
            </v-card>
          </div>
        </v-col>

        <v-col>
          <div>
            <v-app-bar dense flat color="white">
              <h3>Tags</h3>
              <v-spacer />
              <v-btn rounded @click="changeTagsShow">+</v-btn>
              <Tags
                :tagsDialogProp="tagDialog"
                @closeTags="changeTagsShow"
                @addTag="addTag"
              />
            </v-app-bar>
            <v-btn
              :class="$style.tag"
              small
              rounded
              v-for="tag in task.tags"
              :color="tag.color"
              :key="task.tags.indexOf(tag)"
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
</template>

<script>
import Tags from '@/components/TagsShowDialog'
import Comment from '@/components/TaskComment'
import ViewComfy from 'vue-material-design-icons/ViewComfy'
import AccountArrowRight from 'vue-material-design-icons/AccountArrowRight'
import DeleteForever from 'vue-material-design-icons/DeleteForever'
import ShieldCheck from 'vue-material-design-icons/ShieldCheck'
import SquareEditOutline from 'vue-material-design-icons/SquareEditOutline'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    ViewComfy,
    AccountArrowRight,
    DeleteForever,
    ShieldCheck,
    Tags,
    SquareEditOutline,
    Comment,
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
      tagDialog: false,
      newComment: '',
      edit: false,
    }
  },
  computed: {
    dialog() {
      return this.dialogProp
    },
    user() {
      return this.authUser
    },
  },

  methods: {
    close() {
      this.$emit('close')
    },
    addTag(tag) {
      const task = this.task
      task.tags.push(tag)

      const projectId = this.$router.currentRoute.params.id

      this.updateTask({ task, projectId })

      this.changeTagsShow()
    },

    changeEditable() {
      this.edit = !this.edit
    },

    editTask() {
      const projectId = this.$router.currentRoute.params.id
      this.updateTask({ task: this.task, projectId })
      this.edit = false
    },
    addComment() {
      if (this.newComment) {
        const projectId = this.$router.currentRoute.params.id
        const newComment = {
          avatarUrl: this.user.avatarUrl ? this.user.avatarUrl : null,
          author: this.user._key ? this.user._key : null,
          text: this.newComment,
          name: this.user.username ? this.user.username : null,
          commentTime: Date.now(),
        }
        this.task.comments.unshift(newComment)
        this.updateTask({ task: this.task, projectId })
        this.newComment = ''
      }
    },
    asign() {
      //Todo
      console.log('asign')
    },
    deleteTask() {
      //Todo
      console.log('delete')
    },
    complete() {
      //Todo
      console.log('complete')
    },
    redirectToTodoList() {
      //Todo
    },

    changeTagsShow() {
      this.tagDialog = !this.tagDialog
    },
    ...mapActions('tasker', ['updateTask']),
    ...mapGetters('auth', ['authUser']),
  },
}
</script>

<style module>
.leftCol,
.userHeading,
.menuTitle {
  margin-left: 20px;
}

.tag {
  margin: 5px;
}
</style>
