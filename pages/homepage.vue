<template>
  <div>
    <HomeScrollerBanner v-if="homeScrollerBannerContent && platform === 'web'" />
    <div class="container">
      <SearcBar v-model="searchQuery" :searchQueryFunc="searchQueryFunc" class="mt-3" />

      <div class="mt-4 mb-4">
        <VueSlickCarousel v-bind="homeBannerCarousel" class="mt-3 zoom-125">
          <div class="home_banner py-4">
            <div class="d-flex flex-column flex-lg-row justify-content-between">
              <div class="text-break p-4">
                <h1 class="fw-bolder me-2 font_size_45 banner_title">
                  We are on <span class="text-primary">PlayStore</span> &
                  <span class="text-primary">AppStore</span> <br />
                  Download the App now
                </h1>

                <div class="font_size_25 mt-4 banner_subtitle">
                  Check here
                  <span class="text-primary"> mockcertified.com </span>
                </div>
              </div>

              <div
                class="d-flex align-items-center flex-row flex-lg-column mx-3 mx-lg-3 mb-3 mb-md-0 justify-content-center gap_20"
              >
                <a :href="playstoreLink" target="_blank" class="">
                  <img
                    src="@/assets/images/GooglePlay.svg"
                    alt="GooglePlayStore"
                    class="icon-s w-100"
                  />
                </a>
                <a :href="appleAppStoreLink" target="_blank" class="">
                  <img src="@/assets/images/AppStore.svg" alt="AppStore" class="icon-s w-100" />
                </a>
              </div>
            </div>
          </div>

          <div class="home_banner">
            <div class="d-flex flex-column flex-lg-row justify-content-between">
              <div class="text-break p-4">
                <h1 class="fw-bolder me-2 font_size_50 banner_title">
                  Find out amazing <span class="text-primary">Categories for Mock Exam!</span>
                </h1>

                <div class="font_size_25 mt-4 banner_subtitle">
                  Check here
                  <span class="text-primary"> mockcertified.com </span>
                </div>
              </div>

              <div>
                <img src="@/assets/images/bannerImage1.svg" alt="banner" class="bannerImage1" />
              </div>
            </div>
          </div>

          <div class="home_banner">
            <div class="d-flex flex-column flex-lg-row justify-content-around p-4">
              <div class="mb-3 mb-lg-0">
                <div class="d-flex flex-column">
                  <div class="fw-bolder me-2 font_size_50 font_size_40 banner_title">
                    Discover <span class="text-primary">Mockcertifed Platform</span>
                  </div>
                  <div class="mt-4">
                    <div class="btn home_banner_btn pe-none">Grow more with Mockcertified</div>
                  </div>
                </div>
              </div>
              <div class="position-relative">
                <img
                  src="@/assets/images/thumbnailVideo.png"
                  alt="video"
                  class="video_thumbnail cursor_pointer video-size"
                  data-bs-toggle="modal"
                  data-bs-target="#reviewAnswers"
                  @click="isVideoOn = true"
                />
              </div>
            </div>
          </div>

          <div class="home_banner">
            <div class="d-flex flex-column flex-lg-row justify-content-around">
              <div class="mb-3 mb-lg-0 p-4">
                <div class="d-flex flex-column">
                  <div class="fw-bolder me-2 font_size_45 banner_title">
                    Whether you're a <span class="text-primary">student or a professional!</span>
                  </div>
                  <div class="mt-4">
                    <div class="btn home_banner_btn pe-none">
                      we're here to help you achieve your certification goals
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <img
                    src="@/assets/images/bannerImage3.svg"
                    alt="bannerImage3"
                    class="bannerImage3"
                  />
                </div>
              </div>
            </div>
          </div>
        </VueSlickCarousel>
      </div>

      <div>
        <div class="mt-5 zoom-m">
          <div class="row justify-content-between">
            <div class="col">
              <h2 v-if="isLoaderHidden || !allCategories.length">
                <AnimatedPlaceholder width="200px" height="10px" />
              </h2>
              <h2 class="text-primary fw-bolder font_size_24 dashboard_title" v-else>Categories</h2>
            </div>
            <!-- <div v-if="!isLoaderHidden || !allCategories.length" class="col-4 text-end">
            <NuxtLink
              to="/category"
              class="text-primary text-decoration-underline font_size_16 dashboard_title"
            >
              See all
            </NuxtLink>
          </div> -->
          </div>

          <div v-if="isLoaderHidden" class="mt-3 scroll_x">
            <div
              v-for="i in 5"
              :key="i"
              class="rounded-pill d-inline-block text-center m-1 p-2 category_box"
              data-aos="zoom-in"
            >
              <AnimatedPlaceholder width="200px" borderRadius="50px" />
            </div>
          </div>

          <div class="mt-3 scroll_x" v-if="!isLoading">
            <NuxtLink
              :to="`/category/${category.slug}`"
              v-for="(category, index) in allCategories"
              :key="index"
              class="bg-tertiary rounded-pill d-inline-block text-center text-capitalize m-1 m-22 p-2 category_box font_size_14 dashboard_category_title"
            >
              <NuxtLink :to="`/category/${category.slug}`"> {{ category.name }} </NuxtLink>
            </NuxtLink>
            <div
              v-if="isFetched"
              class="border border-primary rounded-pill d-inline-block text-center text-capitalize m-1 p-2 category_box font_size_14 dashboard_category_title"
            >
              <NuxtLink :to="`/category`" class="text-primary"> View More </NuxtLink>
            </div>
          </div>
        </div>
        <div class="mt-5">
          <div class="row justify-content-between">
            <div class="col">
              <h2 v-if="isLoaderHidden || !featuredTests.length">
                <AnimatedPlaceholder width="200px" height="10px" />
              </h2>
              <h2 class="text-primary fw-bolder font_size_24 dashboard_title" v-else>Featured</h2>
            </div>
            <!-- <div class="col-4 text-end">
            <NuxtLink to="/category" class="text-primary fw-bolder font_size_16">See all</NuxtLink>
          </div> -->
          </div>

          <VueSlickCarousel
            :arrows="false"
            :dots="false"
            v-bind="settings"
            v-if="isLoaderHidden"
            class="mt-3"
          >
            <div v-for="i in 3" :key="i" class="pe-2 pb-2" data-aos="flip-right">
              <TestCardsSkeleton />
            </div>
          </VueSlickCarousel>

          <VueSlickCarousel
            :arrows="false"
            :dots="false"
            v-bind="settings"
            v-if="featuredTests.length && !isLoading"
            class="mt-3"
          >
            <div
              v-for="(test, index) in featuredTests"
              :key="index"
              class="mb-3 px-2 py-2"
              data-aos="flip-right"
            >
              <NuxtLink :to="`/category/test/${test.slug}`" v-if="index <= 2">
                <TestCards
                  :title="test.title"
                  :price="`$${formatPrice(test.price)}`"
                  :category="test.category.name"
                  :description="`${test.time_limit} mins • ${
                    test.questions.items.length
                  } questions • ${totalMarks(test.questions.items)} marks`"
                  :dateTime="getDate(test.createdAt)"
                />
              </NuxtLink>
            </div>
          </VueSlickCarousel>
        </div>
        <div class="mt-4">
          <div class="row justify-content-between">
            <div class="col">
              <h2 v-if="isLoaderHidden || !recentlyAddedTests.length">
                <AnimatedPlaceholder width="200px" height="10px" />
              </h2>
              <h2 class="text-primary fw-bolder font_size_24 dashboard_title" v-else>
                Recently Added
              </h2>
            </div>
            <!-- <div class="col-4 text-end">
            <NuxtLink to="/category" class="text-primary fw-bolder font_size_16">
              See all
            </NuxtLink>
          </div> -->
          </div>

          <VueSlickCarousel
            :arrows="false"
            :dots="false"
            v-bind="settings"
            v-if="isLoaderHidden"
            class="mt-3 px-2 py-3"
          >
            <div v-for="i in 3" :key="i" class="px-2 pb-2" data-aos="flip-right">
              <TestCardsSkeleton />
            </div>
          </VueSlickCarousel>

          <VueSlickCarousel
            :arrows="false"
            :dots="false"
            v-bind="settings"
            v-if="recentlyAddedTests.length && !isLoading"
            class="mt-3 px-2 py-3 bg_light_blue"
          >
            <div
              v-for="(test, index) in recentlyAddedTests"
              :key="index"
              class="px-sm-2 py-sm-2"
              data-aos="flip-right"
            >
              <NuxtLink :to="`/category/test/${test.slug}`">
                <TestCards
                  :title="test.title"
                  :price="`$${formatPrice(test.price)}`"
                  :category="test.category.name"
                  :description="`${test.time_limit} mins • ${
                    test.questions.items.length
                  } questions • ${totalMarks(test.questions.items)} marks`"
                  :dateTime="getDate(test.createdAt)"
                  :authorName="test.created_by.first_name"
                />
              </NuxtLink>
            </div>
          </VueSlickCarousel>
        </div>
      </div>

      <!-- Start Modal -->
      <div
        class="modal fade"
        id="reviewAnswers"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="reviewAnswersLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content video_modal">
            <div class="modal-header video_modal">
              <h5 class="modal-title text-white font_size_30 modal_title" id="reviewAnswersLabel">
                What is Mockcertified?
              </h5>
              <span
                class="cursor_pointer"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="isVideoOn = false"
              >
                <img src="@/assets/images/closeBtn.svg" alt="circle-cross" />
              </span>
            </div>
            <div class="modal-body">
              <div>
                <iframe
                  v-if="isVideoOn"
                  id="videoId"
                  class="w-100"
                  style="height: 300px"
                  :src="YOUTUBE_EMBED_LINK_BANNER"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Modal -->
    </div>
  </div>
</template>

<script>
import { Storage } from '@capacitor/storage';
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  middleware: ['authenticated'],
  components: { VueSlickCarousel },

  head() {
    return {
      title: 'Online Mock Test | Test Series',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'This application serves as a platform to link information seekers with subject matter experts. They can create mock exams and market them to potential customers.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Online Mock Test | Test Series - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'This application serves as a platform to link information seekers with subject matter experts. They can create mock exams and market them to potential customers.',
        },
        {
          name: 'keywords',
          content:
            'Mockcertified, Mock Test, mock exam, practice mock test, practice mock, Create Mock Test, Mockcertified App',
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
          content: 'Online Mock Test | Test Series - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'This application serves as a platform to link information seekers with subject matter experts. They can create mock exams and market them to potential customers.',
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
      // hasRunBefore: false,
      purchasedTestOpen: false,
      attemptedOpen: false,
      noTest: false,
      sortingTabName: '',
      allCategories: [],
      searchQuery: '',
      allSearchedTest: [],
      allSearchedCategory: [],
      allSearchedSubCategory: [],
      isFetched: false,
      YOUTUBE_EMBED_LINK_BANNER: process.env.YOUTUBE_EMBED_LINK_BANNER,
      playstoreLink: `https://play.google.com/store/apps/details?id=${process.env.GOOGLE_PLAYSTORE_ID}`,
      appleAppStoreLink: `https://apps.apple.com/in/app/MockCertified/${process.env.APPLE_APP_STORE_ID}`,
      isVideoOn: false,

      homeBannerCarousel: {
        autoplay: true,
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        initialSlide: 0,
      },

      settings: {
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 778,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },

  computed: {
    ...mapState([
      'isLoading',
      'isLoaderHidden',
      'allCreatedTests',
      'homeScrollerBannerContent',
      'platform',
    ]),
    ...mapState('auth', ['user']),
    ...mapState('testManagement', ['featuredTests', 'categories', 'recentlyAddedTests']),
  },

  async mounted() {
    if (!this.user) {
      this.$router.push('/');
    }
    this.setIsLoaderHidden(true);
    if (!this.homeScrollerBannerContent) {
      await this.getTC_and_PP();
    }

    if (!this.categories.length) {
      await this.getAllCategories();
    }

    if (!this.featuredTests.length) {
      await this.getAllFeaturedTest();
    }

    if (!this.recentlyAddedTests.length) {
      await this.getRecentlyAddedTests();
    }
    this.setIsLoaderHidden(false);
    this.allCategories = this.categories.slice(0, 13);
    this.isFetched = true;

    const { value } = await Storage.get({ key: 'isClickedPopupPublish' });
    const isClickedPopupPublish = JSON.parse(value);

    if (this.user && !isClickedPopupPublish && (await this.isUserPendingApprovalTests())) {
      this.$swal
        .fire({
          text: 'Your tests are not published. Click to redirect.',
          showCancelButton: true,
          confirmButtonText: 'Yes',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.$router.push('/protected/created-test');
          }
        });
      await Storage.set({
        key: 'isClickedPopupPublish',
        value: JSON.stringify(true),
      });
    }
  },

  methods: {
    ...mapActions(['getTC_and_PP']),
    ...mapActions('testManagement', [
      'getAllFeaturedTest',
      'getRecentlyAddedTests',
      'getAllCategories',
      'isUserPendingApprovalTests',
    ]),
    ...mapMutations(['setIsLoaderHidden']),

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

    getDate(getdatetime) {
      var dateStr = new Date(getdatetime);
      return dateStr.toLocaleDateString();
    },

    async searchQueryFunc() {
      this.$router.push(`/search?search_query=${this.searchQuery}`);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';
.gap_20 {
  gap: 20px;
}

// .element1_position {
//   top: -40px;
//   right: 30%;
//   transform: rotate(40deg);
// }

// .element2_position {
//   bottom: -100%;
//   right: 25%;
// }

.home_banner {
  background: #f6f8ff;
  border-radius: 10px;
}

// .home_banner1 {
//   width: 100%;
//   height: 350px;
//   object-fit: cover;
// }

// .bannerImage1_position {
//   right: 20px;
//   top: 22px;
// }

.bannerImage1 {
  height: 300px;
  width: 100%;
}

.bannerImage3 {
  height: 300px;
  width: 100%;
}

// .bannerEllipse_position {
//   right: 0;
//   top: 30%;
// }

// .bannerEllipse {
//   width: 400px;
// }

.home_banner_btn {
  background: #ffffff;
  box-shadow: 2px 2px 10px rgba(73, 73, 73, 0.1);
  border-radius: 8px;
}

// .playbtn_position {
//   right: 165px;
//   bottom: 39%;
// }

.video_modal {
  background: #252525;
}

// .video_modal_bg {
//   background: rgba(43, 43, 43, 0.8);
// }

.scroll_x {
  overflow-x: auto;
  white-space: nowrap;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scroll_x::-webkit-scrollbar {
  display: none;
}

// .category_image {
//   object-fit: contain;
//   width: 35px;
//   height: 35px;
// }

.category_box {
  min-width: 65px !important;
}

.bg-tertiary {
  background: #e9eeff;
}

.video-size {
  width: 100%;
  height: 100%;
}

@include media-breakpoint-up(sm) {
  .bg_light_blue {
    background: rgba(233, 238, 255, 0.3);
  }
}

@include media-breakpoint-down(lg) {
  .banner_title {
    font-size: 25px;
  }

  .banner_subtitle {
    font-size: 18px;
  }

  .video_thumbnail {
    width: 100%;
  }

  // .playbtn_position {
  //   right: 42%;
  // }

  .bannerImage1 {
    width: 100%;
    // height: 100%;
  }

  // .bannerImage1_position {
  //   right: 0;
  //   top: 100%;
  // }

  // .bannerEllipse {
  //   width: 100%;
  // }

  // .bannerEllipse_position {
  //   right: 0;
  //   top: 266px;
  //   top: 100%;
  // }

  .dashboard_title {
    font-size: 16px;
  }

  .dashboard_category_title {
    font-size: 12px;
  }

  .home_banner_btn {
    font-size: 14px;
  }

  .modal_title {
    font-size: 20px;
  }

  .bannerImage3 {
    width: 100%;
    object-fit: contain;
  }
}

@include media-breakpoint-down(md) {
  .banner_title {
    font-size: 18px;
  }

  .banner_subtitle {
    font-size: 16px;
  }
}

@include media-breakpoint-down(sm) {
  // .playbtn_position {
  //   right: 39%;
  //   bottom: 120px;
  //   width: 50px;
  // }

  .bannerImage1 {
    height: 200px;
  }

  .bannerImage3 {
    height: 200px;
  }
}
@media (min-width: 1100px) and (max-width: 1399px) {
  .category_box {
    min-width: 61px !important;
  }
  .m-22 {
    margin: 0.13rem !important;
  }
  .zoom-m {
    margin-top: 1.8rem !important;
  }
  .font_size_50 {
    font-size: 36px;
  }
  .font_size_40 {
    font-size: 40px;
  }
  .font_size_45 {
    font-size: 36px;
  }
  .bannerImage1 {
    height: 230px;
  }
  .bannerImage3 {
    height: 237px;
  }
  .zoom-125 {
    height: 253px;
  }
  .video-size {
    width: 314px;
  }
}
</style>
