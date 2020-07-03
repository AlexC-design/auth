<template>
  <form class="auth-form">
    <input
      :class="{
        error: this.$v.signUpDetails.firstName.$invalid && this.attempted
      }"
      type="text"
      v-model="signUpDetails.firstName"
      name="firstName"
      placeholder="First Name"
      autocomplete="off"
    />
    <div class="error-messages" v-if="this.attempted">
      <div class="error" v-if="!$v.signUpDetails.firstName.minLength">
        Name must have at least
        {{ $v.signUpDetails.firstName.$params.minLength.min }} letters.
      </div>
      <div class="error" v-if="!$v.signUpDetails.firstName.required">
        First name is required
      </div>
    </div>

    <input
      :class="{
        error: this.$v.signUpDetails.lastName.$invalid && this.attempted
      }"
      type="text"
      v-model="signUpDetails.lastName"
      name="lastName"
      placeholder="Last Name"
      autocomplete="off"
    />
    <div class="error-messages" v-if="this.attempted">
      <div class="error" v-if="!$v.signUpDetails.lastName.required">
        Last name is required
      </div>
    </div>

    <input
      :class="{
        error: this.$v.signUpDetails.daytimePhone.$invalid && this.attempted
      }"
      type="number"
      v-model="signUpDetails.daytimePhone"
      name="daytimePhone"
      placeholder="Phone"
      autocomplete="off"
    />
    <div class="error-messages" v-if="this.attempted">
      <div class="error" v-if="!$v.signUpDetails.daytimePhone.required">
        Phone number is required
      </div>
      <div class="error" v-if="!$v.signUpDetails.daytimePhone.phoneRegex">
        Must enter a valid UK number
      </div>
    </div>

    <input
      :class="{
        error: this.$v.signUpDetails.email.$invalid && this.attempted
      }"
      type="text"
      v-model="signUpDetails.email"
      name="email"
      placeholder="Email"
      autocomplete="off"
    />
    <div class="error-messages" v-if="this.attempted">
      <div class="error" v-if="!$v.signUpDetails.email.required">
        Email is required
      </div>
      <div class="error" v-if="!$v.signUpDetails.email.email">
        Must enter a valid email address
      </div>
    </div>

    <div class="password-container">
      <input
        :class="{
          error: this.$v.signUpDetails.password.$invalid && this.attempted
        }"
        :type="showPassword ? 'text' : 'password'"
        v-model="signUpDetails.password"
        name="password"
        placeholder="Password"
        autocomplete="off"
      />
      <svg
        :class="{
          error: this.$v.signUpDetails.password.$invalid && this.attempted
        }"
        width="2em"
        height="2em"
        viewBox="0 0 16 16"
        class="bi bi-eye"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        @click="showPassword = !showPassword"
      >
        <path
          fill-rule="evenodd"
          d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"
        />
        <path
          fill-rule="evenodd"
          d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
        />
      </svg>
    </div>
    <div class="error-messages" v-if="this.attempted">
      <div class="error" v-if="!$v.signUpDetails.password.required">
        Password is required
      </div>
      <div class="error" v-if="!$v.signUpDetails.password.minLength">
        Must be at least
        {{ $v.signUpDetails.password.$params.minLength.min }} characters long
      </div>
    </div>

    <input
      @click.prevent="onSubmit"
      type="submit"
      value="Sign Up"
      class="btn btn-primary"
    />

    <div style="margin-top: 30px">
      <p
        v-if="signUpStatus ? signUpStatus.includes('@') : false"
        style="color: #78c2ad"
      >
        User created: <b>{{ signUpStatus }}</b>
      </p>
      <p
        v-if="signUpStatus === 'loading'"
        style="color: #2c3e50"
      >
        <b>Creating account...</b>
      </p>
      <p v-if="signUpStatus === 'error'" style="color: red">
        Could not create account
      </p>
    </div>
  </form>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import { helpers } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";

const phoneRegex = helpers.regex(
  "phoneRegex",
  /^0([1-6][0-9]{8,10}|7[0-9]{9})$/
);

export default {
  name: "SignUp",
  data() {
    return {
      signUpDetails: {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        daytimePhone: "",
        referralCodeFromFriend: "",
        referralSource: "Search engine",
        storageReason: "Making space in my home",
        agreeToTerms: true,
        source: "Test app",
        EUPrivacyOptIn: true,
        termsAndConditions: true,
        taxCode: "",
        mobilePhone: null,
        postcode: null,
        businessName: null
      },
      attempted: false,
      showPassword: false
    };
  },
  computed: mapState(["signUpStatus"]),

  methods: {
    onSubmit() {
      if (!this.$v.signUpDetails.$invalid) {
        this.signUp(this.signUpDetails);
      }
      this.attempted = true;
    },
    ...mapActions(["signUp"])
  },
  validations: {
    signUpDetails: {
      firstName: {
        required,
        minLength: minLength(2)
      },
      lastName: {
        required
      },
      daytimePhone: {
        required,
        phoneRegex
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  updated: function() {
    this.signUpDetails.confirmPassword = this.signUpDetails.password;
  }
};
</script>

<style>
.auth-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.auth-form input {
  margin: 20px 0 0;
  min-height: 30px;
}

.error {
  color: red;
  outline-color: red;
}

input.error {
  border: solid 1px red;
  border-radius: 2px;

  animation: wiggle cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s 2 forwards;
}

input.error::placeholder {
  color: rgba(255, 0, 0, 0.5);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.password-container {
  position: relative;
}

.password-container svg {
  position: absolute;
  top: 19px;
  right: 7px;
  padding: 4px;
  cursor: pointer;
}
</style>
