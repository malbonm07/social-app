<template>
    <v-content>
        <v-row>
            <v-col offset-sm="3" sm="6">
                <AppPanel name="Login">
                    <form>
                        <v-text-field
                        v-model="email"
                        :error-messages="emailErrors"
                        label="E-mail"
                        required
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                            :type="showPassword ? 'text' : 'password'"
                            name="input-10-1"
                            label="Normal with hint text"
                            hint="At least 6 characters"
                            counter
                            @click:append="showPassword = !showPassword"
                        ></v-text-field>
                        <v-btn class="mr-4" @click="submit">submit</v-btn>
                        <v-btn @click="clear">clear</v-btn>
                    </form>
                </AppPanel>
            </v-col>
        </v-row>
    </v-content>
</template>

<script>
// import { validationMixin } from 'vuelidate';
// import { required, maxLength, email } from 'vuelidate/lib/validators';
import AppPanel from '@/components/AppPanel';

export default {
    components: {
        AppPanel
    },
    data: () => ({
        showPassword: false,
    })
}
</script>

<style>

</style>
