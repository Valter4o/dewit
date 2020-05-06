<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="teal">
        <strong class="subheading">Stay connected !</strong>

        <v-spacer></v-spacer>

        <a href="https://www.facebook.com/profile.php?id=100001093678046">
          <v-btn class="mx-4" dark icon>
            <Facebook />
          </v-btn>
        </a>

        <a href="https://github.com/Valter4o/dewit">
          <v-btn class="mx-4" dark icon>
            <GithubCircle />
          </v-btn>
        </a>

        <a href="https://twitter.com/MsValter2001">
          <v-btn class="mx-4" dark icon>
            <TwitterCircle />
          </v-btn>
        </a>

        <a href="https://www.instagram.com/valter4o/">
          <v-btn class="mx-4" dark icon>
            <Instagram />
          </v-btn>
        </a>

        <a href="https://www.linkedin.com/in/valentin-tashkov-55a268185/">
          <v-btn class="mx-4" dark icon>
            <Linkedin />
          </v-btn>
        </a>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>DEWIT</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import Facebook from 'vue-material-design-icons/Facebook'
import GithubCircle from 'vue-material-design-icons/Github'
import TwitterCircle from 'vue-material-design-icons/Twitter'
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
