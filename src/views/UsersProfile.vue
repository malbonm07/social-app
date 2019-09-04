<template>
  <v-container fluid pa-3>
    <v-row>

      <!------------------------ SCREAM LIST ----------------------->
      <v-col cols="12" sm="7" v-if="userData">

          <!------------------------ SCREAM ITEM ----------------------->
          <v-card class="mb-5" v-for="(scream, i) in userScreams" :key="i">
            <AppScreamCard :scream="scream" ></AppScreamCard>
          </v-card>
          <!------------------------ END SCREAM ITEM ----------------------->

      </v-col>
      <v-col cols="12" sm="7" v-else>
          <v-card v-for="n in 5" :key="n" class="mb-5">
              <AppScreamContentLoader></AppScreamContentLoader>
          </v-card>
      </v-col>
      <!------------------------ END SCREAM LIST ----------------------->


      <!------------------------ PROFILE ----------------------->
      <v-col  v-if="userData" cols="12" sm="4" class="">
        <v-card min-height="300">

          <!------------------------ PROFILE CARD ----------------------->
          <AppProfile :data="userData.user"></AppProfile>
          <!------------------------ END PROFILE CARD ----------------------->

        </v-card>
      </v-col>
      <v-col cols="12" sm="4" class="ml-5" v-else>
          <v-card min-height="300" min-width="150">
            <AppPerfilContentLoader></AppPerfilContentLoader>
          </v-card>
      </v-col>
      <!------------------------ END PROFILE ----------------------->

    </v-row>
  </v-container>
</template>

<script>
// API AXIOS
import Api from '@/service/Api';

// COMPONENTS
import AppPerfilContentLoader from '@/components/Loaders/AppPerfilLoader.vue';
import AppScreamContentLoader from '@/components/Loaders/AppScreamLoader.vue';
import AppProfile from '@/components/Profile/AppProfile.vue';
import AppDisabledProfile from '@/components/Profile/AppDisabledProfile.vue';
import AppScreamCard from '@/components/Scream/AppScreamCard.vue';

// VUEX
import { mapGetters } from 'vuex';
import { mapState } from 'vuex'

export default {
    components: {
        AppPerfilContentLoader,
        AppScreamContentLoader,
        AppProfile,
        AppDisabledProfile,
        AppScreamCard
    },
    data: () => ({
        userData: null,
    }),
    created() {
        window.scrollTo(0, 0);
        Api().get(`user/${this.$route.params.handle}`)
        .then((res) => {
            this.userData = res.data
            this.userDataHandle = res.data.user.handle
        })
        .catch((error) => {
            console.log(error)
        })
    },
    computed: {
        ...mapGetters(['loadingUI']),
        userScreams() {
          return this.$store.state.screams.filter(scream => scream.userHandle === this.$route.params.handle
          )
        }
    },
}
</script>
