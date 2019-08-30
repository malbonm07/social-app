<template>
    <v-card>
        <v-row>
            <v-col offset="1" cols="10">
                <v-img class="card-img" :src="data.imageUrl"></v-img>
            </v-col>
            <v-col cols="12">
                <div>
                    <v-row>
                        <v-col>
                            <div class="text-center mb-3 title">
                                <span>@</span>{{data.handle}}
                            </div>
                            <div v-if="data.bio" class="text-center mb-3">
                                {{data.bio}}
                            </div>
                            <div v-if="data.location" class="text-center mb-3">
                                <v-icon>{{svg.location}}</v-icon>
                                <span>
                                    {{data.location}}
                                </span>
                            </div>
                            <div v-if="data.website" class="text-center mb-3">
                                <v-icon>{{svg.web}}</v-icon>
                                <span>
                                    {{data.website}}
                                </span>
                            </div>
                            <div class="text-center">
                                <v-icon>{{svg.calendar}}</v-icon>
                                <span>
                                    {{data.createdAt}}
                                </span>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import { mdiMapMarker } from '@mdi/js';
import { mdiWeb } from '@mdi/js';
import { mdiCalendar } from '@mdi/js';
import { mdiPencil } from '@mdi/js';
import { mdiPencilOutline } from '@mdi/js';

export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        svg: {
            location: mdiMapMarker,
            web: mdiWeb,
            calendar: mdiCalendar,
            pencil: mdiPencil
        }
    })
}
</script>

<style>

</style>
