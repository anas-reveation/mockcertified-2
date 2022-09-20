<template>
  <div v-if="testDetail" class="container">
    <TestDetail
      :title="testDetail.title"
      :shortDescription="`${testDetail.time_limit} min • ${testDetail.questions.items.length} questions •
      ${totalMarks} marks`"
      :description="testDetail.description"
      :price="testDetail.price"
      :fullName="`${testDetail.created_by.first_name} ${testDetail.created_by.last_name}`"
      :shareFunc="shareTest"
    />

    <div v-if="isPurchased || isUserOwner">
      <span v-if="isPurchased" class="text-primary">• Already Purchased</span>
      <span v-if="isUserOwner" class="text-primary">• You're the creator</span>
    </div>

    <div v-else class="text-center">
      <button
        v-if="msgText"
        type="button"
        class="btn btn-secondary border border-2 border-primary w-50"
      >
        {{ msgText }}
      </button>
      <button
        v-else
        type="button"
        class="btn btn-secondary border border-2 border-primary w-50"
        @click="buyNowLocal"
      >
        Buy Now
      </button>
    </div>
  </div>
</template>

<script>
import { Share } from '@capacitor/share';
import { mapState, mapActions, mapMutations } from 'vuex';
import { Browser } from '@capacitor/browser';
export default {
  middleware: ['authenticated'],

  data() {
    return {
      testDetail: null,
      isPurchased: false,
      isUserOwner: false,
      stripeUrl: null,
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
      this.$router.push('/protected/dashboard');
      return;
    }

    if (!this.allPurchasedTests.length) {
      await this.getUserTests();
    }
  },

  methods: {
    ...mapActions('testManagement', ['getTestDetail', 'getUserTests']),
    ...mapActions('buyer', ['buyNow']),
    ...mapMutations('buyer', ['clearCart']),

    async shareTest() {
      const domainOrigin = window.location.origin;
      const testId = this.testDetail.id;
      const title = this.testDetail.title;
      const url = `${domainOrigin}/protected/category/test/${testId}`;
      await Share.share({
        title,
        text: `${title} is Really awesome test`,
        url,
        dialogTitle: 'Share with buddies',
      });
    },

    async buyNowLocal() {
      const res = await this.buyNow({ testId: this.testDetail.id });
      if (res) {
        this.stripeUrl = res;
        this.confirmFunc();
        // this.$router.push('/protected/dashboard')  ;
      }
    },

    confirmFunc() {
      this.$swal
        .fire({
          title: 'Confirm Checkout',
          showCancelButton: true,
          confirmButtonText: 'Yes',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await Browser.open({ url: this.stripeUrl });
          }
        });
    },
  },
};
</script>
