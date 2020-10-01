<template>
    <div class="add-member">
        <v-form ref="form" class="add-member-form">
            <v-text-field label="First Name" :rules="nameRules" v-model="firstName"></v-text-field>
            <v-text-field label="Last Name" :rules="nameRules" v-model="lastName"></v-text-field>
            <v-text-field label="Email" :rules="emailRules" v-model="email"></v-text-field>
            <v-btn
            :disabled="this.email==''||this.firstName==''||this.lastName==''"
            class="mr-4"
            @click="submit">Submit</v-btn>

        </v-form>
    </div>
</template>

<script>

import { v4 as uuid } from 'uuid';

export default {
    name: "AddMember",
    data: () => ({
        firstName: '',
        lastName: '',
        email: '',
        nameRules:[
            v => !!v || 'Name is required',
            v => /^([^0-9]*)$/.test(v) || 'No Numbers fam'
        ],
        emailRules: [
            v => !!v || 'Email is required',
            v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Legit email only bruh'
        ]
    }),
    methods: {
        submit() {
            fetch("/api/users", {
                method: 'POST',
                body: JSON.stringify({
                    id: uuid(),
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email
                })
            }).then(res => {
                if(res.ok) {
                    return res.json();
                }
            }).then(json => {
                console.log(json);
                this.$refs.form.reset();
            })
        }
    }
}
</script>

<style scoped>
    .add-member-form {
        max-width: 500px;
        border-radius: 20px;
        background: #FFFEF2;
        padding: 20px 40px;
    }
</style>