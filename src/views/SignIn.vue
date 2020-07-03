<template>
  <form class="auth-form">
    <b>
      {{ currentUser ? "S" : "Not s" }}igned in
      {{ currentUser ? `as ${currentUser}` : "" }}
    </b>
    <p v-if="currentUser">
      {{ auth.roles }}
    </p>

    <div
      v-if="!currentUser"
      style="display: flex; flex-direction: column; max-width: 186px"
    >
      <input
        :class="{
          error: this.$v.userDetails.email.$invalid && this.attempted
        }"
        type="text"
        v-model="userDetails.email"
        name="email"
        placeholder="Email"
        autocomplete="off"
      />
      <div class="error-messages" v-if="this.attempted">
        <div class="error" v-if="!$v.userDetails.email.required">
          Email is required
        </div>
        <div class="error" v-if="!$v.userDetails.email.email">
          Must enter a valid email address
        </div>
      </div>

      <div class="password-container">
        <input
          :class="{
            error: this.$v.userDetails.password.$invalid && this.attempted
          }"
          :type="showPassword ? 'text' : 'password'"
          v-model="userDetails.password"
          name="password"
          placeholder="Password"
          autocomplete="off"
        />
        <svg
          :class="{
            error: this.$v.userDetails.password.$invalid && this.attempted
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
        <div class="error" v-if="!$v.userDetails.password.required">
          Password is required
        </div>
        <div class="error" v-if="!$v.userDetails.password.minLength">
          Must be at least
          {{ $v.userDetails.password.$params.minLength.min }} characters long
        </div>
      </div>
    </div>

    <input
      @click.prevent="onSubmit"
      type="submit"
      :value="!currentUser ? 'Sign In' : 'Sign Out'"
      :class="!currentUser ? 'btn btn-primary' : 'btn btn-secondary'"
    />

    <div class="error" style="margin-top: 30px" v-if="error">{{ error }}</div>
    <div style="margin-top: 30px; color: #2c3e50" v-if="signInStatus">{{ signInStatus }}</div>
    
  </form>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";

export default {
  name: "SignIn",
  data() {
    return {
      userDetails: {
        email: "",
        password: ""
      },
      attempted: false,
      showPassword: false
    };
  },
  computed: mapState(["auth", "currentUser", "error", "signInStatus"]),
  methods: {
    onSubmit() {
      if (!this.currentUser) {
        if (!this.$v.userDetails.$invalid) {
          this.signIn(this.userDetails);
        }
      } else {
        this.signOut();
      }
      this.attempted = true;
    },
    ...mapActions(["signIn", "signOut"])
  },
  validations: {
    userDetails: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  }
};
</script>
