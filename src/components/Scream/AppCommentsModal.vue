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
          <AppCommentProfile :data="data"></AppCommentProfile>
          <v-divider></v-divider>
            <div class="mt-5">
              <AppNewCommentForm :screamId="data.screamId"></AppNewCommentForm>
            </div>
          <v-divider></v-divider>
            <div class="text-center mt-5" v-show="loadingUser">
              <v-progress-circular indeterminate color="primary"
              ></v-progress-circular>
            </div>
            <div v-if="selectedScream" class="mt-5">
              <AppCommentProfile v-for="(commentProfile, i) in selectedScream" :key="i"
              :data="commentProfile">
              </AppCommentProfile>
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
import AppCommentProfile from '@/components/Scream/AppCommentProfile.vue';
import AppNewCommentForm from '@/components/Scream/AppNewCommentForm.vue';

// SVG ICONS
import { mdiCommentMultipleOutline, mdiHeartOutline, mdiHeart } from '@mdi/js';

// VUEX
import { mapGetters } from 'vuex';

// MIXINS
import { likeMethod } from '@/mixins/mixins';
import { setTimeout } from 'timers';

export default {
  components: {
    AppCommentProfile,
    AppCommentProfile,
    AppNewCommentForm
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
