<template>
  <form class="container" @submit.prevent="loginLocal">
    <!-- Email input -->
    <div class="form-outline mb-4">
      <input type="email" id="form2Example1" class="form-control" required v-model="form.email" />
      <label class="form-label" for="form2Example1">Email address</label>
    </div>

    <!-- Password input -->
    <div class="form-outline mb-4">
      <input
        type="password"
        id="form2Example2"
        class="form-control"
        required
        v-model="form.password"
      />
      <label class="form-label" for="form2Example2">Password</label>
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
    <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    form: {
      email: '',
      password: '',
    },
  }),

  async mounted() {
    // await this.load();
    // console.log('first');
  },

  methods: {
    ...mapActions('auth', ['login', 'load']),
    async loginLocal() {
      try {
        await this.login(this.form);
        this.$router.push('/');
      } catch (err) {
        console.log('err', err);
      }
    },
  },
};
</script>
