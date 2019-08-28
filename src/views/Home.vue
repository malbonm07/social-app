<template>
  <v-container fluid pa-3>
    <v-row no-gutters>
      <v-col cols="12" sm="8">
        <Scream v-for="scream in screams" :key="scream.screamId" :scream="scream"></Scream>
      </v-col>
      <v-col cols="12" sm="4">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

import Scream from '@/components/AppScreamCard.vue';

export default {
  components: {
    Scream
  },
  computed: {
    ...mapState(["screams"])
  }
};
</script>
