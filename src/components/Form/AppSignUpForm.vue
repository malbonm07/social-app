<template>
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
        <div v-if="errors" class="subtitle1 text-center text-capitalize red--text">
            <p v-for="(errorMessage, i) in errors" :key="i">{{errorMessage}}</p>
            <span>Already have an account? <router-link to="/login">Sign In Here</router-link></span>
        </div>
        <div class="mt-5">
            <AppButton class="mr-4" type="submit" name="Sign Up"></AppButton>
            <AppButton @click="reset" name="Clear"></AppButton>
        </div>
    </form>
</template>

<script>
//ICONS
import { mdiEyeOutline } from '@mdi/js';
import { mdiEyeOffOutline } from '@mdi/js';

//MIXINS
import { reset } from '@/mixins/mixins';

//COMPONENTS
import AppButton from '@/components/AppButton';

//VUEX
import { mapGetters } from 'vuex';

export default {
    components: {
        AppButton
    },
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
        ...mapGetters(['errors'])
    },
}
</script>
