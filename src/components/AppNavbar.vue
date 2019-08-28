<template>
    <v-app-bar app>
        <v-toolbar-title class="headline text-uppercase">
            <span>SOCIAL-</span>
            <span class="font-weight-light">APP</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn text exact to="/">
            <v-icon left>{{svgHome}}</v-icon>
            <span class="mr-2">Home</span>
        </v-btn>

        <v-btn text exact to="/login">
            <v-icon left>{{svgLogin}}</v-icon>
            <span class="mr-2">Login</span>
        </v-btn>
        
        <v-btn text exact to="/signup">
            <v-icon left>{{svgLogout}}</v-icon>
            <span class="mr-2">SignUp</span>
        </v-btn>
    </v-app-bar>
</template>

<script>
import { mdiAccountPlusOutline } from '@mdi/js';
import { mdiHome } from '@mdi/js';
import { mdiLogin } from '@mdi/js';
import { mdiLogout } from '@mdi/js';

export default {
    data: () => ({
        svgHome: mdiHome,
        svgLogin: mdiLogin,
        svgLogout: mdiAccountPlusOutline
    })
}
</script>

<style>

</style>
