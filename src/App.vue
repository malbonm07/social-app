<template>
  <v-app>
    <Navbar></Navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/AppNavbar';
// import Api from './service/Api';

export default {
  name: 'App',
  components: {
    Navbar
  },
  data: () => ({
    // screams: {}
  }),
  mounted() {
    this.$store.dispatch('GET_SCREAMS')
  }
};
</script>

<style lang="scss">
@import './src/assets/main.scss';
</style>


