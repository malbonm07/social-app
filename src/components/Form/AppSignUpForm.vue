<template>
    <form @submit.prevent="loginHandlerSubmit" ref="form">
        <v-text-field
            v-model="formNewUser.handle"
            :rules="handleRules"
            label="Name"
            required
            :loading="loadingUser"
            color="cyan"
        ></v-text-field>
        <v-text-field
            v-model="formNewUser.email"
            :rules="emailRules"
            label="E-mail"
            required
            :loading="loadingUser"
            color="cyan"
        ></v-text-field>
        <v-text-field
            v-model="formNewUser.password"
            :append-icon="showPassword ? svg.visibility : svg.visibilityOff"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 6 char acters"
            counter
            :loading="loadingUser"
            @click:append="showPassword = !showPassword"
            color="cyan"
        ></v-text-field>
        <v-text-field
            v-model="formNewUser.confirmPassword"
            :append-icon="showPassword ? svg.visibility : svg.visibilityOff"
            :type="showPassword ? 'text' : 'password'"
            name="confirmPassword"
            label="Confirm Password"
            hint="At least 6 char acters"
            counter
            :loading="loadingUser"
            @click:append="showPassword = !showPassword"
            color="cyan"
        ></v-text-field>

        <!-------------------------  FORM ERRORS ------------------->
        <div v-if="errors" class="subtitle1 text-center text-capitalize red--text">
            <p v-for="(errorMessage, i) in errors" :key="i">{{errorMessage}}</p>
            <span>Already have an account? <router-link class="cyan--text" to="/login">Sign In Here</router-link></span>
        </div>
        <!-------------------------  END FORM ERRORS ------------------->

        <div class="mt-5">
            <v-btn type="submit" :loading="loadingUser" class="mr-4" color="#51dacf" elevation="0">
                Sign Up
            </v-btn>
            <v-btn @click="reset" :disabled="loadingUser" color="#51dacf" elevation="0">
                Clear
            </v-btn>
        </div>
    </form>
</template>

<script>
//ICONS
import { mdiEyeOutline } from '@mdi/js';
import { mdiEyeOffOutline } from '@mdi/js';

//MIXINS
import { reset } from '@/mixins/mixins';

//VUEX
import { mapGetters } from 'vuex';

export default {
    mixins: [reset],
    data: () => ({
        showPassword: false,
        formNewUser: {
            email: '',
            password: '',
            confirmPassword: '',
            handle : '',
        },
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        handleRules: [
            v => !!v || 'Name is required'
        ],
        svg: {
            visibility: mdiEyeOutline,
            visibilityOff: mdiEyeOffOutline,
        },
    }),
    methods: {
        loginHandlerSubmit() {
            this.$store.dispatch('SIGN_UP', this.formNewUser)
            .then(() => {
                this.$router.push({ name: 'home'});
            })
        },
    },
    computed: {
        ...mapGetters(['errors', 'loadingUser'])
    },
    beforeDestroy() {
        this.$store.dispatch('CLEAR_ERROR')
    }
}
</script>
