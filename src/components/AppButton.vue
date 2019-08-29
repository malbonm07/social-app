<template>
    <v-btn :type="type" @click="$emit('click')">
        <slot v-if="status !== 'loading'">{{name}}</slot>
        <slot v-else>
            <v-progress-circular indeterminate color="primary" size="24"
            ></v-progress-circular>
        </slot>
    </v-btn>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    props: ['type', 'name'],
    computed: {
        ...mapGetters(['status'])
    }
}
</script>

<style>

</style>
