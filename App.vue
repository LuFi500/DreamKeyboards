<template>
  <v-app>
    <v-app-bar
      app
      color="#000000" 
      dark
      class="custom-app-bar"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <div class="nav-buttons">
        <v-btn class="nav-btn" text>
          Home
        </v-btn>

        <v-btn class="nav-btn" text>
          Custom Keyboard
        </v-btn>

        <v-btn class="nav-btn" text>
          Login
        </v-btn>

        <v-btn class="nav-btn" text>
          Register
        </v-btn>

        <v-btn class="nav-btn" text>
          Account Settings
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
/* Ensure custom styles take precedence */
.custom-app-bar {
  border: 1px solid gray !important; /* Gray outline for the app bar */
  box-shadow: none !important; /* Remove default shadow to highlight the outline */
}

/* Maintain the background color of the app bar */
.v-app-bar {
  background-color: #000000; /* Dark background color for the nav bar */
}

.nav-buttons {
  display: flex;
  align-items: center;
  gap: 1rem; /* Adjust spacing between buttons */
}

.nav-btn {
  color: #FFFFFF; /* Button text color */
  transition: background-color 0.3s, color 0.3s; /* Smooth transition for hover effect */
}

.nav-btn:hover {
  background-color: #FF4191; /* Hover background color */
  color: #FFFFFF; /* Hover text color */
}
</style>
