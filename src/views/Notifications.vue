<template>
    <v-container>
        <v-row>
            <v-col cols="12" offset-sm="3" sm="6">
                <template>
                <v-card class="mx-auto" max-width="300" tile >
                    <v-subheader>NOTIFICATIONS</v-subheader>
                    <!--------------------- NOTIFICATION LIST --------------------->
                    <v-list v-if="!userNotifications">
                        <v-list-item>
                            There aren't any new notifications
                        </v-list-item>

                    </v-list>
                    <v-list rounded v-for="(notification, i) in userNotifications" :key="i">
                        <!------------------- NOTIFICATION ITEM ------------------>
                        <AppNotificationItem :data="notification"></AppNotificationItem>
                        <!------------------- END NOTIFICATION ITEM ------------------>
                    </v-list>
                    <!--------------------- END NOTIFICATION LIST --------------------->
                </v-card>
                </template>
            </v-col>
        </v-row>        
    </v-container>
</template>

<script>
// COMPONENTS
import AppNotificationItem from '@/components/Notifications/AppNotificationItem.vue';

// VUEX
import { mapGetters } from 'vuex';
export default {
    components: {
        AppNotificationItem
    },
    data: () => ({
        item: 1,
        items: [
            { text: 'Real-Time', icon: 'mdi-clock' },
            { text: 'Audience', icon: 'mdi-account' },
            { text: 'Conversions', icon: 'mdi-flag' },
        ],
    }),
    computed: {
        ...mapGetters(['userNotifications'])
        }
    }
</script>
