<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0">
        <div id="nav" class="nav">

          <router-link to="/" class="nav-button">Home</router-link>
          <router-link to="/AddMember"class="nav-button">AddMember</router-link>
        </div>
        <router-view />
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

</style>