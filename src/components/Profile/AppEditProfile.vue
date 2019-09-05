<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <!-------------------------  EDIT PROFILE BUTTON ------------------>
        <template v-slot:activator="{ on }">
            <v-btn color="#32BCC3" v-on="on" elevation="0" dark>
                <v-icon left>{{svg.pencil}}</v-icon>
                Edit Profile
            </v-btn>
        </template>
        <!-------------------------  END EDIT PROFILEBUTTON  ------------------>

      <v-card>
        <v-card-title class="primario white--text">
          Edit your profile
        </v-card-title>

        <!-------------------------  EDIT FORM COMPONENT ------------------->
        <AppEditForm :data="data" @click="dialog = false"></AppEditForm>
        <!-------------------------  END EDIT FORM COMPONENT ----------------->

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