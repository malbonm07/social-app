<template>
  <div v-if="scream" max-height="800" max-width="800" class="mx-auto pa-3">
    <v-row>
      <v-col offset="1" cols="10" offset-sm="0" sm="3">
        <v-img class="card-img" :src="scream.userImage"></v-img>
      </v-col>
      <v-col cols="12" sm="8">
          <div>
            <v-row>
                <v-col cols="12">
                    <h3 class="title">{{scream.userHandle}}</h3>
                    <p class="font-weight-light grey--text text--darken-1 body-2">{{scream.createdAt | day}}</p>
                </v-col>
                <v-col class="text-left" cols="12">
                    <div class="font-weight-regular text-truncate">
                        {{scream.body}}
                    </div>
                </v-col>
                <v-col cols="12">
                    <v-card-actions>
                    <v-btn text @click="likeScream">
                        <v-icon left v-if="isLiked">{{svg.heart}}</v-icon>
                        <v-icon left v-else>{{svg.heartOut}}</v-icon>
                        {{scream.likeCount}} Likes
                    </v-btn>
                    <v-btn text>
                        <v-icon left>{{svg.omment}}</v-icon>
                        Comments</v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
          </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { mapGetters } from 'vuex';

import { mdiCommentMultipleOutline } from '@mdi/js';
import { mdiHeartOutline } from '@mdi/js';
import { mdiHeart } from '@mdi/js';

export default {
    props: {
        scream: {
            type: Object,
            required: true
        }
    },
    data: () => ({
      svg: {
        comment: mdiCommentMultipleOutline,
        heart: mdiHeart,
        heartOut: mdiHeartOutline
      }
    }),
    methods: {
      likeScream() {
        if(this.isAuthenticated && this.scream) {
          if(!this.isLiked) {
            this.$store.dispatch('LIKE_SCREAM', this.scream.screamId)
          }
          else {
            this.$store.dispatch('UNLIKE_SCREAM', this.scream.screamId)
          }
        }
        else {
          this.$router.push({name: 'login'});
        }
      }
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'userLikes']),
        isLiked() {
          if(this.isAuthenticated && this.userLikes) {
            let findScreamLiked = this.userLikes.findIndex(scream => scream.screamId === this.scream.screamId)
            return findScreamLiked >= 0 ? true : false;
          }
          return false;
        }
    }
}
</script>
