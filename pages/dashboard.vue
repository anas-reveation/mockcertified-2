<template>
  <div class="container">
    <SearcBar v-model="searchQuery" :searchQueryFunc="searchQueryFunc" class="mt-3" />

    <div>
      <div>
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
                :addToCart="true"
                :description="`${test.time_limit} mins • ${
                  test.questions.items.length
                } questions • ${totalMarks(test.questions.items)} marks`"
                :dateTime="getDate(test.createdAt)"
              />
            </NuxtLink>
          </div>
        </VueSlickCarousel>
      </div>

      <div class="mt-3">
        <div class="row justify-content-between">
          <div class="col">
            <h2 v-if="isLoaderHidden || !allCategories.length">
              <AnimatedPlaceholder width="200px" height="10px" />
            </h2>
            <h2 class="text-primary fw-bolder font_size_24 dashboard_title" v-else>Categories</h2>
          </div>
          <div v-if="!isLoaderHidden || !allCategories.length" class="col-4 text-end">
            <NuxtLink
              to="/category"
              class="text-primary text-decoration-underline font_size_16 dashboard_title"
            >
              See all
            </NuxtLink>
          </div>
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
          <div
            v-for="(category, index) in allCategories"
            :key="index"
            class="bg-tertiary rounded-pill d-inline-block text-center text-capitalize m-1 p-2 category_box font_size_14 dashboard_category_title"
            data-aos="zoom-in"
          >
            <NuxtLink :to="`/category/${category.slug}`"> {{ category.name }} </NuxtLink>
          </div>
        </div>
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
            class="px-2 py-2"
            data-aos="flip-right"
          >
            <NuxtLink :to="`/category/test/${test.slug}`">
              <TestCards
                :title="test.title"
                :price="`$${formatPrice(test.price)}`"
                :addToCart="true"
                :description="`${test.time_limit} mins • ${
                  test.questions.items.length
                } questions • ${totalMarks(test.questions.items)} marks`"
                :dateTime="getDate(test.createdAt)"
              />
            </NuxtLink>
          </div>
        </VueSlickCarousel>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';

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
      purchasedTestOpen: false,
      attemptedOpen: false,
      noTest: false,
      sortingTabName: '',
      allCategories: [],
      searchQuery: '',
      allSearchedTest: [],
      allSearchedCategory: [],
      allSearchedSubCategory: [],

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
    ...mapState(['isLoading', 'isLoaderHidden']),
    ...mapState('testManagement', ['featuredTests', 'categories', 'recentlyAddedTests']),
  },

  async mounted() {
    this.setIsLoaderHidden(true);
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
    this.allCategories = this.categories;
  },

  methods: {
    ...mapActions('testManagement', [
      'getAllFeaturedTest',
      'getRecentlyAddedTests',
      'getAllCategories',
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

.scroll_x {
  overflow-x: auto;
  white-space: nowrap;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scroll_x::-webkit-scrollbar {
  display: none;
}
.category_image {
  object-fit: contain;
  width: 35px;
  height: 35px;
}

.category_box {
  min-width: 65px !important;
}

.bg-tertiary {
  background: #e9eeff;
}

@include media-breakpoint-up(sm) {
  .bg_light_blue {
    background: rgba(233, 238, 255, 0.3);
  }
}

@include media-breakpoint-down(lg) {
  .dashboard_title {
    font-size: 16px;
  }

  .dashboard_category_title {
    font-size: 12px;
  }
}
</style>
