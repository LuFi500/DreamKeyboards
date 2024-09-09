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
        <v-form ref="form" @submit.prevent="onSubmit">
          <v-text-field
            v-model="username"
            label="Username"
            type="text"
            :rules="usernameTouched || formSubmitted ? usernameRules : []" 
            @blur="usernameTouched = true" 
            required
            outlined
            dense
          ></v-text-field>

          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            :rules="emailTouched || formSubmitted ? emailRules : []"
            @blur="emailTouched = true"
            required
            outlined
            dense
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="passwordTouched || formSubmitted ? passwordRules : []"
            @blur="passwordTouched = true"
            required
            outlined
            dense
          ></v-text-field>

          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
            :rules="confirmPasswordTouched || formSubmitted ? confirmPasswordRules : []"
            @blur="confirmPasswordTouched = true"
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
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/router/firebase'; // Ensure the correct firebase path

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      usernameTouched: false,
      emailTouched: false,
      passwordTouched: false,
      confirmPasswordTouched: false,
      formSubmitted: false,
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
    usernameRules() {
      return [
        (v) => !!v || 'Username is required',
        (v) => /^[a-zA-Z0-9_]+$/.test(v) || 'Username can only contain letters, numbers, and underscores',
        (v) => v.length >= 3 || 'Username must be at least 3 characters',
        (v) => v.length <= 15 || 'Username must be less than 15 characters',
      ];
    },
    emailRules() {
      return [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
      ];
    },
    passwordRules() {
      return [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 6 || 'Password must be at least 6 characters',
      ];
    },
    confirmPasswordRules() {
      return [
        (v) => !!v || 'Confirming password is required',
        (v) => v === this.password || 'Passwords must match',
      ];
    },
  },
  methods: {
    async onSubmit() {
      // Mark all fields as touched on form submit
      this.formSubmitted = true;

      if (this.isFormValid) {
        try {
          // Firebase Authentication
          const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
          const user = userCredential.user;

          // Update the user profile with the username
          await updateProfile(user, {
            displayName: this.username,
          });

          // Save the user data in Firestore
          await setDoc(doc(db, 'users', user.uid), {
            username: this.username,
            email: this.email,
            userId: user.uid,
          });

          // Redirect to the login page after registration
          this.$router.push('/login');

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
/* Styling for the form */
.registration-container {
  background-color: #E8F1F2;
  padding: 20px;
}

.v-card-title {
  font-size: 22px;
  color: #000000;
}

.v-btn {
  margin-top: 15px;
  background-color: #FF4191;
  color: #ffffff;
}

.v-btn:hover {
  background-color: #E90074;
  color: #ff78e2;
}

.v-text-field {
  max-width: 300px;
  margin-bottom: 10px;
}

.v-text-field input {
  font-size: 16px;
  color: #000000;
}

.v-text-field label {
  color: #E90074;
}

.v-card {
  border-color: #FF4191;
  border-width: 2px;
  border-style: solid;
  padding: 20px;
  background-color: rgb(255, 255, 255);
}

.logo-image {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
