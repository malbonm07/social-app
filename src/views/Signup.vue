<template>
    <v-content class="gray" style="min-height: 100vh;">
        <v-row justify="center" justify-sm="start">
            <v-col cols="11" offset-sm="3" sm="6" offset-md="4" md="4">
                <AppPanel name="Create an account">
                    <AppSignUpForm></AppSignUpForm>
                </AppPanel>
            </v-col>
        </v-row>
    </v-content>
</template>

<script>
// COMPONENTS
import AppPanel from '@/components/AppPanel';
import AppSignUpForm from '@/components/Form/AppSignUpForm';

export default {
    components: {
        AppPanel,
        AppSignUpForm
    },
}
</script>
