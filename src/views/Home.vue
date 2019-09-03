<template>
  <v-container fluid pa-3>
    <v-row>
      <v-col cols="12" sm="7" v-if="screams">
          <v-card class="mb-5" v-for="(scream, i) in screamList" :key="i" dark>
            <AppScreamCard :scream="scream" ></AppScreamCard>
          </v-card>
      </v-col>
      <v-col cols="12" sm="7" v-else>
          <v-card v-for="n in 5" :key="n" class="mb-5">
              <AppScreamContentLoader></AppScreamContentLoader>
          </v-card>
      </v-col>
      <v-col  cols="12" sm="4" class="ml-5">
        <v-card min-height="300" dark>
          <AppPerfilContentLoader v-if="!userCredentials && isAuthenticated"></AppPerfilContentLoader>
          <AppProfile :data="userCredentials"></AppProfile>
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
import AppScreamCard from '@/components/Scream/AppScreamCard.vue';

//VUEX
import { mapState, mapGetters } from 'vuex';

export default {
  components: {
    AppScreamCard,
    AppProfile,
    AppDisabledProfile,
    AppPerfilContentLoader,
    AppScreamContentLoader,
  },
  computed: {
    ...mapState(["screams", "status"]),
    ...mapGetters(["userCredentials", 'screamList', 'loadingUI', 'isAuthenticated'])
  }
};
</script>

