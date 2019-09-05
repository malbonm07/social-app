<template>
    <form @submit.prevent="handlePostSubmit" ref="form">
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-textarea label="Write a comment" type="text" required v-model="body" counter :loading="loadingUser" no-resize rows="4" color="#32BCC3">
                        </v-textarea>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
        <div class="flex-grow-1"></div>
            <v-btn color="#32BCC3" :disabled="loadingUser" text 
            @click="$emit('click')">
                Close
            </v-btn>
            <v-btn color="#32BCC3" :loading="loadingUser" text type="submit">
                Post your scream
            </v-btn>
        </v-card-actions>
    </form>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data: () => ({
        body: ''
    }),
    methods: {
        handlePostSubmit() {
            this.$store.dispatch('POST_NEW_SCREAM', { body: this.body })
            .then(() => {
                this.body = '';
                this.$emit('click')
            })
        }
    },
    computed: {
        ...mapGetters(['loadingUser'])
    },
}
</script>
