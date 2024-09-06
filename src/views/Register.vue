<template>
  <v-container class="d-flex justify-center align-center fill-height registration-container">
    <v-card
      class="elevation-12 registration-card"
      max-width="400"
      min-height="500"
    >
      <v-img
        src="@/assets/logo.png"
        alt="Logo"
        class="logo-image"
        width="50"
        height="50"
      ></v-img>
      <v-card-title class="text-center">Register</v-card-title>

      <v-card-text>
        <v-form @submit.prevent="onSubmit">
          <v-text-field
            v-model="username"
            label="Username"
            type="text"
            :rules="usernameRules"
            :error-messages="usernameErrors"
            required
            outlined
            dense
          ></v-text-field>

          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            :rules="emailRules"
            :error-messages="emailErrors"
            required
            outlined
            dense
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="passwordRules"
            :error-messages="passwordErrors"
            required
            outlined
            dense
          ></v-text-field>

          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
            :rules="confirmPasswordRules"
            :error-messages="confirmPasswordErrors"
            required
            outlined
            dense
          ></v-text-field>

          <v-btn
            type="submit"
            color="black"
            block
            :disabled="!isFormValid"
          >
            Register
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { auth, db } from '@/router/firebase'; // Import Firebase auth and Firestore instances
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Import Firebase auth functions
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore methods

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  computed: {
    isFormValid() {
      return (
        this.username.length >= 3 &&
        this.email.match(/.+@.+\..+/) &&
        this.password.length >= 6 &&
        this.password === this.confirmPassword
      );
    },
    usernameErrors() {
      const rules = [
        (v) => !!v || 'Username is required',
        (v) => /^[a-zA-Z0-9_]+$/.test(v) || 'Username can only contain letters, numbers, and underscores',
        (v) => v.length >= 3 || 'Username must be at least 3 characters',
        (v) => v.length <= 15 || 'Username must be less than 15 characters',
      ];
      return rules.map(rule => rule(this.username)).filter(msg => msg !== true);
    },
    emailErrors() {
      const rules = [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
      ];
      return rules.map(rule => rule(this.email)).filter(msg => msg !== true);
    },
    passwordErrors() {
      const rules = [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 6 || 'Password must be at least 6 characters',
      ];
      return rules.map(rule => rule(this.password)).filter(msg => msg !== true);
    },
    confirmPasswordErrors() {
      const rules = [
        (v) => !!v || 'Confirmation is required',
        (v) => v === this.password || 'Passwords must match',
      ];
      return rules.map(rule => rule(this.confirmPassword)).filter(msg => msg !== true);
    },
  },
  methods: {
    async onSubmit() {
      if (this.isFormValid) {
        try {
          // Register the user with Firebase Authentication
          const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
          const user = userCredential.user;

          // Update the user profile with the username
          await updateProfile(user, {
            displayName: this.username,
          });

          // Write user data to Firestore
          await setDoc(doc(db, 'users', user.uid), {
            username: this.username,
            email: this.email,
            userId: user.uid,
          });

          // Redirect to the login page or handle redundant navigation
          if (this.$route.path !== '/login') {
            this.$router.push('/login');
          } else {
            alert('You are already on the login page.');
          }

          alert('Registration successful!');
        } catch (error) {
          alert(`Registration failed: ${error.message}`);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Background color for the whole container */
.registration-container {
  background-color: #E8F1F2; /* Soft teal background color */
  padding: 20px; /* Reduced padding around the container */
}

/* Title styling */
.v-card-title {
  font-size: 22px; /* Slightly smaller font size */
  color: #000000; /* Black for the title text */
}

/* Button styling */
.v-btn {
  margin-top: 15px;
  background-color: #FF4191; /* Pinkish color for the button background */
  color: #ffffff; /* Light yellow for the button text */
}

.v-btn:hover {
  background-color: #E90074; /* Darker pink color for the button on hover */
  border-color: #FF4191; /* Pinkish border for the card */
  color: #ff78e2; /* Keep the light yellow text on hover */
}

/* Input fields styling */
.v-text-field {
  max-width: 300px; /* Set maximum width for input fields */
  margin-bottom: 10px; /* Reduced space between input fields */
}

.v-text-field input {
  font-size: 16px; /* Slightly smaller input text */
  color: #000000; /* Black text for input fields */
}

.v-text-field label {
  color: #E90074; /* Darker pink for input labels */
}

/* Card styling */
.v-card {
  border-color: #FF4191; /* Pinkish border for the card */
  border-width: 2px;
  border-style: solid;
  padding: 20px;
  position: relative;
  background-color: rgb(255, 255, 255); /* Ensures the card stands out against the background */
}

/* Logo positioning */
.logo-image {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
