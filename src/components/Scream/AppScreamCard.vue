<template>
  <div max-height="800" max-width="800" class="mx-auto pa-3">
    <v-row  v-if="scream">
      <v-col offset="1" cols="10" offset-sm="0" sm="3">
        <v-img class="card-img" :src="scream.userImage"></v-img>
      </v-col>
      <v-col cols="12" sm="8">
        <v-row>
            <v-col cols="12">
                <router-link class="title" :to="`/users/${scream.userHandle}`">{{scream.userHandle}}</router-link>
                <p class="font-weight-light grey--text text--darken-1 body-2">{{scream.createdAt | day}}</p>
            </v-col>
            <v-col class="text-left" cols="12">
                <div class="font-weight-regular text-truncate">
                    {{scream.body}}
                </div>
            </v-col>
            <v-col cols="12" md="8">
                <v-card-actions>
                <v-btn text @click="likeScream(isAuthenticated, scream)" small>
                    <v-icon left v-if="isLiked">{{svg.heart}}</v-icon>
                    <v-icon left v-else>{{svg.heartOut}}</v-icon>
                    {{scream.likeCount}} Likes
                </v-btn>
                
                <AppCommentsModal :data="scream"></AppCommentsModal>
                
                </v-card-actions>
                
            </v-col>
            <v-col cols="12" md="4" class="center" v-if="userCredentials">
              <AppDeleteScream v-show="isAuthenticated && userCredentials.handle === scream.userHandle" :scream="scream"></AppDeleteScream>
            </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// VUEX
import { mapGetters } from 'vuex';

// COMPONENTS
import AppDeleteScream from '@/components/Scream/AppDeleteScream.vue';
import AppCommentsModal from '@/components/Scream/AppCommentsModal.vue';

// SVG ICONS
import { mdiCommentMultipleOutline, mdiHeartOutline, mdiHeart } from '@mdi/js';

// MIXINS
import { likeMethod } from '@/mixins/mixins';
export default {
  components: {
    AppDeleteScream,
    AppCommentsModal
  },
  props: {
      scream: {
          type: Object,
          required: true
      }
  },
  mixins: [likeMethod],
  data: () => ({
    svg: {
      comment: mdiCommentMultipleOutline,
      heart: mdiHeart,
      heartOut: mdiHeartOutline
    }
  }),
  computed: {
      ...mapGetters(['isAuthenticated', 'userLikes', 'userCredentials']),
      isLiked() {
        if(this.isAuthenticated && this.userLikes) {
          let findIfScreamIsLiked = this.userLikes.findIndex(scream => scream.screamId === this.scream.screamId)
          return findIfScreamIsLiked >= 0 ? true : false;
        }
        return false;
      }
  }
}
</script>
