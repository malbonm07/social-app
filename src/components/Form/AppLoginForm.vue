<template>
    <form @submit.prevent="loginHandlerSubmit" ref="form">
        <v-text-field
            v-model="loginUser.email"
            :rules="emailRules"
            label="E-mail"
            required
            :loading="loadingForm"
            color="#32BCC3"
        ></v-text-field>
        <v-text-field
            v-model="loginUser.password"
            :append-icon="showPassword ? svg.visibility : svg.visibilityOff"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 6 char acters"
            counter
            :loading="loadingForm"
            @click:append="showPassword = !showPassword"
            color="#32BCC3"
        ></v-text-field>

        <!-------------------------  FORM ERRORS  ------------------->
        <div v-if="errors" class="subtitle1 text-center text-capitalize red--text">
            <p v-for="(errorMessage, i) in errors" :key="i">{{errorMessage}}</p>
            <span>Don't have an account? <router-link class="cyan--text" to="/signup">Sign Up Here</router-link></span>
        </div>
        <!-------------------------  END FORM ERRORS ------------------->

        <div class="mt-5">
            <v-btn type="submit" :loading="loadingForm" class="mr-4" color="#32BCC3" elevation="0" dark>
                Submit
            </v-btn>
            <v-btn @click="reset" :disabled="loadingForm" color="#32BCC3" elevation="0" dark>
                Clear
            </v-btn>
        </div>
    </form>
</template>

<script>
// MIXINS
import { reset } from '@/mixins/mixins';

// SVG ICONS
import { mdiEyeOutline, mdiEyeOffOutline  } from '@mdi/js';

//VUEX
import { mapGetters } from 'vuex';

export default {
    mixins: [reset],
    data: () => ({
        showPassword: false,
        loginUser: {
            email: '',
            password: ''
        },
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        svg: {
            visibility: mdiEyeOutline,
            visibilityOff: mdiEyeOffOutline,
        },
    }),
    methods: {
        loginHandlerSubmit() {
            this.$store.dispatch('SIGN_IN', {
                email: this.loginUser.email,
                password: this.loginUser.password
            })
            .then(() => {
                this.$router.push({name: 'home'});
            })
        },
    },
    computed: {
        ...mapGetters(['errors', 'loadingForm'])
    },
    beforeDestroy() {
        this.$store.dispatch('CLEAR_ERROR')
    }
}
</script>
