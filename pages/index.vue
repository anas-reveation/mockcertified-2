<template>
  <div class="position-relative">
    <div class="position-absolute top-0 end-0 p-2">
      <NuxtLink to="/">
        <img src="@/assets/images/logo.svg" alt="logo" />
      </NuxtLink>
    </div>
    <div
      v-show="!isDisable"
      class="container d-flex flex-column justify-content-center align-items-center vh-100"
    >
      <div>
        <img
          src="~/assets/images/Illustration.svg"
          height="250"
          width="250"
          alt=""
          class="mx-auto mt-12"
        />
      </div>
      <button
        class="btn text-primary border border-2 border-primary rounded w-75 py-2 mt-5 mb-4"
        type="button"
        @click="$router.push('auth/login')"
      >
        Login
      </button>
      <button
        class="btn btn-secondary border border-2 border-primary rounded fw-bold w-75 py-2 mb-1"
        type="button"
        @click="$router.push('auth/signup')"
      >
        Register
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  layout: 'introLayout',

  middleware: ['authenticated'],

  data() {
    return {
      isDisable: true,
    };
  },

  computed: {
    ...mapState('auth', ['isAuthenticated']),
  },

  async mounted() {
    if (this.isAuthenticated) {
      this.$router.push('/protected/dashboard');

      return;
    }
    this.isDisable = false;
  },
};
</script>
