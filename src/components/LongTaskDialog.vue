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
          </v-list>
        </v-menu>

        <v-btn @click="close" rounded>
          X
        </v-btn>
      </v-app-bar>

      <br />

      <v-row>
        <v-col :class="$style.leftCol">
          <h3>Pesho dava sledniq task</h3>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

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
              v-for="i in 40"
              :key="i"
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-avatar color="indigo" size="35">
                      <img
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                        alt="John"
                      />
                    </v-avatar>
                    Headline 5</v-list-item-title
                  >
                  <v-list-item-subtitle>
                    <h4>
                      Greyhound divisely hello coldly fonwderfully
                    </h4>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </div>
        </v-col>

        <v-col>
          <div>
            <v-app-bar dense flat color="white">
              <h3>Tags</h3>
              <v-spacer />
              <v-btn rounded @click="changeTagsShow">+</v-btn>
              <Tags :tagsDialogProp="tagDialog" @closeTags="changeTagsShow" />
            </v-app-bar>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
            <v-btn :class="$style.tag" small rounded>Demo tag</v-btn>
          </div>
          <br />

          <div>
            <h4>Add Comment</h4>
            <br />
            <v-textarea outlined v-model="newComment" label="Add Comment">
            </v-textarea>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import Tags from '@/components/TagsShowDialog'
import ViewComfy from 'vue-material-design-icons/ViewComfy'
import AccountArrowRight from 'vue-material-design-icons/AccountArrowRight'
import DeleteForever from 'vue-material-design-icons/DeleteForever'
import ShieldCheck from 'vue-material-design-icons/ShieldCheck'

export default {
  components: {
    ViewComfy,
    AccountArrowRight,
    DeleteForever,
    ShieldCheck,
    Tags,
  },
  props: {
    dialogProp: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      tagDialog: false,
      newComment: '',
    }
  },
  computed: {
    dialog() {
      return this.dialogProp
    },
  },

  methods: {
    close() {
      this.$emit('close')
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
      console.log('hi')
    },

    changeTagsShow() {
      this.tagDialog = !this.tagDialog
    },
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
