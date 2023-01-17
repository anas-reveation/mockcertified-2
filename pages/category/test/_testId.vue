<template>
  <div class="container">
    <div v-if="isLoaderHidden">
      <div v-for="i in 3" :key="i">
        <AnimatedPlaceholder width="100px" height="10px" class="mt-4" />
        <br />
        <AnimatedPlaceholder width="50%" height="30px" class="mt-4" />
      </div>
    </div>

    <div v-if="testDetail && !isLoaderHidden">
      <TestDetail
        class="mt-3"
        data-aos="zoom-in"
        :title="testDetail.title"
        :shortDescription="`${testDetail.time_limit} min • ${testDetail.questions.items.length} questions •
      ${totalMarks} marks`"
        :description="testDetail.description"
        :price="newPrice ? newPrice : testDetail.price"
        :fullName="`${testDetail.created_by.first_name} ${testDetail.created_by.last_name}`"
        :shareFunc="shareTest"
        :credit="testDetail.credit"
      />

      <button
        v-if="sampleQuestions.length"
        type="button"
        class="btn btn-outline-primary mt-3 mb-2 width_res"
        data-bs-toggle="modal"
        data-bs-target="#reviewQuestion"
      >
        <span class="font_size_16">Review Sample Questions</span>
      </button>

      <!-- Start Modal -->
      <div
        class="modal fade"
        id="reviewQuestion"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="reviewQuestionLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title fw-bolder" id="reviewQuestionLabel">Questions</h5>
              <span data-bs-dismiss="modal" aria-label="Close">
                <img src="@/assets/images/circle-cross.svg" alt="circle-cross" />
              </span>
            </div>
            <div v-if="sampleQuestions.length" class="modal-body">
              <div v-for="(question, index) in sampleQuestions" :key="index">
                <SampleQuestion
                  :question="question"
                  :index="index + 1"
                  :questionVisible="false"
                  class="mb-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Modal -->

      <div v-if="isPurchased || isUserOwner">
        <span v-if="isPurchased" class="text-primary font_size_16">• Already Purchased</span>
        <span v-if="isUserOwner" class="text-primary font_size_16">• You're the creator</span>
      </div>

      <div v-else class="text-center">
        <button
          v-if="msgText"
          type="button"
          class="btn btn-secondary border border-2 border-primary w-50"
        >
          {{ msgText }}
        </button>

        <div v-else-if="platform === 'web' && !isLoading">
          <div v-if="isAuthenticated">
            <div v-if="testDetail.price !== 0">
              <h3 v-if="newPrice" class="fw-bolder text-muted font_size_20">
                New price:
                <span class="text-success fw-bolder"> ${{ newPrice }} </span>
              </h3>
              <form class="wrapper my-3" @submit.prevent="checkPromoCodeLocal">
                <div class="mb-4 input-data text-sm-start">
                  <input
                    type="text"
                    class="border border-2 border-primary rounded form-control width_res"
                    v-model="promocode"
                    placeholder="Code"
                    required
                  />
                  <button
                    class="btn btn-primary border-2 text-white mt-2 width_res"
                    :disabled="!promocode"
                  >
                    <span class="font_size_16">Apply Code</span>
                  </button>
                </div>
              </form>
            </div>

            <div class="text-sm-start">
              <button
                type="button"
                class="btn btn-primary border border-2 border-secondary text-white w-50 width_res"
                @click="buyNowLocal"
              >
                <span class="font_size_16">Buy Now</span>
              </button>
            </div>
          </div>

          <div v-else class="text-sm-start">
            <button
              type="button"
              class="btn btn-primary border border-2 border-secondary text-white w-50 width_res"
              @click="redirectLogin"
            >
              <span class="font_size_16">Login</span>
            </button>
          </div>
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
          content: `${this.testDetail && this.testDetail.title} - Mockcertified App`,
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
          content: `${this.testDetail && this.testDetail.title} - Mockcertified App`,
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
      sampleQuestions: [],
      testId: null,
    };
  },

  async asyncData({ params }) {
    const testSlug = params.testId;
    return { testSlug };
  },

  computed: {
    ...mapState('auth', ['user', 'isAuthenticated']),
    ...mapState('buyer', ['cartItems']),
    ...mapState(['isLoading', 'isLoaderHidden', 'allPurchasedTests', 'platform']),

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
        if (purchasedItem.test) {
          return purchasedItem.test.id === test_id;
        }
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
    this.setIsLoaderHidden(true);
    this.testId = await this.getTestIdBySlug(this.testSlug);
    this.testDetail = await this.getTestDetail(this.testId);
    this.SET_LOADER(true);

    if (!this.testDetail || this.testDetail.status !== 'APPROVED') {
      this.SET_LOADER(false);
      this.setIsLoaderHidden(false);
      this.$router.push('/dashboard');
      return;
    }

    this.sampleQuestions = await this.getSampleQuestions(this.testId);

    this.SET_LOADER(false);
    this.setIsLoaderHidden(false);
    if (this.isAuthenticated && !this.allPurchasedTests.length) {
      this.setIsLoaderHidden(true);
      await this.getUserTests();
      this.setIsLoaderHidden(false);
    }
  },

  methods: {
    ...mapActions('testManagement', [
      'getTestDetail',
      'getSampleQuestions',
      'getUserTests',
      'getTestIdBySlug',
    ]),
    ...mapActions('buyer', ['buyNow', 'checkPromoCode', 'buyTestFree']),
    ...mapMutations(['SET_LOADER', 'setIsLoaderHidden', 'setRedirectUrl']),

    async shareTest() {
      const domainOrigin = window.location.origin;
      const testSlug = this.testSlug;
      const title = this.testDetail.title;
      const url = `${domainOrigin}/category/test/${testSlug}`;

      try {
        await Share.share({
          title,
          text: `${title} is Really awesome test`,
          url,
          dialogTitle: 'Share with buddies',
        });
      } catch (_err) {}
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
          } else if (result.isConfirmed && this.testDetail.price === 0) {
            const res = await this.buyTestFree({ testId: this.testDetail.id });
            if (res) {
              this.$router.push('/protected/purchased-test');
            }
          }
        });
    },

    redirectLogin() {
      this.setRedirectUrl(`/category/test/${this.testSlug}`);
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

@include media-breakpoint-up(sm) {
  .width_res {
    width: 400px !important;
  }
}
</style>
