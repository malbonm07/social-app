<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent scrollable max-width="600px">

      <!------------------------ COMMENTS BUTTON ----------------------->
      <template v-slot:activator="{ on }">
        <v-btn color="#2c003e" text small @click="getScream">
            <v-icon left>{{svg.comment}}</v-icon>
            {{data.commentCount}} Comments
        </v-btn>
      </template>
      <!------------------------ COMMENTS BUTTON ----------------------->

      <!------------------------ COMMENTS ----------------------->
      <v-card>
        <v-card-title class="primario white--text">{{data.userHandle}}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="min-height: 300px; max-height: 500px;">

          <!---------------------- MAIN COMMENT PROFILE --------------------->
          <AppCommentProfile class="mt-5" :data="data"></AppCommentProfile>
          <!---------------------- END MAIN COMMENT PROFILE --------------------->

          <v-divider></v-divider>

          <!--------------------- AUTH COMMENT FORM -------------------->
          <div class="mt-5 mb-5 center">
            <AppNewCommentForm v-if="isAuthenticated" :screamId="data.screamId"></AppNewCommentForm>
            <router-link v-else to="/login">
              <v-btn elevation="0" color="#32BCC3" dark>Comment</v-btn>
            </router-link>
          </div>
          <!---------------------- END AUTH COMMENT FORM -------------------->

          <v-divider></v-divider>

          <!---------------------- LOADER -------------------->
          <div class="text-center mt-5" v-show="loadingUser">
            <v-progress-circular indeterminate color="primary"
            ></v-progress-circular>
          </div>
          <!---------------------- END LOADER -------------------->

          <!---------------------  COMMENTS PROFILE------------------->
          <div v-if="selectedScream" class="mt-5">
            <AppCommentProfile v-for="(commentProfile, i) in selectedScream" :key="i"
            :data="commentProfile" @click="closeModal">
            </AppCommentProfile>
          </div>
          <!-------------------- END COMMENTS PROFILE ------------------>

        </v-card-text>
        <v-divider></v-divider>

        <!---------------------- ACTIONS BUTTONS -------------------->
        <v-card-actions class="background-secundario">
          <v-btn text @click="likeScream(isAuthenticated, data)" small color="grey">
              <v-icon color="red" left v-if="isLiked">{{svg.heart}}</v-icon>
              <v-icon color="red" left v-else>{{svg.heartOut}}</v-icon>
              {{data.likeCount}} Likes
          </v-btn>
          <v-btn text small color="grey">
            <v-icon>{{svg.comment}}</v-icon>
            &nbsp;{{data.commentCount}}
          </v-btn>
          <div class="flex-grow-1"></div>
            <v-btn color="cyan darken-1" text @click="closeModal">Close</v-btn>
        </v-card-actions>
        <!---------------------- END ACTIONS BUTTONS -------------------->

      </v-card>
      <!------------------------ END COMMENTS ----------------------->

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
      }, 100)
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
  mounted() {
    // OPEN DIALOG WHEN NOTIFICATION IS ACTIVE
    if(this.data.screamId === this.$route.params.screamId) {
      this.getScream();
    }
  }
}
</script>
