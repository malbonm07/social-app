<template>
  <div>
    <v-btn
      color="primary"
      dark
      small
      absolute
      right
      bottom
      @click.stop="dialog = true"
    >
      <v-icon left>{{svg.delete}}</v-icon>
      Delete
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Scream Action</v-card-title>

        <v-card-text>
            Are you sure you want to delete this post?
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
            :disabled="loadingUser"
          >
            No
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="handleDeleteScream"
            :loading="loadingUser"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { mdiDeleteOutline } from '@mdi/js';
import { mdiDelete } from '@mdi/js';

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
