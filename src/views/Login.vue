<template>
    <v-content>
        <v-row>
            <v-col offset-sm="3" sm="6" offset-md="4" md="4">
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
