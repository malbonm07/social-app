<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
        <!-- <template v-slot:activator="{ on }">
            <v-tooltip bottom> -->
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">
                    <v-icon left>{{svg.pencil}}</v-icon>
                    Edit Profile
                </v-btn>
            </template>
            <!-- <span>Edit Profile</span>
            </v-tooltip>
        </template> -->
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
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

            </v-card-text>
            <v-card-actions>
            <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" text type="submit">Save</v-btn>
            </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mdiPencil } from '@mdi/js';
import { mdiPencilOutline } from '@mdi/js';

  export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        dialog: false,
        svg: {
            pencil: mdiPencil
        },
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
                this.dialog = false;
            })
        }
    },
    mounted() {
        this.data.bio ? this.userDetails.bio = this.data.bio : '';
        this.data.website ? this.userDetails.website = this.data.website : '';
        this.data.location ? this.userDetails.location = this.data.location : '';
    }
  }
</script>