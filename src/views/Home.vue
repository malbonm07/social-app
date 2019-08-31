<template>
  <v-container fluid pa-3>
    <v-row no-gutters>
      <v-col cols="12" sm="7">
        <v-card class="mb-5" v-for="scream in screams" :key="scream.screamId">
          <AppScreamContentLoader v-if="status === 'loading'"></AppScreamContentLoader>
          <Scream v-if="status !== 'loading'" :scream="scream"></Scream>
        </v-card>
      </v-col>
      <v-col  cols="12" sm="4" class="ml-5">
        <v-card min-height="300">
          <AppPerfilContentLoader v-if="status === 'loading'"></AppPerfilContentLoader>
          <AppProfile v-if="status !== 'loading'" :data="userCredentials"></AppProfile>
          <AppDisabledProfile v-if="status !== 'loading'"></AppDisabledProfile>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppPerfilContentLoader from '@/components/contentLoaders/AppPerfilLoader.vue';
import AppScreamContentLoader from '@/components/contentLoaders/AppScreamLoader.vue';
import AppProfile from '@/components/AppProfile.vue';
import AppPanel from '@/components/AppPanel.vue';
import AppDisabledProfile from '@/components/AppDisabledProfile.vue';
import { mapState, mapGetters } from 'vuex';

import Scream from '@/components/AppScreamCard.vue';

export default {
  components: {
    Scream,
    AppPanel,
    AppProfile,
    AppDisabledProfile,
    AppPerfilContentLoader,
    AppScreamContentLoader
  },
  computed: {
    ...mapState(["screams", "status"]),
    ...mapGetters(["userCredentials"])
  }
};
</script>

<style>
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

