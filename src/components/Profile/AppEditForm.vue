<template>
    <form @submit.prevent="handleSubmit" ref="form">
        <v-card-text>
        <v-container>
            <v-row>
            <v-col cols="12">
                <v-textarea label="A short Bio about You" type="text" required v-model="userDetails.bio" :loading="loadingForm" color="cyan" no-resize>
                </v-textarea>
            </v-col>
            <v-col cols="12">
                <v-text-field label="Your personal/professional Website" type="text" required v-model="userDetails.website" :loading="loadingForm" color="cyan">
                </v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field label="Your Location" type="text" required v-model="userDetails.location" :loading="loadingForm" color="cyan">
                </v-text-field>
            </v-col>
            </v-row>
        </v-container>
        </v-card-text>
        <v-card-actions>
        <div class="flex-grow-1"></div>
            <v-btn color="cyan darken-1" :disabled="loadingForm" text @click.stop="$emit('click')">Close</v-btn>
            <v-btn color="cyan darken-1" :loading="loadingForm" text type="submit">Save</v-btn>
        </v-card-actions>
    </form>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        userDetails: {
            bio: '',
            website: '',
            location: ''
        }
    }),
    methods: {
        handleSubmit() {
            this.$store.dispatch('EDIT_USER_DETAILS', this.userDetails)
            .then(() => {
                this.$emit('click')
            })
        }
    },
    mounted() {
        this.data.bio ? this.userDetails.bio = this.data.bio : '';
        this.data.website ? this.userDetails.website = this.data.website : '';
        this.data.location ? this.userDetails.location = this.data.location : '';
    },
    computed: {
        ...mapGetters(['loadingForm'])
    }
}
</script>
