<template>
  <div v-if="testDetail" class="container">
    <TestDetail
      :title="testDetail.title"
      :shortDescription="`${testDetail.time_limit} min • ${testDetail.questions.items.length} questions •
      ${totalMarks} marks`"
      :description="testDetail.description"
      :price="newPrice ? newPrice : testDetail.price"
      :fullName="`${testDetail.created_by.first_name} ${testDetail.created_by.last_name}`"
      :shareFunc="shareTest"
      :credit="testDetail.credit"
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

      <div v-else>
        <div v-if="isAuthenticated">
          <div v-if="testDetail.price !== 0">
            <h3 v-if="newPrice" class="fw-bolder text-muted font_size_20">
              New price -
              <span class="text-success fw-bolder"> ${{ newPrice }} </span>
            </h3>
            <form class="wrapper my-3" @submit.prevent="checkPromoCodeLocal">
              <div class="mb-4 input-data">
                <input
                  type="text"
                  class="border border-2 border-primary rounded form-control"
                  v-model="promocode"
                  required
                />
                <button
                  class="btn border-2 border-dark text-dark mt-2 bg_grey"
                  :disabled="!promocode"
                >
                  Apply Code
                </button>
              </div>
            </form>
          </div>

          <button
            type="button"
            class="btn btn-secondary border border-2 border-primary w-50"
            @click="buyNowLocal"
          >
            Buy Now
          </button>
        </div>

        <button
          v-else
          type="button"
          class="btn btn-secondary border border-2 border-primary w-50"
          @click="redirectLogin"
        >
          Login
        </button>
      </div>
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
      promocode: '',
      newPrice: null,
    };
  },

  async asyncData({ params }) {
    const testId = params.testId;
    return { testId };
  },

  computed: {
    ...mapState('auth', ['user', 'isAuthenticated']),
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
      if (this.isAuthenticated && this.testDetail.created_by.id === this.user.id) {
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

    if (this.isAuthenticated && !this.allPurchasedTests.length) {
      await this.getUserTests();
    }
  },

  methods: {
    ...mapActions('testManagement', ['getTestDetail', 'getUserTests']),
    ...mapActions('buyer', ['buyNow', 'checkPromoCode', 'buyTestFree']),
    ...mapMutations(['setRedirectUrl']),

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

    async buyNowLocal() {
      if (this.testDetail.price !== 0) {
        const res = await this.buyNow({ testId: this.testDetail.id, promocode: this.promocode });
        if (res) {
          this.stripeUrl = res;
        }
      }
      this.confirmFunc();
    },

    confirmFunc() {
      this.$swal
        .fire({
          title: 'Confirm Checkout',
          showCancelButton: true,
          confirmButtonText: 'Yes',
        })
        .then(async (result) => {
          if (result.isConfirmed && this.testDetail.price !== 0) {
            await Browser.open({ url: this.stripeUrl });
          } else if (this.testDetail.price === 0) {
            const res = await this.buyTestFree({ testId: this.testDetail.id });
            if (res) {
              this.$router.push('/protected/purchased-test');
            }
          }
        });
    },

    redirectLogin() {
      this.setRedirectUrl(`/category/test/${this.testId}`);
      this.$router.push('/auth/login');
    },

    async checkPromoCodeLocal() {
      const res = await this.checkPromoCode(this.promocode);
      if (res) {
        this.newPrice = this.testDetail.price - (this.testDetail.price / 100) * res;
        this.newPrice = parseFloat(this.newPrice).toFixed(2);
      }
    },
  },
};
</script>

<style scoped>
.bg_grey {
  background-color: #f3f3f3;
}

.grey_clr {
  color: #7f7f7f;
}
</style>
