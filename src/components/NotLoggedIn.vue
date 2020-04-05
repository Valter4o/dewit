<template>
  <div>
    <v-content>
      <section>
        <v-parallax :src="imageLink.main" height="600">
          <v-layout column align-center justify-center class="white--text">
            <h1
              class="dark--text mb-2 display-1 text-xs-center"
              style="font-weight: 900; text-shadow: 3px 2px black"
            >
              Dewit
            </h1>
            <h3
              class="white--text subheading mb-3 text-xs-center"
              style="font-weight: 900; text-shadow: 2px 2px black"
            >
              The only task manager you will ever need in your life
            </h3>
            <Login />
            <br />
            <Register />
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout column wrap class="my-5" align-center>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2"
                        >Public</v-icon
                      >
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">
                        Free for everyone
                      </div>
                    </v-card-title>
                    <v-card-text>
                      Create and manage a project along with all the task that
                      come along without any charge
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2"
                        >Easy to use (maybe)</v-icon
                      >
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Mediocre UI</div>
                    </v-card-title>
                    <v-card-text>
                      Hey I tried to make it look coll but I aint designer (or a
                      skilled developer either)
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2"
                        >Cool</v-icon
                      >
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">
                        It has some cool features
                      </div>
                    </v-card-title>
                    <v-card-text>
                      Imagine managing tasks like no other
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax :src="imageLink.bottom" height="380">
          <div class="headline white--text mb-3 text-xs-center">
            <h1>
              What are you waiting for? REGISTER ALREADY
            </h1>
          </div>
        </v-parallax>
      </section>
    </v-content>
  </div>
</template>

<script>
import Register from '@/components/RegisterDialog'
import Login from '@/components/LoginDialog'

export default {
  components: {
    Register,
    Login,
  },
  data: function() {
    return {
      imageLink: {
        main:
          'https://www.cv-library.co.uk/career-advice/wp-content/uploads/2018/06/What-is-it-like-working-in-IT.jpg',
        bottom:
          'https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fo-NIGHTCLUB-facebook.jpg?alt=media&token=cefc5c4c-9714-41da-9c22-f63caf5e89a4',
      },
    }
  },
}
</script>

<style scoped>
.finedTitle {
  font-weight: 900;
  text-shadow: 2px 2px #000000;
}

.social-icon {
  font-size: 21px;
  color: white;
}
</style>
