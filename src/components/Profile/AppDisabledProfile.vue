<template>
    <div v-if="!isAuthenticated">
        <div class="subtitle-2 text-center pt-5 mb-5">
            Profile not found
        </div>
        <div class="subtitle-1 text-center mb-5">
            <div>Don't have an account?</div> 
            <router-link to="/signup">Sign Up Here</router-link>
        </div>
        <div class="subtitle-1 text-center">
            <div>Already have an account?</div>
            <router-link to="/login">Sign In Here</router-link>
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

<style>

</style>
