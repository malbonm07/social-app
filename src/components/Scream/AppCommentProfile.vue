<template>
    <v-row>
        <v-col cols="4" offset-sm="0" sm="3">
            <div class="text-center">
                <v-avatar size="50">
                    <img :src="data.userImage" alt="avatar">
                </v-avatar>
            </div>
        </v-col>
        <v-col cols="8" sm="8">
            <div>
                <v-row>
                    <v-col cols="12">
                        <h2 @click="getUser" class="cyan--text hover">{{data.userHandle}}</h2>
                        <!-- <h3 class="title">{{data.userHandle}}</h3> -->
                        <p class="font-weight-light grey--text text--darken-1 body-2 mt-1">{{data.createdAt | exactDay}}</p>
                    </v-col>
                    <v-col class="text-left" cols="12">
                        <div class="font-weight-regular">
                            {{data.body}}
                        </div>
                    </v-col>
                    <v-col cols="12" md="8">
                    
                    </v-col>
                    <v-col cols="12" md="4" class="center">

                    </v-col>
                </v-row>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import dayjs from 'dayjs';

export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        getUser() {
            this.$router.push(`/users/${this.data.userHandle}`)
            this.$store.dispatch('GET_USER', this.data.userHandle)
            this.$emit('click')
        }
    },
    filters: {
        exactDay(date) {

            return dayjs(date).format('h:mm a, MMMM DD YYYY');

        }
    }
}
</script>
