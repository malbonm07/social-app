<template>
    <v-app-bar app>

        <!--------------------------- NAVBAR TITLE ---------------------------->
        <v-toolbar-title class="headline text-uppercase">
            <span>SOCIAL</span>
            <span class="font-weight-light">APPLICATION</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!--------------------------- END NAVBAR TITLE ---------------------------->
        

        <!--------------------------- POST BUTTON/MODAL ---------------------------->
        <AppPostScream v-if="isAuthenticated"></AppPostScream>
        <!--------------------------- END POST BUTTON/MODAL ---------------------------->


        <!--------------------------- NOTIFICATIONS BUTTON ---------------------------->
        <AppNotificationsMenu v-if="isAuthenticated" class="mr-2 ml-2"></AppNotificationsMenu>
        <!--------------------------- END NOTIFICATIONS BUTTON ---------------------------->


        <!--------------------------- HOME BUTTON ---------------------------->
        <v-btn text exact to="/" class="mr-2">
            <v-icon left>{{svg.home}}</v-icon>
            <span>Home</span>
        </v-btn>
        <!--------------------------- END HOME BUTTON ---------------------------->


        <!--------------------------- LOGOUT BUTTON MODAL ---------------------------->
        <AppLogoutModal v-if="isAuthenticated"></AppLogoutModal>
        <!--------------------------- END LOGOUT BUTTON MODAL ---------------------------->


        <!--------------------------- LOGIN/SIGNUP BUTTONS ---------------------------->
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
        <!--------------------------- END LOGIN/SIGNUP BUTTONS ---------------------------->

    </v-app-bar>
</template>

<script>
// COMPONENTS
import AppPostScream from '@/components/AppPostScream.vue';
import AppLogoutModal from '@/components/AppLogoutModal.vue';
import AppNotificationsMenu from '@/components/Notifications/AppNotificationsMenu.vue';

//VUEX
import { mapGetters } from 'vuex';

//SVG ICONS
import { mdiAccountPlusOutline, mdiHome, mdiLogin, mdiLogout, mdiExitToApp, mdiFeather, mdiBellOutline, mdiBellPlusOutline, mdiBellPlus  } from '@mdi/js';

export default {
    components: {
        AppPostScream,
        AppLogoutModal,
        AppNotificationsMenu
    },
    data: () => ({
        svg: {
            home: mdiHome,
            login: mdiLogin,
            logout: mdiAccountPlusOutline,
        }
    }),
    computed: {
        ...mapGetters(['isAuthenticated', 'userNotifications'])
    }
}
</script>

<style>

</style>
