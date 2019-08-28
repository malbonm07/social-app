<template>
    <v-card color="blue-grey darken-2" min-height="600">
        <v-toolbar flat height="200" color="blue-grey darken-4">
            <v-row>
                <v-col class="d-flex justify-center">
                    <v-icon size="100" color="white">{{avatar}}</v-icon>
                </v-col>
                <v-col cols="12">
                    <div class="display-1 font-weight-bold text-uppercase white--text text-center">{{name}}</div>
                </v-col>
            </v-row>
        </v-toolbar>
        <v-card-text>
            <v-row>
                <v-col>
                    <slot></slot>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import { mdiAccount } from '@mdi/js';

export default {
    props: ['name'],
    data: () => ({
        avatar: mdiAccount
    })
}
</script>

<style>

</style>
