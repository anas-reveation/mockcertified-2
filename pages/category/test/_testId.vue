<template>
  <div v-if="testDetail" class="container">
    <div class="row justify-content-between">
      <h1 class="col fw-bolder text-capitalize">{{ testDetail.title }}</h1>
      <div class="col text-end">
        <img
          src="@/assets/images/share_icon.svg"
          alt="share"
          height="30"
          width="30"
          @click="shareTest"
        />
      </div>
    </div>
    <p class="my-2 font_family_roboto">
      {{ testDetail.time_limit }} min • {{ testDetail.questions.items.length }} questions •
      {{ totalMarks }} marks •
    </p>

    <div class="row justify-content-between mt-3">
      <div class="col-9 fs-5 text-capitalize fw-bolder">
        <img
          src="@/assets/images/profile_icon.svg"
          alt="share"
          class="me-2"
          height="30"
          width="30"
        />
        {{ testDetail.created_by.first_name }} {{ testDetail.created_by.last_name }}
      </div>
      <span class="col-3 text-primary fw-bolder text-end">
        ${{ formatPrice(testDetail.price) }}
      </span>
    </div>

    <div class="mt-3">
      <h3 class="fw-bolder">Description</h3>
      <p>{{ testDetail.description }}</p>
    </div>

    <span v-if="isPurchased" class="text-primary">• Already Purchased</span>
    <span v-if="isUserOwner" class="text-primary">• You're the creator</span>

    <div v-else class="text-center">
      <button
        v-if="msgText"
        type="button"
        class="btn btn-secondary border border-2 border-dark w-50"
      >
        {{ msgText }}
      </button>
      <button
        v-else
        type="button"
        class="btn btn-secondary border border-2 border-dark w-50"
        @click="addToCartLocal"
      >
        Add to Cart
      </button>
    </div>

    <div v-if="false" class="container">
      <div class="container-fluid">
        <div class="row">
          <div class="col-2">
            <img
              src="@/assets/images/previous.png"
              class="pb-4"
              width="30"
              @click="$router.back()"
              alt=""
            />
          </div>
          <div class="col-9 fw-bold text-capitalize">
            <h1 class="text-left">{{ testDetail.title }}</h1>
          </div>
        </div>
        <div class="mt-3">
          <span class="fs-4 fw-bolder text-success">${{ formatPrice(testDetail.price) }}</span>

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
          <button v-if="msgText" type="button" class="btn w-100 py-2 my-2 btn-color shadow">
            {{ msgText }}
          </button>
          <button
            v-else
            type="button"
            class="btn w-100 py-2 my-2 btn-color shadow"
            @click="addToCartLocal"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Share } from '@capacitor/share';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  middleware: ['authenticated'],

  data() {
    return {
      testDetail: null,
      isPurchased: false,
      isUserOwner: false,
    };
  },

  async asyncData({ params }) {
    const testId = params.testId;
    return { testId };
  },

  computed: {
    ...mapState('auth', ['user']),
    ...mapState('buyer', ['cartItems']),
    ...mapState(['allPurchasedTests']),

    totalMarks() {
      if (this.testDetail) {
        let totalMarks = 0;
        this.testDetail.questions.items.map((ques) => {
          totalMarks += ques.marks;
        });
        return totalMarks;
      }
    },

    msgText() {
      // If user created this test
      if (this.testDetail.created_by.id === this.user.id) {
        // return "You're the creator";
        this.isUserOwner = true;
        return;
      }

      // If user already purchased this test
      const test_id = this.testDetail.id;
      const isPurchased = this.allPurchasedTests.some(function (purchasedItem) {
        return purchasedItem.test.id === test_id;
      });
      if (isPurchased) {
        this.isPurchased = true;
        return;
        // return 'Already purchased';
      } else {
        // If user already have this test in cart
        const isExists = this.cartItems.some(function (cartItem) {
          return cartItem.id === test_id;
        });
        if (isExists) {
          return 'Go to cart';
        }
      }
    },
  },

  async mounted() {
    this.testDetail = await this.getTestDetail(this.testId);

    if (!this.testDetail) {
      this.$router.push('/dashboard');
      return;
    }

    if (!this.allPurchasedTests.length) {
      await this.getUserTests();
    }
  },

  methods: {
    ...mapActions('testManagement', ['getTestDetail', 'getUserTests']),
    ...mapMutations('buyer', ['addToCart']),

    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },

    addToCartLocal() {
      this.addToCart(this.testDetail);
    },

    async shareTest() {
      const domainOrigin = window.location.origin;
      const testId = this.testDetail.id;
      const title = this.testDetail.title;
      const url = `${domainOrigin}/category/test/${testId}`;
      await Share.share({
        title,
        text: `${title} is Really awesome test`,
        url,
        dialogTitle: 'Share with buddies',
      });
    },
  },
};
</script>
