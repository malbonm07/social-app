<template>
    <v-list-item @click="viewNotification">

        <v-list-item-action>
            <v-btn :class="data.read ? 'cyan--text text--accent-3' : 'red--text text--darken-3'" icon>
            <v-icon v-show="data.type === 'like'" >mdi-heart</v-icon>
            <v-icon v-show="data.type === 'comment'">mdi-comment-text</v-icon>
            </v-btn>
        </v-list-item-action>

        <v-list-item-content>
            <v-list-item-title>{{data.sender}}</v-list-item-title>
            <v-list-item-subtitle>{{data.createdAt | day}}</v-list-item-subtitle>
        </v-list-item-content>

    </v-list-item>
</template>

<script>
import { mdiBellOutline } from '@mdi/js';
import { mdiHeart } from '@mdi/js';
import { mdiMessageTextOutline } from '@mdi/js';
import { mdiMessageText } from '@mdi/js';
import { mdiCommentTextOutline } from '@mdi/js';
import { mdiCommentText } from '@mdi/js';

export default {
    props: {
        data: {
            type: Object
        }
    },
    methods: {
        viewNotification() {
            let notificationId = [this.data.notificationId]
            if(this.data.read === false) {
                this.$store.dispatch('MARK_NOTIFICATIONS', notificationId)
                this.$router.push(`/users/${this.data.recipient}/scream/${this.data.screamId}`)
            }
            else {
                this.$router.push(`/users/${this.data.recipient}/scream/${this.data.screamId}`)
            }
        }
    }
}
</script>
