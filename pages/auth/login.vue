<template>
  <div>
    <div
      class="vw-100 vh-100 d-flex justify-content-center align-items-center spinner-bg position-absolute opacity-50"
      v-if="isLoading === true"
    >
      <div class="spinner-grow" role="status"></div>
    </div>
    <form class="container text-center background vh-100" @submit.prevent="loginLocal">
      <div class="">
        <img src="~/assets/images/fav.png" height="250" width="250" alt="" class="mx-auto mt-12" />
      </div>
      <!-- Email input -->
      <div class="form-outline mb-4 padding-top">
        <input
          type="email"
          id="form2Example1"
          class="form-control py-2 shadow-sm"
          placeholder="Email"
          required
          v-model="form.email"
        />
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <input
          type="password"
          id="form2Example2"
          class="form-control py-2 shadow-sm"
          required
          v-model="form.password"
          placeholder="Password"
        />
      </div>

      <!-- 2 column grid layout for inline styling -->
      <div class="row mb-4">
        <div class="col">
          <NuxtLink to="/auth/forgotpassword">Forgot password?</NuxtLink>
        </div>
        <div class="col">
          <NuxtLink to="/auth/signup">Register</NuxtLink>
        </div>
      </div>

      <!-- Submit button -->
      <div class="d-flex flex-column">
        <button type="submit" class="btn w-100 btn-color py-2 mb-4 shadow">Sign in</button>
        <span class="fs-5 fw-bolder opacity-75 mb-3">Or</span>
        <div class="d-flex justify-content-center gap-2">
          <button type="button" class="btn bg-white py-2 mb-4 shadow">
            <img src="@/assets/images/facebook.png" width="30" alt="" />
          </button>
          <button type="button" class="btn bg-white py-2 mb-4 shadow" @click="googleAuth">
            <img src="@/assets/images/google.png" width="30" alt="" />
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import { mapState, mapActions } from 'vuex';

export default {
  layout: 'introLayout',

  middleware: ['authenticated'],

  data: () => ({
    form: {
      email: '',
      password: '',
    },
  }),

  computed: {
    ...mapState(['isLoading']),
  },
  methods: {
    ...mapActions('auth', ['login', 'load']),
    async loginLocal() {
      try {
        await this.login(this.form);
        this.$router.push('/dashboard');
      } catch (err) {
        console.error('err', err);
      }
    },

    async googleAuth() {
      Auth.federatedSignIn({ provider: 'Google' });
    },
  },
};
</script>

<style scoped>
.btn-color {
  background-color: #11a49b !important;
  color: white;
}
.background {
  background: rgb(226, 226, 226);
}
a {
  text-decoration: none;
  color: #11a49b;
}
.padding-top {
  padding-top: 30%;
}
</style>
