<template>
    <div height="100%" class="add-member d-flex">
        <v-form ref="form" class="add-member-form">
            <h2>Add Member</h2>
            <v-text-field label="First Name" :rules="nameRules" v-model="firstName" @input="resets"></v-text-field>
            <v-text-field label="Last Name" :rules="nameRules" v-model="lastName" @input="resets"></v-text-field>
            <v-text-field label="Email" :rules="emailRules" v-model="email" @input="resets"></v-text-field>
            <v-text-field label="Avatar" v-model="avatar"></v-text-field>
            <div class="d-flex flex-row align-center button-container">
                <v-btn
                :disabled="this.email===''||this.firstName===''||this.lastName===''"
                class="mr-4"
                @click="submit">Submit</v-btn> 
                <v-slide-x-transition>
                    <v-card class="validate-msg red darken-2 white--text" v-if="this.showErr">
                        Please meet the validation criteria.
                    </v-card>
                    <v-card class="validate-msg green white--text" v-if="this.showSuccess">
                        Member added!
                    </v-card>
                </v-slide-x-transition>
            </div>
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
        avatar: '',
        showErr: false,
        showSuccess: false,
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
            if (this.$refs.form.validate()) {
                this.showErr = false;
                fetch("/api/users", {
                    method: 'POST',
                    body: JSON.stringify({
                        id: uuid(),
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        avatar: this.avatar
                    })
                }).then(res => {
                    if(res.ok) {
                        return res.json();
                    }
                }).then(json => {
                    console.log(json);
                    this.$refs.form.reset();
                    this.showSuccess = true;

                })
            } else {
                this.showErr = true;
            }
        },
        
        resets() {
            this.showErr = false;
            this.showSuccess = false;
        }
    }
}
</script>

<style scoped>
    .add-member-form {
        min-width: 450px;
        border-radius: 20px;
        background: #FFFEF2;
        padding: 20px 40px;
        max-height: 450px;
        margin: auto 0;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .add-member {
        align-content: center;
        justify-content: center;
        background-image: url(../assets/Ezra_Symbol_Social.png);
        background-size: auto;
        background-repeat: repeat;
        height: 100% - 54px;
    }

    .validate-msg {
        background: red;
        padding: 8px 3px;
        border-radius: 5px;
        color: white;
    }

    .button-container {
        margin: 5px 0;
    }

</style>