<template>
  <div class="d-flex justify-content-between">
    <div class="container text-center bg-white py-3">
      <div class="row">
        <div class="col">
          <img class="opacity-75" src="@/assets/images/003-exit.png" alt="" @click="userLogOut" />
        </div>
        <div class="col">
          <NuxtLink to="/category"><img src="@/assets/images/002-notebook.png" alt="" /></NuxtLink>
        </div>
        <div class="col">
          <NuxtLink to="/cart">
            <img src="@/assets/images/001-shopping-cart.png" alt="" /><span class="fw-bolder">
              ({{ cartItems.length }})
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState('buyer', ['cartItems']),
  },

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
/* 
.fixed-bottom {
    position: sticky;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1030;
} */
</style>
