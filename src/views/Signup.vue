<template>
    <v-container class="gray" style="min-height: 100vh;">
        <v-row justify="center">
            <v-col cols="11" sm="6" md="4">
                <AppPanel name="Create an account">
                    <AppSignUpForm></AppSignUpForm>
                </AppPanel>
            </v-col>
        </v-row>
    </v-container>
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
