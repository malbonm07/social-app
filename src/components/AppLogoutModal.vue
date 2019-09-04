<template>
  <div>
    <!--------------------- LOGOUT BUTTON ----------------------->
    <v-btn @click.stop="dialog = true" fab small elevation="0" color="#32BCC3" dark>
      <v-icon>{{svg.logout}}</v-icon>
    </v-btn>
    <!--------------------- END LOGOUT BUTTON ----------------------->

    <v-dialog v-model="dialog" max-width="290" >
      <v-card>
        <v-card-title class="headline"></v-card-title>

        <v-card-text>
            Are you sure you want to log out?
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="cyan darken-1" text @click="dialog = false" >
            No
          </v-btn>
          <v-btn color="cyan darken-1" text @click="logout" >
            Yes
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

