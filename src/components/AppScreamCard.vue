<template>
  <v-card
  max-height="800" max-width="800" class="mx-auto mb-5 pa-3">
    <v-row
    >
      <v-col offset="1" cols="10" offset-sm="0" sm="3">
        <v-img
          height="200"
          width="200"
          :src="scream.userImage"
        ></v-img>
      </v-col>
      <v-col cols="12" sm="8">
          <div>
            <v-row>
                <v-col cols="12">
                    <h3 class="title">{{scream.userHandle}}</h3>
                    <p class="font-weight-light grey--text text--darken-1 body-2">{{scream.createdAt | timeFromNow}}</p>
                </v-col>
                <v-col class="text-left" cols="12">
                    <div class="font-weight-regular text-truncate">
                        {{scream.body}}
                    </div>
                </v-col>
                <v-col cols="12">
                    <v-card-actions>
                    <v-btn text>
                        <v-icon left>{{svgHeartOut}}</v-icon>
                        Like</v-btn>
                    <v-btn text>
                        <v-icon left>{{svgComment}}</v-icon>
                        Comments</v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
          </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { mdiCommentMultipleOutline } from '@mdi/js';
import { mdiHeartOutline } from '@mdi/js';

export default {
    props: {
        scream: {
            type: Object,
            required: true
        }
    },
    data: () => ({
      svgComment: mdiCommentMultipleOutline,
      svgHeartOut: mdiHeartOutline
    }),
    filters: {
        timeFromNow(date) {
            dayjs.extend(relativeTime);
            return dayjs(date).fromNow();
        }
    }
}
</script>

<style>

</style>
