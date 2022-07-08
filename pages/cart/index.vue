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
          <TestCard :title="item.title" :price="formatPrice(item.price)" :removeItem="true" />
        </div>
        <div class="d-flex justify-content-center mt-5 mb-5">
          <span class="fs-5 fw-bolder me-3"> Total: </span>
          <span class="fs-5 fw-bold text-success"> ${{ formatPrice(totalPrice) }} </span>
        </div>

        <button
          class="btn btn-color text-white w-100 py-2 mb-4"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#checkoutModal"
        >
          Proceed To Checkout
        </button>
      </div>

      <div class="modal fade" id="checkoutModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content px-3 py-3 bg-white">
            <h2 class="text-left">Checkout detail</h2>
            <div>
              <p class="py-3 fw-bolder">Click below checkout button to confirm</p>
              <div class="d-flex justify-content-between">
                <span class="py-3">{{ cartItems.length }} items</span>
                <span class="py-3 fw-bolder text-success">
                  Total: ${{ formatPrice(totalPrice) }}
                </span>
              </div>
            </div>
            <div class="link">
              <button class="mb-2 btn btn-dark w-100" data-bs-dismiss="modal">Cancel</button>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-color w-100"
                data-bs-dismiss="modal"
                @click="checkoutLocal"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

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
    ...mapActions('buyer', ['checkout']),
    ...mapMutations('buyer', ['removeCartItem']),

    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },

    removeCartItemLocal(id) {
      this.removeCartItem(id);
    },

    async checkoutLocal() {
      const res = await this.checkout(this.cartItems);
      if (res) {
        this.$router.push('/dashboard');
      }
    },
  },
};
</script>
