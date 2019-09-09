<template>
    <v-container class="gray">
        <v-row justify="center">
            <v-col cols="11" sm="6" md="4">
                <AppPanel name="Login">
                    <AppLoginForm></AppLoginForm>
                </AppPanel>
            </v-col>
        </v-row>
    </v-container>
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
