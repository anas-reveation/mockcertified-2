<template>
  <div class="background vh-100 text-center">
    <div class="">
      <img src="~/assets/images/fav.png" height="250" width="250" alt="" class="mx-auto mt-12" />
    </div>
    <form v-if="pageCount === 0" class="container mt-5" @submit.prevent="resetPassword">
      <div class="mb-3">
        <input
          type="email"
          class="form-control fs-5 py-1"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Email"
          v-model="email"
          required
        />
      </div>
      <button type="submit" class="btn w-100 btn-color py-2 mb-4 shadow fs-5">
        Reset Password
      </button>
    </form>

    <!-- PAGE 2 -->
    <form v-else class="container mt-5" @submit.prevent="newPasswordSubmit">
      <div class="mb-3">
        <input
          type="text"
          class="form-control fs-5 py-1"
          placeholder="Code"
          v-model="code"
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="password"
          class="form-control fs-5 py-1"
          placeholder="Password"
          v-model="password"
          @input="checkPasswordMatch"
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="password"
          class="form-control fs-5 py-1"
          :class="!passwordMatched && ' border-danger'"
          placeholder="Confirm Password"
          v-model="confirmPassword"
          @input="checkPasswordMatch"
          required
        />
      </div>
      <button type="submit" class="btn w-100 btn-color py-2 mb-4 shadow fs-5">Confirm</button>
    </form>

    <div class="row mb-4">
      <div class="col">
        <NuxtLink class="" to="/auth/signup">Register</NuxtLink>
      </div>
      <div class="col">
        <NuxtLink to="/auth/login">Log In</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import { mapMutations } from 'vuex';

export default {
  layout: 'introLayout',

  middleware: ['authenticated'],

  data: () => ({
    pageCount: 0,
    email: '',
    password: null,
    confirmPassword: null,
    code: null,
    passwordMatched: false,
  }),

  methods: {
    ...mapMutations(['SET_LOADER']),

    checkPasswordMatch() {
      if (this.password === this.confirmPassword) {
        this.passwordMatched = true;
      } else {
        this.passwordMatched = false;
      }
    },

    async resetPassword() {
      this.SET_LOADER(true);
      // Send confirmation code to user's email
      try {
        await Auth.forgotPassword(this.email);
        this.SET_LOADER(false);
        alert('Check your email');
        this.pageCount += 1;
      } catch (err) {
        this.SET_LOADER(false);
        console.error('ERR', err);
      }
    },

    async newPasswordSubmit() {
      this.SET_LOADER(true);
      // Collect confirmation code and new password, then
      try {
        await Auth.forgotPasswordSubmit(this.email, this.code, this.password);
        this.SET_LOADER(false);
        this.$router.push('/auth/login');
      } catch (err) {
        this.SET_LOADER(false);
        console.error('ERR', err);
      }
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
.spinner-bg {
  background: #656565 !important;
}
</style>
