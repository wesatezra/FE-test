<template>
    <v-card>
        <v-card-title>
            Book an Appointment
        </v-card-title>
        <v-container
            id="input-container"
            fluid
            class="pa-12"
        >
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        label="Member: Search By Name"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import { v4 as uuid } from 'uuid';

export default {
    name: "Appointment",
    methods: {
        submit() {
        },
        
        resets() {
        }
    }
}
</script>

<style scoped>

</style>