<template>
  <div>
    <h1>{{ testDetails?.title }}</h1>
  </div>

  <!-- <div>
    <div class="bg_div">
      <div class="container py-5">
        <h2 class="font-size-28 font-size-md-38 font_family_poppins_bold text-white my-4">
          {{ testDetail?.title }} {{ testDetail }}
        </h2>
      </div>
    </div>
    <div class="container">
      <div class="row mt-5 pt-5">
        <div class="col-12 col-xl-8">
          <h2
            class="font-size-24 font-size-md-28 font-size-lg-50 fw-bolder text-black font_family_poppins_bold"
          >
            {{ testDetail?.title }}
          </h2>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-xl-8 d-flex flex-column border_bottom">
          <div
            class="font-size-12 font-size-lg-14 fw-light my-2 font_family_poppins_light"
            v-html="editTestDescContent"
            ref="container"
          ></div>
          <div class="row d-flex flex-column font-size-14 font-size-md-16 text-primary">
            <div class="col-4 col-md-2 col-xl-2">
              <img src="@/assets/images/card_star.svg" alt="card_star" class="card_star" />
            </div>
            <div class="d-flex flex-column flex-lg-row col-10 col-md-8 col-lg-12">
              <div class="d-flex align-items-center justify-content-between mt-2 mt-md-0">
                <div class="div_circle mx-2"></div>
                <p class="mb-0">{{ testDetail?.time_limit }} min</p>
                <div class="div_circle mx-2"></div>
                <p class="mb-0">{{ testDetail?.questions?.items?.length }} questions</p>
                <div class="div_circle mx-2"></div>
                <p class="mb-0">{{ totalMarks }} marks</p>
              </div>
              <div class="d-flex flex-column flex-md-row">
                <div class="border_left ms-2">
                  <P class="text-black mb-0 py-1 ps-0 ps-md-2"
                    >Created By
                    <span class="text-primary font_family_poppins_bold"
                      >{{ testDetail?.created_by?.first_name }}
                      {{ testDetail?.created_by?.last_name }}</span
                    >
                  </P>
                </div>
                <div class="border_left ms-2">
                  <P class="mb-0 py-1 ps-0 ps-md-2 text-decoration-underline">Watch Video </P>
                </div>
              </div>
            </div>
          </div>
          <button class="login_btn my-4" data-bs-toggle="modal" data-bs-target="#exampleModal_1">
            Start Test
          </button>
        </div>
        <div class="col-4 d-none d-xl-flex">
          <div class="test_card">
            <div class="h_400">
              <img
                :src="require(`@/assets/images/test_${this.$route.params.imageIndex}.svg`)"
                :alt="altText"
                class="w-100 h-100 card_img"
              />
            </div>
            <div class="d-flex flex-column p-3">
              <p class="fw-bolder font_family_poppins_bold font-size-18">
                {{ testDetail?.title }}
              </p>
              <span
                v-if="testDetail?.price"
                class="bg_price rounded-pill px-3 py-2 font-size-22 fw-bolder price_width"
              >
                {{ formatedPrice }}
              </span>

              <span
                v-if="priceZero"
                class="text-success rounded-pill px-3 py-2 bg_price_green font-size-22 fw-bolder price_width"
              >
                Free
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-xl-8 d-flex flex-column border_bottom py-4">
          <p class="font-size-18 font_family_poppins_bold">Benefit of this test</p>
          <div class="row">
            <div class="col-10">
              <div class="row gy-3">
                <div
                  v-for="i in benefitsData"
                  class="col-12 col-md-6 col-lg-4 d-flex align-items-center"
                >
                  <img src="~assets/images/tick.svg" alt="tick" class="tick_width" />
                  <p class="font-size-14 mb-0 ms-2">{{ i }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-xl-10 d-flex flex-column py-4">
          <p class="font-size-18 font_family_poppins_bold">Featured reviews</p>
          <div class="row gy-3">
            <div v-for="(data, index) in testimonials" class="col-12 col-md-6 col-lg-4">
              <div class="">
                <div class="d-flex align-items-center">
                  <img
                    :src="require(`@/assets/images/review_${index}.svg`)"
                    alt="test_card_icon"
                    class="test_card_icon"
                  />
                  <p class="font_family_poppins_bold text-primary mb-0 mx-2">{{ data.name }}</p>
                  <img src="@/assets/images/card_star.svg" alt="card_star" class="card_star_1" />
                </div>
                <p class="font-size-14 font_family_poppins_light mt-2">“{{ data.review }}”</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-block d-xl-none">
        <div class="card">
          <img src="@/assets/images/card_1.svg" alt="card_1" class="w-100" />
          <div class="d-flex flex-column p-3">
            <p class="fw-bolder font_family_poppins_bold font-size-18">
              {{ testDetail?.title }}
            </p>
            <div class="show_price py-2 px-3">
              <span
                v-if="testDetail?.price"
                class="bg_price rounded-pill px-3 py-2 font-size-22 fw-bolder price_width"
              >
                {{ formatedPrice }}
              </span>

              <span
                v-if="priceZero"
                class="text-success rounded-pill px-3 py-2 bg_price_green font-size-22 fw-bolder price_width"
              >
                Free
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MockTestPageLatestTest class="mt-5" />
    <IndividualTestNextStep />
    <SignUpCover />
  </div> -->
</template>

<script>
import { Share } from '@capacitor/share';
import { mapState, mapActions, mapMutations } from 'vuex';
import { Browser } from '@capacitor/browser';
export default {
  layout: 'homePageLayout',

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
      priceZero: false,
      formatedPrice: 0,
      editTestDescContent: '',
      altText: 'Card Image Alt Text', // Set the alt text as needed
      benefitsData: [
        'Cloud skills',
        'Database proficiency',
        'Career growth',
        'Data security',
        'Scalability',
        'Industry relevance',
      ],
      testimonials: [
        {
          name: 'Emily Johnson',
          review:
            'Fantastic resource! The PMP mock tests provided a realistic exam environment. They covered the breadth of topics, and the detailed explanations after each question helped me understand the concepts thoroughly.',
        },

        {
          name: 'Jessica Robinson',
          review:
            'I owe my success to these Azure Architect Associate mock tests. They provided a solid foundation and allowed me to fine-tune my skills. The format and difficulty level were spot-on!',
        },

        {
          name: 'Jordan Turner',
          review:
            "I'm impressed! These mock tests prepared me thoroughly for the Google Cloud Architect certification. The explanations were clear, and the questions covered the entire spectrum of the exam.",
        },

        {
          name: 'Derek Foster',
          review:
            'Highly recommend these ITIL 4 Foundation mock tests. They covered the material thoroughly, and the practice exams gave me a real sense of what to expect. A reliable resource for ITIL aspirants.',
        },

        {
          name: 'Jason Adams',
          review:
            'A big thank you to this platform for the Six Sigma Green Belt mock tests. The variety of questions and scenarios prepared me comprehensively, and the feedback was immensely helpful in fine-tuning my skills.',
        },
      ],
    };
  },

  async asyncData({ params, store }) {
    const testSlug = params.mockslug;
    console.log('test slug id ', testSlug);

    // Set loader hidden
    // store.dispatch('setIsLoaderHidden', true);

    try {
      // Get testId by slug
      const testId = await store.dispatch('testManagement/getTestIdBySlug', testSlug);
      console.log(testId, 'testId');

      // Get testDetail
      const testDetails = await store.dispatch('testManagement/getTestDetail', testId);
      console.log(testDetails, 'testDetail');

      // Set loader
      store.commit('SET_LOADER', true);

      if (!testDetails || testDetails.status !== 'APPROVED') {
        // Set loader and loader hidden
        store.commit('SET_LOADER', false);
        store.dispatch('setIsLoaderHidden', false);
        return { testDetails: null };
      }

      // Handle price
      if (testDetails.price === 0) {
        store.commit('SET_PRICE_ZERO', true);
      }

      // Set description content
      // store.commit('SET_EDIT_TEST_DESC_CONTENT', testDetail.description);

      // Format price
      // if (testDetail.price && typeof testDetail.price === 'number') {
      //   store.commit('SET_FORMATTED_PRICE', `$${store.getters.formatPrice(testDetail.price)}`);
      // } else if (testDetail.price) {
      //   store.commit('SET_FORMATTED_PRICE', testDetail.price);
      // }

      // Set container height
      // await store.dispatch('setContainerHeight');

      // Set loader and loader hidden
      store.commit('SET_LOADER', false);
      store.dispatch('setIsLoaderHidden', false);
      console.log(testDetails, 'test full detail');

      return { testDetails: testDetails };
    } catch (error) {
      // Handle errors if necessary
      console.error('Error in asyncData:', error);
      return { testDetail: null };
    }
  },

  head() {
    return {
      title: this.testDetails
        ? `${this.testDetails?.title}: Enhance Skills with Realistic Mock Exams`
        : 'Default Title',

      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Prepare for ${
            this.testDetails && this.testDetails.title
          } with realistic mock tests. Assess your skills, strengthen weaknesses, and boost confidence for exam success. `,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${
            this.testDetail && this.testDetail.title
          }: Enhance Skills with Realistic Mock Exams`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Prepare for ${
            this.testDetail && this.testDetail.title
          } with realistic mock tests. Assess your skills, strengthen weaknesses, and boost confidence for exam success. `,
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
          content: `${
            this.testDetail && this.testDetail.title
          }: Enhance Skills with Realistic Mock Exams`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `Prepare for ${
            this.testDetail && this.testDetail.title
          } with realistic mock tests. Assess your skills, strengthen weaknesses, and boost confidence for exam success. `,
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

  computed: {
    ...mapState(['isLoading', 'isLoaderHidden']),

    // totalMarks() {
    //   if (this.testDetail) {
    //     let totalMarks = 0;
    //     this.testDetail.questions.items.map((ques) => {
    //       totalMarks += ques.marks;
    //     });
    //     return totalMarks;
    //   }
    // },
  },

  // async mounted() {
  //   this.setIsLoaderHidden(true);
  //   this.testId = await this.getTestIdBySlug(this.$route.params.mockslug);
  //   this.testDetail = await this.getTestDetail(this.testId);
  //   this.SET_LOADER(true);

  //   if (!this.testDetail || this.testDetail.status !== 'APPROVED') {
  //     this.SET_LOADER(false);
  //     this.setIsLoaderHidden(false);
  //     return;
  //   }
  //   if (this.testDetail.price === 0) {
  //     // this.price = '$0.00';
  //     this.priceZero = true;
  //   }
  //   this.editTestDescContent = this.testDetail.description;
  //   // this.wordLength = this.description.trim().split(' ').length;

  //   if (this.testDetail.price && typeof this.testDetail.price === 'number') {
  //     this.formatedPrice = `$${this.formatPrice(this.testDetail.price)}`;
  //   } else if (this.testDetail.price) {
  //     this.formatedPrice = this.testDetail.price;
  //   }

  //   this.$nextTick(() => {
  //     const container = this.$refs.container;
  //     this.containerHeight = container.scrollHeight;
  //     if (this.containerHeight < 100) {
  //       this.seeMoreBtn = false;
  //     }
  //   });

  //   this.SET_LOADER(false);
  //   this.setIsLoaderHidden(false);
  // },

  // async asyncData({ params, store }) {
  //   const data = {
  //     isLoading: false,
  //     isLoaderHidden: false,
  //     totalMarks: 0,
  //     containerHeight: 0,
  //     seeMoreBtn: true,
  //   };

  //   data.isLoading = true;
  //   store.commit('SET_LOADER', true);
  //   store.commit('setIsLoaderHidden', true);

  //   try {
  //     const testId = await store.dispatch('testManagement/getTestIdBySlug', params.mockslug);
  //     const testDetail = await store.dispatch('testManagement/getTestDetail', testId);

  //     if (!testDetail || testDetail.status !== 'APPROVED') {
  //       store.commit('SET_LOADER', false);
  //       store.commit('setIsLoaderHidden', false);
  //       return data;
  //     }

  //     if (testDetail.price === 0) {
  //       data.priceZero = true;
  //     }

  //     data.editTestDescContent = testDetail.description;

  //     if (testDetail.price && typeof testDetail.price === 'number') {
  //       data.formatedPrice = `$${parseFloat(testDetail.price).toFixed(2)}`;
  //     } else if (testDetail.price) {
  //       data.formatedPrice = testDetail.price;
  //     }

  //     // Wait for the next tick to get the container height
  //     await new Promise((resolve) => setTimeout(resolve, 0));

  //     // const container = document.getElementById('container'); // Adjust this to match your HTML structure
  //     // data.containerHeight = container.scrollHeight;

  //     // if (data.containerHeight < 100) {
  //     //   data.seeMoreBtn = false;
  //     // }

  //     return data;
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     return data;
  //   } finally {
  //     store.commit('SET_LOADER', false);
  //     store.commit('setIsLoaderHidden', false);
  //   }
  // },

  // mounted() {
  //   // This lifecycle hook is still available for client-side code
  //   this.$nextTick(() => {
  //     const container = document.getElementById('container'); // Adjust this to match your HTML structure
  //     this.containerHeight = container.scrollHeight;
  //     if (this.containerHeight < 100) {
  //       this.seeMoreBtn = false;
  //     }
  //   });
  // },

  methods: {
    ...mapActions('testManagement', [
      'getTestDetail',
      'getSampleQuestions',
      'getUserTests',
      'getTestIdBySlug',
    ]),
    ...mapMutations(['SET_LOADER', 'setIsLoaderHidden', 'setRedirectUrl']),
    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },
    async inputShow(ff) {
      this.editTestDescContent = ff;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

.bg_div {
  background-image: url('~@/assets/images/banner_cat.svg'); /* Path to your image */
  background-size: cover;
  width: 100%;
  border-radius: 0 0 20px 20px;
}
.div_circle {
  width: 6px;
  height: 6px;
  border-radius: 6px;
  background-color: var(--primary);
}

.border_left {
  border-left: 0px;
}
.login_btn {
  background-color: transparent;
  color: var(--primary);
  border: 3px solid var(--primary);
  border-radius: 8px; /* Adjust the border radius as needed */
  padding: 5px 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  width: 100px;
}

/* Optionally, you can add hover styles to make the button interactive */
.login_btn:hover {
  background-color: var(--primary);
  color: white;
}
.border_bottom {
  border-bottom: 2px solid #a5a5a5;
}

.test_card {
  box-shadow: 6px 6px 10px 0 rgba(0, 0, 0, 0.09);
}

.tick_width {
  width: 17px;
}
.card_star {
  height: 17px;
}
.test_card_icon {
  height: 30px;
  border-radius: 15px;
}
.card_star_1 {
  height: 15px;
}
.h_400 {
  height: 400px;
}
.card_img {
  object-fit: cover;
}

.bg_price {
  background: rgba(255, 193, 7, 0.21);
}

.bg_price_green {
  background: rgba(76, 175, 80, 0.3);
}
.price_width {
  width: 35%;
}

@include media-breakpoint-up(md) {
  .border_left {
    border-left: 1px solid black;
  }
  .login_btn {
    padding: 10px 15px;
    font-size: 16px;
    width: 150px;
  }
}

@include media-breakpoint-up(lg) {
  .card_star {
    height: 25px;
  }
}
</style>
