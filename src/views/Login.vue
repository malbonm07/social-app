<template>
    <v-content class="gray" style="min-height: 100vh;">
        <v-row justify="center" justify-sm="start">
            <v-col cols="11" offset-sm="3" sm="6" offset-md="4" md="4">
                <AppPanel name="Login">
                    <AppLoginForm></AppLoginForm>
                </AppPanel>
            </v-col>
        </v-row>
    </v-content>
</template>

<script>
// COMPONENTS
import AppPanel from '@/components/AppPanel';
import AppLoginForm from '@/components/Form/AppLoginForm';

export default {
    components: {
        AppPanel,
        AppLoginForm
    }
}
</script>
