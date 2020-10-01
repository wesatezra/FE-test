<template>
  <div class="home">
    <v-data-table :headers="headers" :items="users" class="elevation-2">
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
        users: []
      };
    },

    async created() {
      let response = await fetch("/api/users");
      let json = await response.json();
      this.users = json;
    }
}
</script>
