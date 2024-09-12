<template>
  <v-app>
    <v-container class="d-flex justify-center align-center fill-height">
      <v-card class="elevation-12 payment-card">
        <v-card-title class="text-center">Payment & Shipping Form</v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid">
            <!-- Shipping Details -->
            <v-text-field
              v-model="shippingName"
              label="Full Name"
              :rules="nameRules"
              required
            ></v-text-field>

            <v-text-field
              v-model="address"
              label="Address"
              :rules="addressRules"
              required
            ></v-text-field>

            <v-text-field
              v-model="city"
              label="City"
              :rules="cityRules"
              required
            ></v-text-field>

            <v-text-field
              v-model="state"
              label="State/Province"
              :rules="stateRules"
              required
            ></v-text-field>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="zipCode"
                  label="Zip/Postal Code"
                  :rules="zipRules"
                  required
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field
                  v-model="country"
                  label="Country"
                  :rules="countryRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Payment Details -->
            <v-divider class="my-4"></v-divider>
            <v-text-field
              v-model="nameOnCard"
              label="Name on Card"
              :rules="nameRules"
              required
            ></v-text-field>

            <v-text-field
              v-model="cardNumber"
              label="Card Number"
              :rules="cardNumberRules"
              required
            ></v-text-field>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="expiryDate"
                  label="Expiry Date (MM/YY)"
                  :rules="expiryDateRules"
                  required
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field
                  v-model="cvc"
                  label="CVC"
                  :rules="cvcRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Pay Button -->
            <v-btn
              class="pay-button"
              color="primary"
              block
              :disabled="!valid"
              @click="submitForm"
            >
              Pay {{ totalAmount }} EUR
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      totalAmount: this.$route.query.totalAmount || 20, // Retrieve the total amount from route params

      // Shipping Details
      shippingName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',

      // Payment Details
      nameOnCard: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',

      // Validation rules
      nameRules: [(v) => !!v || 'Name is required'],
      addressRules: [(v) => !!v || 'Address is required'],
      cityRules: [(v) => !!v || 'City is required'],
      stateRules: [(v) => !!v || 'State/Province is required'],
      zipRules: [
        (v) => !!v || 'Zip/Postal Code is required',
        (v) => /^\d{5}(-\d{4})?$/.test(v) || 'Invalid Zip Code',
      ],
      countryRules: [(v) => !!v || 'Country is required'],
      cardNumberRules: [
        (v) => !!v || 'Card Number is required',
        (v) => /^\d{16}$/.test(v) || 'Card Number must be 16 digits',
      ],
      expiryDateRules: [
        (v) => !!v || 'Expiry Date is required',
        (v) => /^\d{2}\/\d{2}$/.test(v) || 'Expiry Date must be in MM/YY format',
      ],
      cvcRules: [
        (v) => !!v || 'CVC is required',
        (v) => /^\d{3,4}$/.test(v) || 'CVC must be 3 or 4 digits',
      ],
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        alert(`Payment of ${this.totalAmount} EUR processed!`);
      } else {
        alert('Please fill out all fields correctly.');
      }
    },
  },
};
</script>

<style scoped>
.payment-card {
  max-width: 600px;
  padding: 20px;
  margin: auto;
}

.pay-button {
  margin-top: 20px;
  background-color: #6772e5;
  color: white;
  font-size: 16px;
}

.pay-button:hover {
  background-color: #556cd6;
}

.my-4 {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
