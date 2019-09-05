<template>
  <div>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            elevation="0" small absolute right top fab @click.stop="dialog = true" v-on="on" style="transform: translateY(35px)">
            <v-icon color="red lighten-1">{{svg.delete}}</v-icon>
          </v-btn>
        </template>
      <span>Delete scream</span>
    </v-tooltip>
    
    <v-dialog v-model="dialog" max-width="290" >
      <v-card>
        <v-card-title class="headline"></v-card-title>

        <v-card-text>
            Are you sure you want to delete this scream?
        </v-card-text>

        <!---------------------- ACTIOS BUTTONS -------------------->
        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="cyan darken-1" text @click="dialog = false" 
          :disabled="loadingUser" >
            No
          </v-btn>
          <v-btn color="red darken-1" text @click="handleDeleteScream" :loading="loadingUser" >
            Delete
          </v-btn>
        </v-card-actions>
        <!---------------------- END ACTIOS BUTTONS -------------------->

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { mdiDeleteOutline, mdiDelete } from '@mdi/js';

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
        delete: mdiDeleteOutline
      }
    }
  },
  methods: {
      handleDeleteScream() {
          this.$store.dispatch('DELETE_SCREAM', this.scream.screamId)
          .then(() => {
            this.dialog = false
          })
      }
  },
  computed: {
    ...mapGetters(['loadingUser'])
  }
}
</script>
