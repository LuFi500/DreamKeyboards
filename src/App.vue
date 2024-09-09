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
          class="mr-2"
          contain
          :src="require('@/assets/keyboardlogo2.png')"
          transition="scale-transition"
          width="73"
        />

        <v-img
          alt="Vuetify Name"
          class="mr-2"
          contain
          :src="require('@/assets/dreamtext2.png')"
          transition="scale-transition"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <div class="nav-buttons">
        <v-btn :disabled="this.$route.name === 'home'" class="nav-btn" text @click="goToHome">
          Home
        </v-btn>

        <v-btn :disabled="this.$route.name === 'build'" class="nav-btn" text @click="goToBuild">
          Custom Keyboard
        </v-btn>

        <v-btn :disabled="this.$route.name === 'login'" class="nav-btn" text @click="goToLogin">
          Login
        </v-btn>

        <v-btn :disabled="this.$route.name === 'register'" class="nav-btn" text @click="goToRegister">
          Register
        </v-btn>

        <v-btn :disabled="this.$route.name === 'profile'" class="nav-btn" text @click="goToProfile">
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
  methods: {
    goToHome() {
      this.$router.push('/');
    },
    goToBuild() {
      this.$router.push('/build');
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },
    goToProfile() {
      this.$router.push('/profile');
    }
  }
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
