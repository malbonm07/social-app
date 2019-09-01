<template>
    <form @submit.prevent="handleSubmit" ref="form">
        <v-card-text>
        <v-container>
            <v-row>
            <v-col cols="12">
                <v-textarea label="A short Bio about You" type="text" required v-model="userDetails.bio">
                </v-textarea>
            </v-col>
            <v-col cols="12">
                <v-text-field label="Your personal/professional Website" type="text" required v-model="userDetails.website">
                </v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field label="Your Location" type="text" required v-model="userDetails.location">
                </v-text-field>
            </v-col>
            </v-row>
        </v-container>
        <!-- <small>*indicates required field</small> -->
        </v-card-text>
        <v-card-actions>
        <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text @click.stop="closeModal">Close</v-btn>
            <v-btn color="blue darken-1" text type="submit">Save</v-btn>
        </v-card-actions>
    </form>
</template>

<script>
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
                this.closeModal()
            })
        },
        closeModal() {
            this.$store.dispatch('TOGGLE_MODAL_STATE', {name: 'mainModal', value: false})
        }
    },
    mounted() {
        this.data.bio ? this.userDetails.bio = this.data.bio : '';
        this.data.website ? this.userDetails.website = this.data.website : '';
        this.data.location ? this.userDetails.location = this.data.location : '';
    }
}
</script>

<style>

</style>
