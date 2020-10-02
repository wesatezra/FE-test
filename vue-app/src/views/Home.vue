<template>
  <div class="home">
    <v-data-table :headers="headers" :items="users" class="elevation-2">
      <template v-slot:top>
        <v-dialog
          max-width="500px" v-model="dialogDelete"
        >
          <v-card>
            <v-card-title class="headline">
              Are you sure you wanted to delete this? 
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
          </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          max-width="500px" v-model="dialog"
        >
          <v-card>
            <v-card-title class="headline grey lighten-2">
              Edit Member
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    >
                      <v-text-field
                        v-model="editedUser.firstName"
                        label="First Name"
                      ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    >
                      <v-text-field
                        v-model="editedUser.lastName"
                        label="Last Name"
                      ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="8"
                    md="10"
                  >
                    <v-text-field
                      v-model="editedUser.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="8"
                    md="10"
                  >
                    <v-text-field
                      v-model="editedUser.avatar"
                      label="Link to Avatar"
                    ></v-text-field>
                  </v-col>
                </v-row>

              </v-container>
            </v-card-text>

            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="submitEdit()"
              >
                Submit
              </v-btn>
              <v-btn
                color="primary"
                text
                @click="dialog = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>        
      </template>

      <template v-slot:[`item.avatar`]="{item}">
        <img v-if="item.avatar" :src="`${item.avatar}`" align="center" justify="center" style="width: 50px; height: 50px"/>
      </template>
        <template v-slot:[`item.actions`]="{item}">
          <v-icon
            small
            class="mr-2"
            @click="editUser(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteUser(item)"
          >
            mdi-delete
          </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        headers: [
          {
            value: "firstName",
            text: "First name"
          },
          {
            value: "lastName",
            text: "Last name"
          },
          {
            value: "email",
            text: "Email"
          },
          {
            value: "avatar",
            text: "Avatar"
          },

          {
            value: "actions",
            text: "Actions",
            sortable: false
          }
        ],
        users: [],
        dialog: false,
        dialogDelete: false,
        editedUser: {
          id: '',
          firstName: '',
          lastName: '',
          email: '',
          avatar: '',
          appointments: []
        },
        editedIndex: -1
      };
    },
    methods: {
      setTargetedUser(user) {
        this.editedIndex = this.users.indexOf(user);
        this.editedUser = Object.assign({}, user);
      },

      editUser(user) {
        this.setTargetedUser(user);
        this.dialog = true;
      },

      submitEdit() {
        this.dialog = false;
        fetch(`/api/users/${this.editedUser.id}`, {
          method: "PUT",
          body: JSON.stringify({
            id: this.editedUser.id,
            firstName: this.editedUser.firstName,
            lastName: this.editedUser.lastName,
            email: this.editedUser.email,
            avatar: this.editedUser.avatar
          })
        }).then((res) => {
          if(res.ok) {
            this.fetchUsers();
          }
        })
      },

      dialogReset() {
        this.dialogDelete = false;
        this.dialog = false;
      },

      deleteUser(user) {
        this.setTargetedUser(user);
        this.dialogDelete = true;
      },

      closeDelete() {
        this.dialogDelete = false;
      },

      deleteItemConfirm() {
        fetch(`/api/users/${this.editedUser.id}`, {
          method: 'DELETE'
        }).then((res) => {
          if (res.ok) {
            this.fetchUsers();
          }
        })
      },

      fetchUsers() {
        this.dialogReset();
        fetch("/api/users")
        .then((res) => {
            return res.json();
        }).then((json) => {
          this.users = json;
        })
      }
    },

    created() {
      this.fetchUsers();
    },
}
</script>
