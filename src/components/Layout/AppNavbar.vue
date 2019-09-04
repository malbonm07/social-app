<template>
    <v-app-bar app class="primario" elevation="2">

        <!--------------------------- NAVBAR TITLE ---------------------------->
        <v-toolbar-title class="headline text-uppercase hover" @click="$router.push('/')">
            <span>SOCIAL</span>
            <span class="font-weight-light" >APPLICATION</span>
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
        <v-btn exact to="/" class="mr-2" elevation="0" color="#51dacf" fab small>
            <v-icon>{{svg.home}}</v-icon>
        </v-btn>
        <!--------------------------- END HOME BUTTON ---------------------------->


        <!--------------------------- LOGOUT BUTTON MODAL ---------------------------->
        <AppLogoutModal v-if="isAuthenticated"></AppLogoutModal>
        <!--------------------------- END LOGOUT BUTTON MODAL ---------------------------->


        <!--------------------------- LOGIN/SIGNUP BUTTONS ---------------------------->
        <div v-if="!isAuthenticated">
            <v-btn exact to="/login" elevation="0" fab color="#51dacf" small>
                <v-icon>{{svg.login}}</v-icon>
                <!-- <span class="mr-2">Login</span> -->
            </v-btn>
            
            <v-btn exact to="/signup" elevation="0" fab color="#51dacf" small>
                <v-icon>{{svg.logout}}</v-icon>
                <!-- <span class="mr-2">SignUp</span> -->
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
