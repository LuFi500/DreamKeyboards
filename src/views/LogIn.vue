<template>
  <v-app class="black-background">
    <v-content>
      <v-container class="d-flex justify-center align-center fill-height">
        <v-card class="elevation-12 login-card">
          <v-card-title class="text-center login-title">Login</v-card-title>

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
                class="login-btn"
                text
                block
                @click="onSubmit"
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
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
          const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
          alert('Login successful!');
          this.$router.push('/');
        } catch (error) {
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
/* Add the Coolvetica font */
@import url('https://fonts.googleapis.com/css2?family=Coolvetica&display=swap');

html, body, #app, .v-application, .v-content {
  height: 100%;
  margin: 0;
  padding: 0;
}

.v-container {
  min-height: 100vh;
}

.black-background {
  background-color: black;
  color: white;
  min-height: 100vh;
}

.login-card {
  width: auto;
  max-width: 400px;
  padding: 20px;
  margin: auto;
  border: 1px solid gray;
}

.login-title {
  font-family: 'Coolvetica', sans-serif;
  font-size: 25px;
  color: rgb(0, 0, 0);
}

.v-label {
  font-family: 'Coolvetica', sans-serif;
  color: gray;
}

/* Match the button style with the app */
.login-btn {
  background-color: black !important;
  color: white !important;
  border: 1px solid white !important;
  transition: background-color 0.3s, color 0.3s;
}

.login-btn:hover {
  background-color: #FF4191 !important;
  color: white !important;
}
</style>
