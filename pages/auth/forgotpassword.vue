<template>
  <div class="background vh-100 text-center">
    <div class="">
      <img src="~/assets/images/fav.png" height="250" width="250" alt="" class="mx-auto mt-12" />
    </div>
    <form class="container mt-5">
      <div class="mb-3">
        <input
          type="email"
          class="form-control fs-5 py-1"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Email"
          required
        />
      </div>
      <div class="row mb-4">
        <div class="col">
          <NuxtLink class="" to="/auth/signup">Register</NuxtLink>
        </div>
        <div class="col">
          <NuxtLink to="/auth/login">Log In</NuxtLink>
        </div>
      </div>
      <button type="submit" class="btn w-100 btn-color py-2 mb-4 shadow fs-5">
        Reset Password
      </button>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'introLayout',
  data: () => ({
    email: '',
  }),

  async mounted() {
    // await this.load();
    // console.log('first');
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
