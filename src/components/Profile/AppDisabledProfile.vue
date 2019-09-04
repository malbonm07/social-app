<template>
    <div v-if="!isAuthenticated" style="min-height: 300px; flex-direction: column;" class="center">
        <div class="subtitle-2 text-center mb-5 red--text">
            Profile not found
        </div>
        <div class="subtitle-1 text-center mb-5">
            <div class="grey--text text--darken-1">Don't have an account?</div> 
            <router-link to="/signup" class="title">
                <v-btn color="#32BCC3" elevation="0" class="mt-3" dark>
                    Sign Up
                </v-btn>
            </router-link>
        </div>
        <div class="subtitle-1 text-center">
            <div class="grey--text text--darken-1">Already have an account?</div>
            <router-link to="/login" class="title">
                <v-btn color="#E0E0E0" elevation="0" class="mt-3">
                    Sign In
                </v-btn>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(["isAuthenticated"])
    }
}
</script>

