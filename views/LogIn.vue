<template>
    <v-container class="d-flex justify-center align-center fill-height">
      <v-card class="elevation-12" max-width="400">
        <v-card-title class="text-center">Login</v-card-title>
  
        <v-card-text>
          <v-form @submit.prevent="onSubmit">
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
              :disabled="!valid"
            >
              Login
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  
  export default {
    name: 'Login',
    setup() {
      const email = ref('');
      const password = ref('');
      
      const emailRules = [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
      ];
  
      const passwordRules = [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 6 || 'Password must be at least 6 characters',
      ];
  
      const valid = computed(() => {
        return emailRules.every(rule => rule(email.value) === true) &&
               passwordRules.every(rule => rule(password.value) === true);
      });
  
      const onSubmit = () => {
        if (valid.value) {
          
          alert('Login successful!');
        }
      };
  
      return {
        email,
        password,
        emailRules,
        passwordRules,
        valid,
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
  