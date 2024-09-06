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
            Login
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase Auth function
import { auth } from '@/router/firebase'; // Import Firebase auth instance

export default {
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const form = ref(null); // Ref for the form

    const emailRules = [
      (v) => !!v || 'Email is required',
      (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
    ];

    const passwordRules = [
      (v) => !!v || 'Password is required',
      (v) => v.length >= 6 || 'Password must be at least 6 characters',
    ];

    const onSubmit = async () => {
      // Validate the form using the ref
      if (form.value.validate()) {
        try {
          // Sign in using Firebase Authentication
          const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
          
          // If login is successful
          alert('Login successful!');
          console.log('User:', userCredential.user);
          
          // Redirect to a new page if needed (e.g., dashboard)
          // this.$router.push('/dashboard'); // Example redirect after successful login
        } catch (error) {
          // Handle login errors (invalid email/password)
          alert(`Login failed: ${error.message}`);
        }
      } else {
        // If form is invalid
        alert('Please fill out the form correctly.');
      }
    };

    return {
      email,
      password,
      emailRules,
      passwordRules,
      form, // Return form ref
      onSubmit,
    };
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
