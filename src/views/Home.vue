<template>
  <v-container fluid pa-3>
    <v-row no-gutters>
      <v-col cols="12" sm="7">
        <Scream v-for="scream in screams" :key="scream.screamId" :scream="scream"></Scream>
      </v-col>
      <v-col v-if="userCredentials" cols="12" sm="4" class="ml-5">
        <AppProfile :data="userCredentials"></AppProfile>
      </v-col>
      <v-col v-else cols="12" sm="4">
        <AppPanel>
          <div class="subtitle-1 text-center mb-5">
            <div>Don't have an account?</div> 
            <router-link to="/signup">Sign Up Here</router-link>
          </div>
          <div class="subtitle-1 text-center">
            <div>Already have an account?</div>
            <router-link to="/login">Sign In Here</router-link>
          </div>
        </AppPanel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppProfile from '@/components/AppProfile.vue';
import AppPanel from '@/components/AppPanel.vue';
import { mapState, mapGetters } from 'vuex';

import Scream from '@/components/AppScreamCard.vue';

export default {
  components: {
    Scream,
    AppPanel,
    AppProfile
  },
  computed: {
    ...mapState(["screams"]),
    ...mapGetters(["userCredentials"])
  }
};
</script>
