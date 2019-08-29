<template>
    <v-content>
        <v-row>
            <v-col offset-sm="3" sm="6" offset-md="4" md="4">
                <AppPanel name="Create an account">
                    <form @submit.prevent="loginHandlerSubmit" ref="form">
                        <v-text-field
                            v-model="formNewUser.handle"
                            :rules="handleRules"
                            label="Name"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="formNewUser.email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="formNewUser.password"
                            :append-icon="showPassword ? svg.visibility : svg.visibilityOff"
                            :type="showPassword ? 'text' : 'password'"
                            name="password"
                            label="Password"
                            hint="At least 6 char acters"
                            counter
                            @click:append="showPassword = !showPassword"
                        ></v-text-field>
                        <v-text-field
                            v-model="formNewUser.confirmPassword"
                            :append-icon="showPassword ? svg.visibility : svg.visibilityOff"
                            :type="showPassword ? 'text' : 'password'"
                            name="confirmPassword"
                            label="Confirm Password"
                            hint="At least 6 char acters"
                            counter
                            @click:append="showPassword = !showPassword"
                        ></v-text-field>
                        <div v-if="error" class="subtitle1 text-center text-capitalize red--text">
                            <p v-if="error.handle">Name {{error.handle}}.</p>
                            <p v-if="error.email">Email {{error.email}}.</p>
                            <p v-if="error.password">Password {{error.password}}.</p>
                            <p v-if="error.confirmPassword">{{error.confirmPassword}}.</p>
                            <span>Already have an account? <router-link to="/login">Sign In Here</router-link></span>
                        </div>
                        <div class="mt-5">
                            <AppButton class="mr-4" type="submit" name="Sign Up"></AppButton>
                            <AppButton @click="reset" name="Clear"></AppButton>
                            <v-btn @click="reset">dada</v-btn>
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

import { mapGetters } from 'vuex';

export default {
    components: {
        AppPanel,
        AppButton
    },
    data: () => ({
        showPassword: false,
        error: null,
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
            this.$store.state.status = 'loading'
            this.$store.dispatch('SIGN_UP', this.formNewUser)
            .then(() => {
                this.$store.state.status = ''
                this.$router.push({ name: 'home'});
            })
            .catch((error) => {
                this.error = error.response.data
                this.$store.state.status = ''
            })
        },
        reset () {
            this.formNewUser.email = '';
            this.formNewUser.password = '';
            this.formNewUser.confirmPassword = '';
            this.formNewUser.handle = '';
        },
    },
    watch: {
        error() {
            if(this.error) {
                setTimeout(() => {
                    this.error = null
                }, 8000)
            }
        }
    },
}
</script>

<style lang="scss">
</style>
