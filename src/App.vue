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

        <!-- Disable Login/Register if user is logged in -->
        <v-btn v-if="!isLoggedIn" :disabled="this.$route.name === 'login'" class="nav-btn" text @click="goToLogin">
          Login
        </v-btn>

        <v-btn v-if="!isLoggedIn" :disabled="this.$route.name === 'register'" class="nav-btn" text @click="goToRegister">
          Register
        </v-btn>

        <!-- Sign Out button - visible only when logged in -->
        <v-btn v-if="isLoggedIn" class="nav-btn" text @click="signOutUser">
          Sign Out
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/router/firebase'; // Import your Firebase auth instance

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false, // Track login status
    };
  },
  methods: {
    goToHome() {
      if (this.$route.name !== 'home') {
        this.$router.push('/');
      }
    },
    goToBuild() {
      if (this.$route.name !== 'build') {
        this.$router.push('/build');
      }
    },
    goToLogin() {
      if (this.$route.name !== 'login') {
        this.$router.push('/login');
      }
    },
    goToRegister() {
      if (this.$route.name !== 'register') {
        this.$router.push('/register');
      }
    },
    async signOutUser() {
      try {
        await signOut(auth); // Sign the user out
        this.isLoggedIn = false; // Update login state

        // Only redirect to home if not already on home
        if (this.$route.name !== 'home') {
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Error signing out:', error);
        alert('Failed to sign out.');
      }
    }
  },
  mounted() {
    // Check the authentication state when the component is mounted
    onAuthStateChanged(auth, (user) => {
      this.isLoggedIn = !!user; // Update login status based on user authentication
    });
  },
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
