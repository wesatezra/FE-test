<template>

    <div>
        <v-card>
            <v-card-title>
                Book an Appointment
            </v-card-title>
            <v-container
                id="input-container"
                fluid
                class="pa-12"
            >
                <v-form
                    ref="form"
                    @submit.prevent="searchByName()"
                >
                    <v-row class="d-flex justify-center">
                        <v-col cols="6">
                            <v-text-field
                                label="Member: Search By Name"
                                v-model="userName"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="2" class="d-flex align-center">
                            <v-btn 
                                color="primary"
                                text
                                type="submit"
                            >Search</v-btn >
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>

        <template>
            <v-dialog
                max-width="500px" v-model="dialog"
            >
                <v-card>
                    <v-card-title class="headline grey lighten-2">
                    Add Appointment
                    </v-card-title>
                    <v-card-text>
                    <v-container class="ma-0 pa-0">
                        <v-row justify="center">
                            <v-date-picker
                                v-model="date"
                                color="green lighten-1"
                                landscape
                            ></v-date-picker>
                        </v-row>
                        <v-row class="d-flex justify-center">
                            <v-col
                                cols="8"
                                sm="8"
                                md="8"
                                >
                                <v-textarea
                                    v-model="notes"
                                    label="Notes"
                                    rows="2"
                                ></v-textarea>
                            </v-col> 
                            <v-col
                            cols="4"
                            sm="4"
                            md="4"
                            class="d-flex align-center"
                            >
                            <v-checkbox
                                v-model="paid"
                                label="Paid"
                                color="green lighten-1"
                            ></v-checkbox>
                            </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>

                    <v-divider></v-divider>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green lighten-1"
                        text
                        @click="submit()"
                    >
                        Submit
                    </v-btn>
                    <v-btn
                        color="green lighten-1"
                        text
                        @click="dialog = false"
                    >
                        Cancel
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>        
        </template>

        <v-data-table :headers="headers" :items="matchedUsers" class="elevation-2">
            <template v-slot:no-data>
                <div></div>
            </template>

             
        <template #[`item.actions`]="{item}">
          <v-icon
            small
            class="mr-2"
            @click="openDialog()"
          >
            mdi-calendar-text
          </v-icon>
        </template>
        </v-data-table>
    </div>




</template>

<script>
import { v4 as uuid } from 'uuid';

export default {
    name: "Appointment",
    users: [],
    searchedUser: {
        firstName: "",
        lastName: "",
        email: "",
        appointments:[],
    },
    data() {
        return {
            headers: [
                {
                    value: "firstName",
                    text: "First Name",
                    align: 'center',
                    sortable: false,
                },
                {
                    value: "lastName",
                    text: "Last Name",
                    align: 'center',
                    sortable: false,
                },
                {
                    value: "email",
                    text: "Email",
                    align: 'center',
                    sortable: false,
                },
                {
                    value: "viewEdit",
                    text: "View/Edit",
                    align: 'center',
                    sortable: false,
                },
                {
                    value: "actions",
                    align: 'center',
                    text: "Book",
                    sortable: false
                }
            ],
            matchedUsers: [],
            userName: "",
            dialog: false,
            appointment: {
                id: "",
                when: "",
                paid: false,
                notes: ""
            },
            date: new Date().toISOString().slice(0,10),
            paid: false,
            notes: ""
        }
    },
    methods: {
        submit() {
        },
        
        resets() {
        },
        fetchUsers() {
            fetch("/api/users")
            .then((res) => {
                return res.json();
            }).then((json) => {
            this.users = json;
            console.log(`${this.users[9].firstName} ${this.users[9].lastName}`);
            })
        },
        searchByName() {
            const name = this.userName.split(" ");
            const hasLastName = name[1] !== undefined && name[1] !== "";
            this.matchedUsers = this.users.filter(user => {
                if(hasLastName) {
                    return user.firstName.toUpperCase() === name[0].toUpperCase() && user.lastName.toUpperCase() === name[1].toUpperCase();
                } else {
                    return user.firstName.toUpperCase() === name[0].replace(" ", "").toUpperCase();
                }
            })
        },
        openDialog() {
            this.dialog = true;
        },
        submit() {
            console.log(this.date);
            fetch("/api/appointments", {
                method: "POST",
                body: JSON.stringify(
                    {
                        id: uuid(),
                        when: this.date,
                        paid: this.paid,
                    }
                )
            })
        }
    },
    created() {
        this.fetchUsers();
        console.log(this.date);
    }
}
</script>

<style scoped>

</style>