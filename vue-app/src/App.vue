<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0 max-height d-flex flex-column">
        <div id="nav" class="nav d-flex flex-row flex-grow-0">
          <router-link to="/" class="nav-button">Home</router-link>
          <router-link to="/AddMember" class="nav-button">AddMember</router-link>
          <router-link to="/Appointment" class="nav-button">Book Appointment</router-link>
        </div>
        <router-view class="flex-grow-1"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: "App"
  };
</script>

<style>
  .nav {
    background: #0A0F1E;
    color: white;
    margin: 0;
    padding: 10px;
  }

  .nav .nav-button {
    margin-left: 10px;
    text-decoration: none;
    color: white;
    padding: 5px; 
  }

  .nav-button:hover {
    color: #FFC000;
  }

  /* removes the ugly outline after click */
  a {
    outline: none;
  }

  .max-height {
    height: 100%;
  }

</style>