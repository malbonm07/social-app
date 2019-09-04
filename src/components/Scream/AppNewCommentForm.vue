<template>
    <v-row>
        <v-col cols="4" offset-sm="0" sm="3">
            <div class="text-center">
            <v-avatar size="60">
                <img :src="userCredentials.imageUrl" alt="avatar">
            </v-avatar>
            </div>
        </v-col>
        <v-col cols="8" sm="8" class="pa-2">
            <v-row>
                <v-col cols="12" class="pa-2">
                    <h3 class="title">{{userCredentials.handle}}</h3>
                </v-col>
                <v-col class="text-left pa-2" cols="12">
                    <form @submit.prevent="handleCommentSubmit" ref="form">
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea label="Write a comment" type="text" required v-model="body" counter :loading="loadingForm" no-resize 
                                    color="#51dacf">
                                    </v-textarea>
                                </v-col>
                            </v-row>
                        <v-card-actions>
                        <div class="flex-grow-1"></div>
                            <v-btn color="cyan" :disabled="loadingForm" text @click="body = ''" small>Clear</v-btn>
                            <v-btn color="cyan" :loading="loadingForm" text type="submit"  small>Comment</v-btn>
                        </v-card-actions>
                    </form>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: ['screamId'],
    data: () => ({
        body: ''
    }),
    methods: {
        handleCommentSubmit() {
            this.$store.dispatch('SUBMIT_COMMENT', {screamId: this.screamId, comment: {
                body: this.body
            }})
            .then(() => {
                this.body = ''
            })
            .catch((error) => error)
        },
    },
    computed: {
        ...mapGetters(['loadingForm', 'userCredentials'])
    },
}
</script>
