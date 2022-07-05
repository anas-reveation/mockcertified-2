<template>
  <div class="container-fluid">
    <div v-for="test in allTestByCategory" :key="test.id" @click="addToCartLocal(test)">
      <TestCard
        :title="test.category"
        :timeLimit="test.time_limit"
        :href="`/category/${test.id}`"
        :price="test.price"
        :addItem="true"
      />
    </div>
    <!-- <div class="btn shadow w-100 d-flex justify-content-between align-items-center">
      <img
        src="https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010__340.jpg"
        width="70"
        height="70"
        @click="product"
        alt=""
      />
      <div class="d-flex flex-column" @click="product">
        <span class="fs-5 fw-bolder">Test 1</span>
        <span class="fs-6 fw-normal">40 min</span>
      </div>
      <div class="d-flex flex-column">
        <img src="@/assets/images/plus.png" class="m-auto" width="25" height="25" alt="" />
        <span class="fs-6 fw-bolder">$20.99</span>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  middleware: ['authenticated'],

  data() {
    return {
      allTestByCategory: [],
    };
  },

  computed: {
    ...mapState('buyer', ['cartItems']),
  },

  async asyncData({ params, store, redirect }) {
    const categoryId = params.categoryId;
    return { categoryId };
  },

  async mounted() {
    this.allTestByCategory = await this.getTestsByCategory(this.categoryId);
  },

  methods: {
    ...mapActions('testManagement', ['getTestsByCategory']),
    ...mapMutations('buyer', ['addToCart']),

    addToCartLocal(item) {
      const isExists = this.cartItems.some(function (cartItem) {
        return cartItem.id === item.id;
      });
      if (isExists) {
        alert('Already added');
        return;
      }
      this.addToCart(item);
    },
  },
};
</script>

<style>
.btn-color {
  background-color: #11a49b !important;
  color: white;
}
</style>
