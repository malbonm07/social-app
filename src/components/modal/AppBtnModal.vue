<template>
    <div>
        <template v-slot:activator="{ on }">
            <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">
                    <v-icon left>{{iconName}}</v-icon>
                    {{name}}
                </v-btn>
            </template>
            <span>{{tooltip}}</span>
            </v-tooltip>
        </template>
    </div>
</template>

<script>
import { mdiPencil } from '@mdi/js';
import { mdiPencilOutline } from '@mdi/js';
import { mdiFeather } from '@mdi/js';

export default {
    props: ['icon', 'name', 'tooltip'],
    data: () => ({
        mdiPencil: mdiPencil,
    }),
    methods: {
        showModal() {
            this.$store.dispatch('MODAL', {'mainModal': true});
        }
    },
    computed: {
        iconName() {
            if(this.icon === 'pencil') {
                return this.mdipencil
            }
        }
    }
}
</script>
