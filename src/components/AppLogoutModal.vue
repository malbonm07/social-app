<template>
  <div>
    <!--------------------- LOGOUT BUTTON ----------------------->
    <v-btn color="primary" dark @click.stop="dialog = true" >
      <v-icon left>{{svg.logout}}</v-icon>
      Logout
    </v-btn>
    <!--------------------- END LOGOUT BUTTON ----------------------->

    <v-dialog v-model="dialog" max-width="290" >
      <v-card>
        <v-card-title class="headline">Scream Action</v-card-title>

        <v-card-text>
            Are you sure you want to log out?
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="green darken-1" text @click="dialog = false" >
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="logout" >
            Agree
          </v-btn>
        </v-card-actions>
        
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// VUEX
import { mapGetters } from 'vuex';

// SVG ICONS
import { mdiExitToApp } from '@mdi/js';

export default {
  props: {
    scream: {
      type: Object
    }
  },
  data () {
    return {
      dialog: false,
      svg: {
        logout: mdiExitToApp,
      }
    }
  },
  methods: {
      logout() {
          this.$store.dispatch('LOGOUT_USER')
          .then(() => {
            this.dialog = false
            this.$router.push('/login')
          })
      }
  },
  computed: {
    ...mapGetters(['loadingUser'])
  }
}
</script>

