<template>
  <div max-height="800" max-width="800" class="mx-auto pa-3">
    <v-row  v-if="scream">
      
      <!--------------------------- SCREAM IMAGE -------------------------->
      <v-col offset="1" cols="10" offset-sm="0" sm="3" class="center">
        <v-avatar :size="sizeAvatar">
          <v-img class="card-img" :src="scream.userImage"></v-img>
        </v-avatar>
      </v-col>
      <!--------------------------- END SCREAM IMAGE -------------------------->
      <v-col cols="12" sm="8">
        <v-row>
            <!--------------------- SCREAM USER NAME AND DATE ---------------------->
            <v-col cols="12">
                <h2 class="title cyan--text hover" @click="getUser">{{scream.userHandle}}</h2>
                <p class="font-weight-light grey--text text--darken-1 body-2">{{scream.createdAt | day}}</p>
            </v-col>
            <!--------------------- END SCREAM USER NAME AND DATE ---------------------->

            <!--------------------------- SCREAM BODY -------------------------->
            <v-col class="text-left" cols="12">
                <div class="font-weight-regular text-truncate">
                    {{scream.body}}
                </div>
            </v-col>
            <!--------------------------- END SCREAM BODY -------------------------->


            <v-col cols="12" md="8" class="relative">
                <v-card-actions>
                  
                  <!---------------------- SCREAM LIKE ACTION -------------------->
                  <v-btn text @click="likeScream(isAuthenticated, scream)" small 
                  color="#2c003e">
                      <v-icon left v-if="isLiked" color="red">{{svg.heart}}</v-icon>
                      <v-icon left v-else color="red">{{svg.heartOut}}</v-icon>
                      {{scream.likeCount}} Likes
                  </v-btn>
                  <!---------------------- END SCREAM LIKE ACTION -------------------->
                
                  <!---------------------- SCREAM COMMENTS MODAL ------------------->
                  <AppCommentsModal :data="scream"></AppCommentsModal>
                  <!---------------------- END SCREAM COMMENTS MODAL ------------------>
                </v-card-actions>
            </v-col>

            <!--------------------------- SCREAM DELETE MODAL -------------------------->
            <div class="center ml-5 pa-0" v-if="isAuthenticated && userCredentials">
              <AppDeleteScream v-show="userCredentials.handle === scream.userHandle" :scream="scream"></AppDeleteScream>
            </div>
            <!--------------------------- END SCREAM DELETE MODAL -------------------------->
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
    },
    sizeAvatar: 110
  }),
  methods: {
    getUser() {
      this.$router.push(`/users/${this.scream.userHandle}`)
      this.$store.dispatch('GET_USER', this.scream.userHandle)
    }
  },
  computed: {
      ...mapGetters(['isAuthenticated', 'userLikes', 'userCredentials']),
      isLiked() {
        if(this.isAuthenticated && this.userLikes) {
          let findIfScreamIsLiked = this.userLikes.findIndex(scream => scream.screamId === this.scream.screamId)
          return findIfScreamIsLiked >= 0 ? true : false;
        }
        return false;
      }
  },
  created() {
    if(window.innerWidth < 500) {
      this.sizeAvatar = 150
    }
  }
}
</script>
