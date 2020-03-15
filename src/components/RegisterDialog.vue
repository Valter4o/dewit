<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn rounded color="primary" dark v-on="on">
        Register
        <AccountPlus />
      </v-btn>
    </template>
    <v-card class="text-center">
      <v-card-title>
        <span class="headline">Register to Dewit</span>
      </v-card-title>
      <v-form lazy-validation>
        <v-container>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.username"
              :rules="usernameRules"
              label="Username"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              type="password"
              v-model="form.password"
              :rules="passwordRules"
              label="Password"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              type="password"
              v-model="form.repassword"
              :rules="rePasswordRules"
              label="Repeat Password"
              required
            ></v-text-field>
          </v-col>
        </v-container>
      </v-form>

      <v-card-text>
        Register with?
        <v-btn rounded color="green" @click="authWithGoogle">
          Google
        </v-btn>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="register">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AccountPlus from 'vue-material-design-icons/AccountPlus'
import { mapActions } from 'vuex'

export default {
  components: {
    AccountPlus,
  },
  data() {
    return {
      dialog: false,
      form: {
        username: '',
        email: '',
        password: '',
        repassword: '',
      },
      usernameRules: [
        () => !!this.form.username || 'Username is required',
        () =>
          this.form.username.length >= 5 ||
          'Username must be more than 5 characters',
      ],
      emailRules: [
        () => !!this.form.email || 'E-mail is required',
        () => /.+@.+/.test(this.form.email) || 'E-mail must be valid',
      ],
      passwordRules: [
        () => !!this.form.password || 'Password is required',
        () =>
          this.form.password.length >= 5 ||
          'Password must be more than 5 characters',
      ],
      rePasswordRules: [
        () => !!this.form.repassword || 'Repeat Password is required',
        () =>
          this.form.password === this.form.password || 'Passwords must match',
      ],
    }
  },

  methods: {
    register() {
      this.registerUserWithEmailAndPassword({
        username: this.form.username,
        email: this.form.email,
        password: this.form.password,
      }).then(() => {
        this.dialog = false
      })
    },
    authWithGoogle() {},
    ...mapActions('auth', ['registerUserWithEmailAndPassword']),
  },
}
</script>
