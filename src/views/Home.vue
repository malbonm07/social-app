<template>
  <v-container fluid pa-3>
    <v-row>
      <v-col cols="12" sm="7">
        <v-card class="mb-5" v-for="scream in screamList" :key="scream.screamId">
          <AppScreamContentLoader v-if="loadingUI"></AppScreamContentLoader>
          <Scream v-if="!loadingUI" :scream="scream"></Scream>
        </v-card>
      </v-col>
      <v-col  cols="12" sm="4" class="ml-5">
        <v-card min-height="300">
          <AppPerfilContentLoader v-if="loadingUI"></AppPerfilContentLoader>
          <AppProfile v-if="!loadingUI" :data="userCredentials"></AppProfile>
          <AppDisabledProfile></AppDisabledProfile>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// COMPONENTS
import AppPerfilContentLoader from '@/components/Loaders/AppPerfilLoader.vue';
import AppScreamContentLoader from '@/components/Loaders/AppScreamLoader.vue';
import AppProfile from '@/components/Profile/AppProfile.vue';
import AppDisabledProfile from '@/components/Profile/AppDisabledProfile.vue';
import Scream from '@/components/Scream/AppScreamCard.vue';

//VUEX
import { mapState, mapGetters } from 'vuex';

export default {
  components: {
    Scream,
    AppProfile,
    AppDisabledProfile,
    AppPerfilContentLoader,
    AppScreamContentLoader,
  },
  computed: {
    ...mapState(["screams", "status"]),
    ...mapGetters(["userCredentials", 'screamList', 'loadingUI', ])
  }
};
</script>

