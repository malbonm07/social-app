<template>
    <div v-if="data">
        <v-row>
            <v-col offset="1" cols="10">
                <v-img class="card-img" :src="data.imageUrl"></v-img>
                <input type="file" id="imageInput" hidden @change="handleImageChange">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                    <v-btn class="mx-2" fab dark small color="pink" absolute right @click="editImage" v-on="on">
                    <v-icon dark>{{svg.pencil}}</v-icon>
                    </v-btn>
                    </template>
                    <span>Edit Image</span>
                </v-tooltip>
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
                                    {{data.createdAt | day}}
                                </span>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-row>
    </div>
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
        }
    },
    data: () => ({
        svg: {
            location: mdiMapMarker,
            web: mdiWeb,
            calendar: mdiCalendar,
            pencil: mdiPencil
        }
    }),
    methods: {
        handleImageChange(event) {
            const image = event.target.files[0];
        },
        editImage() {
            const imageInput = document.getElementById('imageInput');
            imageInput.click();
        }
    }
}
</script>
