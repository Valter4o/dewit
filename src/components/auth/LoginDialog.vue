<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn rounded color="primary" dark v-on="on">
        Login
        <LoginVariant />
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Login to your account</span>
      </v-card-title>
      <v-form>
        <v-container>
          <v-col cols="12" md="10">
            <v-text-field v-model="form.email" label="E-mail" required>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="10">
            <v-text-field
              type="password"
              v-model="form.password"
              label="Password"
              required
            ></v-text-field>
          </v-col>
        </v-container>

        <v-card-text>
          Login with?
          <v-btn rounded color="green" @click="authWithGoogle">
            Google
          </v-btn>
        </v-card-text>

        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="login">Login</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import LoginVariant from 'vue-material-design-icons/LoginVariant'
import { mapActions } from 'vuex'

export default {
  components: {
    LoginVariant,
  },
  data: () => ({
    dialog: false,
    form: {
      username: '',
      email: '',
      password: '',
    },
  }),

  methods: {
    login() {
      const { email, password } = this.form
      this.signInWithEmailAndPassword({ email, password }).then((user) => {
        this.dialog = false
      })
    },
    authWithGoogle() {
      this.authWithGoogle({ register: false }).then(() => {
        this.dialog = false
      })
    },
    ...mapActions('auth', [
      'signInWithEmailAndPassword',
      'fetchAuthUser',
      'authWithGoogle',
    ]),
  },
}
</script>
