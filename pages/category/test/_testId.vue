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

      <div v-else-if="platform === 'web'">
        <div v-if="isAuthenticated">
          <div v-if="testDetail.price !== 0">
            <h3 v-if="newPrice" class="fw-bolder text-muted font_size_20">
              New price -
              <span class="text-success fw-bolder"> ${{ newPrice }} </span>
            </h3>
            <form class="wrapper my-3" @submit.prevent="checkPromoCodeLocal">
              <div class="mb-4 input-data text-sm-start">
                <input
                  type="text"
                  class="border border-2 border-primary rounded form-control width_res"
                  v-model="promocode"
                  required
                />
                <button
                  class="btn border-2 border-dark text-dark mt-2 bg_grey width_res"
                  :disabled="!promocode"
                >
                  Apply Code
                </button>
              </div>
            </form>
          </div>

          <div class="text-sm-start">
            <button
              type="button"
              class="btn btn-secondary border border-2 border-primary w-50 width_res"
              @click="buyNowLocal"
            >
              Buy Now
            </button>
          </div>
        </div>

        <div v-else class="text-sm-start">
          <button
            type="button"
            class="btn btn-secondary border border-2 border-primary w-50 width_res"
            @click="redirectLogin"
          >
            Login
          </button>
        </div>
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

  head() {
    return {
      title: `${this.testDetail && this.testDetail.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.testDetail && this.testDetail.description}`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.testDetail && this.testDetail.description} - Mockcertified App`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `${this.testDetail && this.testDetail.description}`,
        },
        {
          name: 'keywords',
          content: `${this.testDetail && this.testDetail.title}, Mockcertified App`,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `https://${process.env.DOMAIN}${require('~/assets/images/logo_with_name.svg')}`,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://${process.env.DOMAIN}/${this.$router.currentRoute.name}`,
        },

        // Twitter Meta Tags
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.testDetail && this.testDetail.description} - Mockcertified App`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `${this.testDetail && this.testDetail.description}`,
        },

        {
          hid: 'twitter:domain',
          property: 'twitter:domain',
          content: process.env.DOMAIN,
        },
        {
          hid: 'twitter:url',
          property: 'twitter:url',
          content: `https://${process.env.DOMAIN}/${this.$router.currentRoute.name}`,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: `https://${process.env.DOMAIN}${require('~/assets/images/logo_with_name.svg')}`,
        },
      ],
    };
  },

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
    ...mapState(['allPurchasedTests', 'platform']),

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
        return;
      }
      this.newPrice = null;
      return;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~bootstrap/scss/_functions.scss';
@import '~bootstrap/scss/_variables.scss';
@import '~bootstrap/scss/mixins/_breakpoints';
.bg_grey {
  background-color: #f3f3f3;
}

.grey_clr {
  color: #7f7f7f;
}

@include media-breakpoint-up(sm) {
  .width_res {
    width: 400px !important;
  }
}
</style>
