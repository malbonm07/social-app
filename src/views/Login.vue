<template>
    <v-content>
        <v-row>
            <v-col offset-sm="3" sm="6" offset-md="4" md="4">
                <AppPanel name="Login">
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
                            <AppButton @click.self="reset" name="Clear"></AppButton>
                        </div>
                    </form>
                </AppPanel>
            </v-col>
        </v-row>
    </v-content>
</template>

<script>
import { mdiEyeOutline } from '@mdi/js';
import { mdiEyeOffOutline } from '@mdi/js';

import AppPanel from '@/components/AppPanel';
import AppButton from '@/components/AppButton';

import { setTimeout } from 'timers';

export default {
    components: {
        AppPanel,
        AppButton
    },
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
                this.$store.state.status = '';
                this.$router.push({ name: '/'})
            })
            .catch((error) => {
                this.error = error.response.data
                this.$store.state.status = '';
            })
        },
        reset () {
            console.log('clear')
            this.loginUser.email = '';
            this.loginUser.password = '';
        },
    }
}
</script>
