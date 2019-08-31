<template>
    <v-app-bar app>
        <v-toolbar-title class="headline text-uppercase">
            <span>SOCIAL-</span>
            <span class="font-weight-light">APP</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn text exact to="/" class="mr-2">
            <v-icon left>{{svgHome}}</v-icon>
            <span>Home</span>
        </v-btn>

        <v-btn v-if="isAuthenticated" text exact @click="logout">
            <v-icon left>{{svgExit}}</v-icon>
            <span>Logout</span>
        </v-btn>

        <div v-if="!isAuthenticated">
            <v-btn text exact to="/login">
                <v-icon left>{{svgLogin}}</v-icon>
                <span class="mr-2">Login</span>
            </v-btn>
            
            <v-btn text exact to="/signup">
                <v-icon left>{{svgLogout}}</v-icon>
                <span class="mr-2">SignUp</span>
            </v-btn>
        </div>
    </v-app-bar>
</template>

<script>
//VUEX
import { mapGetters } from 'vuex';

//SVG ICONS
import { mdiAccountPlusOutline } from '@mdi/js';
import { mdiHome } from '@mdi/js';
import { mdiLogin } from '@mdi/js';
import { mdiLogout } from '@mdi/js';
import { mdiExitToApp } from '@mdi/js';
import { mdiFeather } from '@mdi/js';
import { mdiBellOutline } from '@mdi/js';
import { mdiBellPlusOutline } from '@mdi/js';
import { mdiBellPlus } from '@mdi/js';

export default {
    data: () => ({
        svgHome: mdiHome,
        svgLogin: mdiLogin,
        svgLogout: mdiAccountPlusOutline,
        svgExit: mdiExitToApp
    }),
    methods: {
        logout() {
            this.$store.dispatch('LOGOUT_USER')
        }
    },
    computed: {
        ...mapGetters(['isAuthenticated'])
    }
}
</script>

<style>

</style>
