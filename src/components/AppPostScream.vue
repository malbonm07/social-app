<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" fab small>
                <v-icon>{{svg.pencil}}</v-icon>
            </v-btn>
        </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <AppPostForm @click="dialog = false"></AppPostForm>
      </v-card>
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
      svg: {
          pencil: mdiPencilRemoveOutline
      }
  })
}
</script>