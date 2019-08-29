<template>
    <v-content>
        <v-row>
            <v-col offset-sm="3" sm="6" offset-md="4" md="4">
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
