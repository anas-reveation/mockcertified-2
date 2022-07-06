<template>
  <div v-if="testDetail" class="container">
    <div class="container-fluid">
      <img
        src="@/assets/images/previous.png"
        class="pb-4"
        width="30"
        @click="$router.back()"
        alt=""
      />

      <img
        class="test-banner-image"
        src="https://cdn.pixabay.com/photo/2015/11/15/07/47/geometry-1044090__340.jpg"
        alt=""
      />
      <div class="mt-3">
        <span class="fs-4 fw-bolder text-success">${{ testDetail.price }}</span>

        <div class="d-flex justify-content-between mb-3 mt-3">
          <span class="fs-5 fw-bolder text-secondary"
            >{{ testDetail.created_by.first_name }} {{ testDetail.created_by.last_name }}</span
          >
          <span class="fs-6 fw-bolder text-dark"
            >{{ testDetail.questions.items.length }} questions</span
          >
        </div>

        <span class="fs-4 fw-bold">Description</span>
        <p class="py-2 text-dark rounded">
          {{ testDetail.description }}
        </p>
        <div class="d-flex justify-content-between">
          <span class="fs-6 fw-bolder text-dark">{{ testDetail.time_limit }} min</span>
          <span class="fs-6 fw-bolder text-dark">{{ totalMarks }} marks</span>
        </div>
        <button type="button" class="btn w-100 py-2 my-2 btn-color shadow" @click="addToCartLocal">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  middleware: ['authenticated'],

  data() {
    return {
      testDetail: null,
    };
  },

  async asyncData({ params }) {
    const testId = params.testId;
    return { testId };
  },

  computed: {
    ...mapState('buyer', ['cartItems']),

    totalMarks() {
      if (this.testDetail) {
        let totalMarks = 0;
        this.testDetail.questions.items.map((ques) => {
          totalMarks += ques.marks;
        });
        return totalMarks;
      }
    },
  },

  async mounted() {
    this.testDetail = await this.getTestDetail(this.testId);
  },

  methods: {
    ...mapActions('testManagement', ['getTestDetail']),
    ...mapMutations('buyer', ['addToCart']),

    addToCartLocal() {
      const test_id = this.testDetail.id;
      const isExists = this.cartItems.some(function (cartItem) {
        return cartItem.id === test_id;
      });
      if (isExists) {
        alert('Already added');
        return;
      }
      this.addToCart(this.testDetail);
    },
  },
};
</script>
<style>
.test-banner-image {
  width: 100%;
  border-radius: 10px;
}
</style>
