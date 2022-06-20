<template>
  <div>
    <form v-if="step === steps.register" class="container" @submit.prevent="registerLocal">
      <!-- <div class="mb-3">
        <label for="firstName" class="form-label">First Name</label>
        <input
          type="email"
          class="form-control"
          id="firstName"
          aria-describedby="emailHelp"
          required
        />
      </div>
       <div class="mb-3">
        <label for="lastName" class="form-label">Last Name</label>
        <input
          type="email"
          class="form-control"
          id="lastName"
          aria-describedby="emailHelp"
          required
        />
      </div> -->
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="registerForm.email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="registerForm.password"
          required
        />
      </div>
      <!-- <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="confirmPassword" required />
      </div> -->
      <button type="submit" class="btn btn-primary">Register</button>
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
      <button type="submit" class="btn btn-primary">Confirm</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

const steps = {
  register: 'REGISTER',
  confirm: 'CONFIRM',
};

export default {
  data: () => ({
    steps: { ...steps },
    step: steps.register,
    registerForm: {
      email: '',
      password: '',
    },
    confirmForm: {
      email: '',
      code: '',
    },
  }),

  methods: {
    ...mapActions('auth', ['register', 'confirmRegistration', 'login']),

    async registerLocal() {
      try {
        await this.register(this.registerForm);
        this.confirmForm.email = this.registerForm.email;
        this.step = this.steps.confirm;
      } catch (err) {
        console.log('err', err);
      }
    },

    async confirmLocal() {
      try {
        await this.confirmRegistration(this.confirmForm);
        await this.login(this.registerForm);
        this.$router.push('/');
      } catch (err) {
        console.log('err', err);
      }
    },
  },
};
</script>
