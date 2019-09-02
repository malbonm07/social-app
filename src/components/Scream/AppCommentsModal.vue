<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent scrollable max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" text small @click="getScream">
            <v-icon left>{{svg.comment}}</v-icon>
            {{data.commentCount}} Comments
        </v-btn>
      </template>
      <v-card>
        <v-card-title>{{data.userHandle}}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="min-height: 300px; max-height: 500px;">
          <AppCommentsProfile :data="data"></AppCommentsProfile>
          <v-divider></v-divider>
            <div class="text-center mt-5" v-show="loadingUser">
              <v-progress-circular indeterminate color="primary"
              ></v-progress-circular>
            </div>
            <div v-if="selectedScream">
              <AppCommentProfile v-for="(scream, i) in selectedScream" :key="i"
              :data="scream"></AppCommentProfile>
            </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text @click="likeScream(isAuthenticated, data)" small>
              <v-icon left v-if="isLiked">{{svg.heart}}</v-icon>
              <v-icon left v-else>{{svg.heartOut}}</v-icon>
              {{data.likeCount}} Likes
          </v-btn>
          <v-btn text small>
            <v-icon>{{svg.comment}}</v-icon>
            &nbsp;{{data.commentCount}}
          </v-btn>
          <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text @click="closeModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
// COMPONENTS
import AppCommentsProfile from '@/components/Scream/AppCommentsProfile.vue';
import AppCommentProfile from '@/components/Scream/AppCommentsProfile.vue';

// SVG ICONS
import { mdiCommentMultipleOutline, mdiHeartOutline, mdiHeart } from '@mdi/js';

// VUEX
import { mapGetters } from 'vuex';

// MIXINS
import { likeMethod } from '@/mixins/mixins';
import { setTimeout } from 'timers';

export default {
  components: {
    AppCommentsProfile,
    AppCommentProfile
  },
  props: {
      data: {
          type: Object
      }
  },
  mixins: [likeMethod],
  data () {
    return {
      dialog: false,
      svg: {
        comment: mdiCommentMultipleOutline,
        heart: mdiHeart,
        heartOut: mdiHeartOutline
      }
    }
  },
  methods: {
    getScream() {
      this.dialog = true
      setTimeout(() => {
        this.$store.dispatch('GET_SCREAM', this.data.screamId)
      }, 300)
    },
    closeModal() {
      this.dialog = false
      setTimeout(() => {
        this.$store.dispatch('CLEAN_SELECTED_SCREAM');
      }, 300)
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'userLikes', 'userCredentials', 'loadingUser', 'selectedScream']),
    isLiked() {
      if(this.isAuthenticated && this.userLikes) {
        let findScreamLiked = this.userLikes.findIndex(scream => scream.screamId === this.data.screamId)
        return findScreamLiked >= 0 ? true : false;
      }
      return false;
    }
  },
}
</script>
