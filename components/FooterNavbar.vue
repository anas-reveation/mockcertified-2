<template>
  <div class="fixed-bottom d-flex justify-content-between">
    <div class="container text-center fixed-bottom bg-white py-3">
      <div class="row">
        <div class="col">
          <img class="opacity-75" src="@/assets/images/003-exit.png" alt="" @click="userLogOut" />
        </div>
        <div class="col">
          <NuxtLink to="/category"><img src="@/assets/images/002-notebook.png" alt="" /></NuxtLink>
        </div>
        <div class="col">
          <NuxtLink to="/cart"
            ><img src="@/assets/images/001-shopping-cart.png" alt="" /><span class="fw-bolder"
              >(0)</span
            ></NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  methods: {
    ...mapActions('auth', ['logout']),
    async userLogOut() {
      const res = await this.logout();
      if (res) {
        this.$router.push('/auth/login');
      }
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
  color: black;
}
</style>
