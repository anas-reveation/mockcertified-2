<template>
  <div class="container text-center background vh-100">
    <div class="">
      <img src="~/assets/images/fav.png" height="250" width="250" alt="" class="mx-auto mt-12" />
    </div>
    <div class="d-grid gap-2 padding-top">
      <button class="btn py-2 shadow mb-1 bg-body rounded" type="button" @click="login">
        Log In
      </button>
      <button class="btn mt-2 py-2 btn-color" type="button" @click="register">Register</button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'introLayout',

  data() {
    return {};
  },
  methods: {
    login() {
      this.$router.push('auth/login');
    },
    register() {
      this.$router.push('auth/signup');
    },
  },
};
</script>

<style scoped>
.padding-top {
  padding-top: 50%;
}
.btn-color {
  background-color: #11a49b !important;
  color: white;
}
.background {
  background: rgb(226, 226, 226);
}
</style>
