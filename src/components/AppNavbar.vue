<template>
    <v-app-bar app>
        <v-toolbar-title class="headline text-uppercase">
            <span>SOCIAL</span>
            <span class="font-weight-light">APPLICATION</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        
        <AppPostScream v-if="isAuthenticated"></AppPostScream>

        <v-btn v-if="isAuthenticated" text exact fab class="mr-2">
            <v-icon>{{svg.bell}}</v-icon>
        </v-btn>

        <v-btn text exact to="/" class="mr-2">
            <v-icon left>{{svg.home}}</v-icon>
            <span>Home</span>
        </v-btn>

        <v-btn v-if="isAuthenticated" text exact @click="logout">
            <v-icon left>{{svg.exit}}</v-icon>
            <span>Logout</span>
        </v-btn>

        <div v-if="!isAuthenticated">
            <v-btn text exact to="/login">
                <v-icon left>{{svg.login}}</v-icon>
                <span class="mr-2">Login</span>
            </v-btn>
            
            <v-btn text exact to="/signup">
                <v-icon left>{{svg.logout}}</v-icon>
                <span class="mr-2">SignUp</span>
            </v-btn>
        </div>
    </v-app-bar>
</template>

<script>
// COMPONENTS
import AppPostScream from '@/components/AppPostScream.vue';

//VUEX
import { mapGetters } from 'vuex';

//SVG ICONS
import { mdiAccountPlusOutline, mdiHome, mdiLogin, mdiLogout, mdiExitToApp, mdiFeather, mdiBellOutline, mdiBellPlusOutline, mdiBellPlus  } from '@mdi/js';

export default {
    components: {
        AppPostScream
    },
    data: () => ({
        svg: {
            home: mdiHome,
            login: mdiLogin,
            logout: mdiAccountPlusOutline,
            exit: mdiExitToApp,
            bell: mdiBellOutline
        }
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
