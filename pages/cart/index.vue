<template>
  <ClientOnly>
    <div class="container">
      <div v-if="!cartItems.length" class="card">
        <div class="card-header">Your cart is empty</div>
        <div class="card-body">
          <h5 class="card-title">No items in your cart</h5>
          <p class="card-text">Buy a test, click below button</p>
          <NuxtLink to="/category" class="btn btn-secondary border border-2 border-dark"
            >Buy a test</NuxtLink
          >
        </div>
      </div>

      <div v-else class="margin_bottom2">
        <div class="mb-2">
          <span class="fs-5 fw-bolder"> Amount: </span>
          <span class="fs-5 fw-bolder text-primary"> ${{ formatPrice(totalPrice) }} </span>
        </div>
        <div v-for="item in cartItems" :key="item.id" class="mb-3">
          <TestCards
            :title="item.title"
            :price="`$${formatPrice(item.price)}`"
            :removeItem="true"
            :description="`${item.time_limit} mins • ${
              item.questions.items.length
            } questions • ${totalMarks(item.questions.items)} marks`"
            :testId="item.id"
          />
        </div>

        <div class="bg-white text-center fixed-bottom p-2 margin_bottom">
          <button
            class="btn text-dark border border-2 border-dark w-75 py-2 bg_btn"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#checkoutModal"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>

      <div class="modal fade" id="checkoutModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content px-3 py-3 bg-white">
            <h2 class="fw-bolder">Checkout Detail</h2>
            <p>
              No. of items: <span class="text-primary fw-bolder">{{ cartItems.length }}</span>
            </p>
            <p>
              Amount to be paid:
              <span class="text-primary fw-bolder">${{ formatPrice(totalPrice) }}</span>
            </p>
            <div class="text-center">
              <button
                type="button"
                class="btn border border-2 border-dark w-75 bg_btn"
                data-bs-dismiss="modal"
                @click="checkoutLocal"
              >
                Confirm Checkout
              </button>

              <button class="my-2 btn btn-dark w-75" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
import { mapState, mapActions } from 'vuex';

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

    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },

    totalMarks(questionsArr) {
      let totalMarks = 0;
      questionsArr.map((ques) => {
        totalMarks += ques.marks;
      });
      return totalMarks;
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

<style scoped>
.bg_btn {
  background: #94e4bd;
}

/* FooterNavbar is related style is in default layout */
.margin_bottom {
  margin-bottom: 80px;
}

.margin_bottom2 {
  margin-bottom: 9rem;
}
/* FooterNavbar is related style is in default layout */
</style>
