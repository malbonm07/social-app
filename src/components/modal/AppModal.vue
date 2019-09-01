<template>
    <v-row justify="center">
        <v-dialog v-model="modals.mainModal" persistent max-width="600px" loading>
            <!------------------ BUTTON MODAL ------------------>
            <template v-slot:activator="{ on }">
                <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark @click.stop="showModal">
                        <v-icon left>{{iconName}}</v-icon>
                        {{buttonName}}
                    </v-btn>
                </template>
                <span>{{tooltip}}</span>
                </v-tooltip>
            </template>
            <!------------------ END BUTTON MODAL ------------------>
            <v-card>
                <!------------------ NAME MODAL ------------------>
                <v-card-title>
                    <span class="headline">{{name}}</span>
                </v-card-title>
                <!------------------ END NAME MODAL ------------------>

                <!------------------ CONTENT MODAL ------------------>
                <slot></slot>
                <!------------------ END CONTENT MODAL ------------------>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
// VUEX
import { mapGetters } from 'vuex';

// SVG ICONS
import { mdiPencil } from '@mdi/js';
import { mdiPencilOutline } from '@mdi/js';
import { mdiFeather } from '@mdi/js';

export default {
    props: ['name','icon', 'buttonName', 'tooltip'],
    data: () => ({
        pencil: mdiPencil
    }),
    methods: {
        showModal() {
            this.$store.dispatch('TOGGLE_MODAL_STATE', {name: 'mainModal', value: true});
        }
    },
    computed: {
        ...mapGetters(['modals']),
        iconName() {
            if(this.icon === 'pencil') {
                return this.pencil
            }
        }
    }
}
</script>