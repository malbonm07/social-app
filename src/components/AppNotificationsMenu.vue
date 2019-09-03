<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
        <template v-slot:activator="{ on }">
            <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn v-if="isAuthenticated" color="relative indigo" small fab v-on="{...on, ...tooltip}" >    
                  <v-icon>{{svg.bell}}</v-icon>
                  <div v-if="unreadNotifications" class="badge-notification"></div>
              </v-btn>
            </template>
            <span>Notifications</span>
            </v-tooltip>
        </template>

      <v-card>
        <v-list v-for="(notification, i) in userNotifications" :key="i">
          <AppNotificationItem :data="notification"></AppNotificationItem>
        </v-list>
        <v-divider></v-divider>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
// COMPONENTS
import AppNotificationItem from '@/components/AppNotificationItem.vue';

// VUEX
import { mapGetters } from 'vuex';

// SVG ICONS
import { mdiBellOutline } from '@mdi/js';

export default {
  components:{
    AppNotificationItem
  },
  data: () => ({
      menu: false,
      svg: {
          bell: mdiBellOutline,
      },
  }),
  computed: {
      ...mapGetters(['userNotifications', 'unreadNotifications', 'isAuthenticated']),
  }
}
</script>

<style>
.badge-notification {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: red;
  position: absolute;
  top: -3px;
  right: 8px;
}
</style>
