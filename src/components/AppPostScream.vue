<template>
  <v-dialog v-model="dialog" persistent max-width="600px">

    <!------------------------ POST BUTTON ----------------------->
    <template v-slot:activator="{ on }">
      <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn v-on="{...on, ...tooltip}" fab small elevation="0" color="2c003e" dark>
                <v-icon>{{svg.pencil}}</v-icon>
            </v-btn>
          </template>
        <span>Post a scream</span>
      </v-tooltip>
    </template>
    <!------------------------ END POST BUTTON ----------------------->


    <!------------------------ POST FORM ----------------------->
    <v-card>
      <v-card-title class="primario white--text">
        Post a scream
      </v-card-title>
      <!------------------------ FORM COMPONENT ----------------------->
      <AppPostForm @click="dialog = false"></AppPostForm>
      <!------------------------ FORM COMPONENT ----------------------->

    </v-card>
    <!------------------------ END POST FORM ----------------------->

  </v-dialog>
</template>

<script>
// COMPONENTS
import AppPostForm from '@/components/AppPostForm.vue';

// SVG ICONS
import { mdiPencil, mdiPencilOutline, mdiPencilRemoveOutline } from '@mdi/js';

export default {
  components: {
    AppPostForm
  },
  data: () => ({
      dialog: false,
      loadingImport: false,
      svg: {
          pencil: mdiPencilRemoveOutline
      }
  })
}
</script>
