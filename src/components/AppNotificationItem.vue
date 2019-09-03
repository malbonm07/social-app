<template>
    <v-list-item>
        <v-list-item-avatar>
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
            <v-list-item-subtitle>Founder of Vuetify.js</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
            <v-btn
            :class="fav ? 'red--text' : ''"
            icon
            @click="fav = !fav"
            >
            <v-icon>mdi-heart</v-icon>
            </v-btn>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
export default {

}
</script>

<style>

</style>
