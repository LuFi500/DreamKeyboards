<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="elevation-12" max-width="400">
      <v-card-title class="text-center">Login</v-card-title>

      <v-card-text>
        <v-form ref="form" @submit.prevent="onSubmit">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            :rules="emailRules"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="passwordRules"
            required
          ></v-text-field>

          <v-btn
            type="submit"
            color="primary"
            block
          >
            
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase Auth function
import { auth } from '@/router/firebase'; // Import Firebase auth instance

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
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
  },
  methods: {
    async onSubmit() {
      if (this.$refs.form.validate()) {
        try {
          // Sign in using Firebase Authentication
          const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
          
          // If login is successful
          alert('Login successful!');
          console.log('User:', userCredential.user);
          
          // Redirect to the home page after successful login
          this.$router.push('/');
        } catch (error) {
          // Handle login errors (invalid email/password)
          alert(`Login failed: ${error.message}`);
        }
      } else {
        alert('Please fill out the form correctly.');
      }
    },
  },
};
</script>

<style scoped>
.v-card-title {
  font-size: 50px;
}

.v-btn {
  margin-top: 20px;
}
</style>
