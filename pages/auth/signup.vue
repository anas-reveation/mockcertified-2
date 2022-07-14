<template>
  <div class="container-fluid text-center background vh-100">
    <div class="">
      <img src="~/assets/images/fav.png" height="150" width="150" alt="" class="mx-auto mt-12" />
    </div>
    <form
      v-if="step === steps.register"
      class="container margin-top-form"
      @submit.prevent="registerLocal"
    >
      <div class="mb-3">
        <input
          type="text"
          class="form-control fs-5 py-1"
          id="firstName"
          aria-describedby="emailHelp"
          placeholder="First Name"
          v-model="registerForm.first_name"
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="text"
          class="form-control fs-5 py-1"
          id="lastName"
          aria-describedby="emailHelp"
          placeholder="Last Name"
          v-model="registerForm.last_name"
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="email"
          class="form-control fs-5 py-1"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Email"
          v-model="registerForm.email"
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="password"
          class="form-control fs-5 py-1"
          id="password"
          placeholder="Password"
          v-model="registerForm.password"
          required
        />
      </div>
      <!-- <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="confirmPassword" required />
      </div> -->
      <div class="row mb-4">
        <div class="col">
          <NuxtLink to="/auth/forgotpassword">Forgot password?</NuxtLink>
        </div>
        <div class="col">
          <NuxtLink to="/auth/login">Log In</NuxtLink>
        </div>
      </div>
      <button type="submit" class="btn w-100 btn-primary btn-color py-2 mb-4 mt-2 shadow fs-5">
        Register
      </button>
    </form>

    <form v-else class="container" @submit.prevent="confirmLocal">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="confirmForm.email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Code</label>
        <input
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="confirmForm.code"
          required
        />
      </div>
      <button type="submit" class="btn py-2 mb-4 shadow">Confirm</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { API } from 'aws-amplify';
import { createUser } from '~/graphql/mutations';
const steps = {
  register: 'REGISTER',
  confirm: 'CONFIRM',
};

export default {
  layout: 'introLayout',

  middleware: ['authenticated'],

  data: () => ({
    steps: { ...steps },
    step: steps.register,
    registerForm: {
      email: null,
      password: null,
      first_name: null,
      last_name: null,
    },
    confirmForm: {
      email: '',
      code: '',
    },
    userId: null,
  }),

  methods: {
    ...mapActions('auth', ['register', 'confirmRegistration', 'login']),

    async registerLocal() {
      try {
        const userData = await this.register(this.registerForm);
        if (userData) {
          this.userId = userData.userSub;
          this.createUserLocal();
        }
        this.confirmForm.email = this.registerForm.email;
        this.step = this.steps.confirm;
      } catch (err) {
        console.error('err', err);
      }
    },

    async confirmLocal() {
      try {
        await this.confirmRegistration(this.confirmForm);
        await this.login(this.registerForm);
        this.$router.push('/dashboard');
      } catch (err) {
        console.error('err', err);
      }
    },

    async createUserLocal() {
      const newUser = {
        id: this.userId,
        first_name: this.registerForm.first_name,
        last_name: this.registerForm.last_name,
        email: this.registerForm.email,
      };
      await API.graphql({
        query: createUser,
        variables: { input: newUser },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
    },
  },
};
</script>

<style scoped>
.btn-color {
  background-color: #11a49b !important;
  color: white !important;
}
a {
  text-decoration: none;
  color: #11a49b;
}
.background {
  background: rgb(226, 226, 226);
}
.margin-top-form {
  margin-top: 30%;
}
</style>
