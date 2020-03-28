<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="teal">
        <strong class="subheading">Stay connected !</strong>

        <v-spacer></v-spacer>

        <v-btn class="mx-4" dark icon>
          <Facebook />
        </v-btn>
        <v-btn class="mx-4" dark icon>
          <GithubCircle />
        </v-btn>
        <v-btn class="mx-4" dark icon>
          <TwitterCircle />
        </v-btn>
        <v-btn class="mx-4" dark icon>
          <Instagram />
        </v-btn>
        <v-btn class="mx-4" dark icon>
          <Linkedin />
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>DEWIT</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import Facebook from 'vue-material-design-icons/Facebook'
import GithubCircle from 'vue-material-design-icons/GithubCircle'
import TwitterCircle from 'vue-material-design-icons/TwitterCircle'
import Instagram from 'vue-material-design-icons/Instagram'
import Linkedin from 'vue-material-design-icons/Linkedin'

export default {
  components: {
    Facebook,
    GithubCircle,
    TwitterCircle,
    Instagram,
    Linkedin,
  },
}
</script>
