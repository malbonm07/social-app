<template>
    <form @submit.prevent="loginHandlerSubmit" ref="form">
        <v-text-field
            v-model="loginUser.email"
            :rules="emailRules"
            label="E-mail"
            required
        ></v-text-field>
        <v-text-field
            v-model="loginUser.password"
            :append-icon="showPassword ? svg.visibility : svg.visibilityOff"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 6 char acters"
            counter
            @click:append="showPassword = !showPassword"
        ></v-text-field>
        <div v-if="error" class="subtitle1 text-center text-capitalize red--text">
            {{error.general}}. <span>Don't have an account? <router-link to="/signup">Sign Up Here</router-link></span>
        </div>
        <div class="mt-5">
            <AppButton class="mr-4" type="submit" name="Submit"></AppButton>
            <AppButton @click="reset" name="Clear"></AppButton>
        </div>
    </form>
</template>

<script>
// COMPONENTS
import AppButton from '@/components/AppButton';

// MIXINS
import { reset } from '@/mixins/mixins';

// SVG ICONS
import { mdiEyeOutline } from '@mdi/js';
import { mdiEyeOffOutline } from '@mdi/js';

export default {
    components: {
        AppButton
    },
    mixins: [reset],
    data: () => ({
        showPassword: false,
        error: null,
        loading: false,
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
            this.$store.state.status = 'loading';
            this.$store.dispatch('SIGN_IN', {
                email: this.loginUser.email,
                password: this.loginUser.password
            })
            .then(() => {
                this.$router.push({name: 'home'})
            })
            .catch((error) => {
                console.log(error)
                this.error = error.response
                this.$store.state.status = '';
            })
        },
    },
    beforeDestroy() {
        this.$store.state.status = '';
    }
}
</script>
