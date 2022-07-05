<template>
  <ClientOnly>
    <div class="container-fluid">
      <div v-if="cartItems.length <= 0" class="container">
        <div class="card">
          <div class="card-header">Your cart is empty</div>
          <div class="card-body">
            <h5 class="card-title">No items in your cart</h5>
            <p class="card-text">Buy a test, click below button</p>
            <NuxtLink to="/category" class="btn btn-outline-success">Buy a test</NuxtLink>
          </div>
        </div>
      </div>

      <div v-else>
        <div v-for="item in cartItems" :key="item.id" @click="removeCartItemLocal(item.id)">
          <TestCard :title="item.title" :price="item.price" :removeItem="true" />
        </div>
        <div class="d-flex justify-content-center mt-5 mb-5">
          <span class="fs-5 fw-bolder me-3"> Total: </span>
          <span class="fs-5 fw-bold text-success"> ${{ totalPrice }} </span>
        </div>

        <button type="submit" class="btn btn-primary btn-color w-100 py-2 mb-4">
          Proceed To Checkout
        </button>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  middleware: ['authenticated'],

  computed: {
    ...mapState('buyer', ['cartItems']),

    totalPrice() {
      let total = 0;
      if (this.cartItems.length > 0) {
      }
      this.cartItems.map((item) => {
        total += item.price;
      });
      return total;
    },
  },

  methods: {
    ...mapMutations('buyer', ['removeCartItem']),

    removeCartItemLocal(id) {
      this.removeCartItem(id);
    },
  },
};
</script>

<style scoped>
.btn-color {
  background-color: #11a49b !important;
  color: white;
}
</style>
