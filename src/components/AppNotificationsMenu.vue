<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >

        <template v-slot:activator="{ on }">
            <v-tooltip bottom v-if="userNotifications">
            <template v-slot:activator="{ on: tooltip }">
                <v-badge overlap>
                <template v-slot:badge>{{userNotifications.length}}</template>
                    <v-btn color="indigo" small fab v-on="{...on, ...tooltip}" >    
                        <v-icon>{{svg.bell}}</v-icon>
                    </v-btn>
                </v-badge>    
            </template>
            <span>Notifications</span>
            </v-tooltip>
        </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>John Leider</v-list-item-title>
              <v-list-item-subtitle>Founder of Vuetify.js</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                :class="fav ? 'red--text' : ''"
                icon
                @click="fav = !fav"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
           <v-divider></v-divider>
            <v-card-actions>
           <v-btn @click="takeUrl('sucuki')">
               encontrar
           </v-btn>
            </v-card-actions>
        </v-list>

        <v-divider></v-divider>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
// VUEX
import { mapGetters } from 'vuex';

// SVG ICONS
import { mdiBellOutline } from '@mdi/js';

export default {
    data: () => ({
        fav: true,
        menu: false,
        message: false,
        hints: true,
        svg: {
            bell: mdiBellOutline
        }
    }),
    methods: {
        takeUrl(name) {
            let array = this.$store.state.screams.filter(scream => {
                return scream.userHandle === name
            })
            console.log(array[0].userImage)
            return array[0].userImage
        }
    },
    filters: {
        
    },
    computed: {
        ...mapGetters(['userNotifications']),
    }
}
</script>

<style>

</style>
