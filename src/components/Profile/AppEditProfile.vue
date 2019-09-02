<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">
                <v-icon left>{{svg.pencil}}</v-icon>
                Edit Profile
            </v-btn>
        </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
            <AppEditForm :data="data" @click="dialog = false"></AppEditForm>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
// COMPONENTS
import AppEditForm from '@/components/Profile/AppEditForm.vue'
import AppEditFormVue from './AppEditForm.vue';


// VUEX
import { mdiPencil } from '@mdi/js';
import { mdiPencilOutline } from '@mdi/js';

export default {
  components: {
        AppEditForm
  },
  props: {
      data: {
          type: Object,
          required: true
      }
  },
  data: () => ({
      dialog: false,
      svg: {
          pencil: mdiPencil
      },
  }),
}
</script>