<template>
  <div>
    <v-btn
      color="primary"
      dark
      @click.stop="dialog = true"
    >
      Logout
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Scream Action</v-card-title>

        <v-card-text>
            Are you sure you want to log out?
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="logout"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    scream: {
      type: Object
    }
  },
  data () {
    return {
      dialog: false,
    }
  },
  methods: {
      logout() {
          this.$store.dispatch('LOGOUT_USER')
          .then(() => this.dialog = false)
      }
  },
  computed: {
    ...mapGetters(['loadingUser'])
  }
}
</script>

