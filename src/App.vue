<template>
  <v-app id="app">
    <Navbar></Navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// COMPONENTS
import Navbar from './components/Layout/AppNavbar';

export default {
  name: 'App',
  components: {
    Navbar
  },
  mounted() {
    this.$store.dispatch('GET_SCREAMS')
  }
};
</script>

<style lang="scss">
@import './src/assets/main.scss';
#app {
  background: #d6dfe2;
}
</style>


