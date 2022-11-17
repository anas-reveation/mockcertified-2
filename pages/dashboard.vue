<template>
  <div class="container">
    <SearcBar v-model="searchQuery" :searchQueryFunc="searchQueryFunc" />
    <div
      v-if="allSearchedTest.length || allSearchedCategory.length || allSearchedSubCategory.length"
    >
      <div v-if="allSearchedTest.length">
        <p class="font_size_16">Suggestions</p>

        <div class="row">
          <div v-for="(test, index) in allSearchedTest" :key="index" class="col-sm-6 col-md-4 mb-3">
            <NuxtLink :to="`/category/test/${test.slug}`">
              <TestCards
                :title="test.title"
                :price="`$${formatPrice(test.price)}`"
                :addToCart="true"
                :description="`${test.time_limit} mins • ${
                  test.questions.items.length
                } questions • ${totalMarks(test.questions.items)} marks`"
                :createdAt="test.createdAt"
                :authorName="test.created_by.first_name"
              />
            </NuxtLink>
          </div>
        </div>
        <br />
      </div>
      <div v-if="allSearchedCategory.length">
        <p class="font_size_16">Suggestions Category</p>
        <div class="row p-1">
          <NuxtLink
            :to="`/category/${category.slug}`"
            v-for="category in allSearchedCategory"
            :key="category.id"
            class="d-inline col-sm-4 border border-2 border-primary rounded-pill mt-3 p-2"
          >
            <div class="row">
              <span class="col-2 me-2">
                <img :src="category.image" alt="category" class="rounded-circle category_image" />
              </span>
              <span class="col text-start"> {{ category.name }} </span>
            </div>
          </NuxtLink>
        </div>
      </div>
      <br />
      <div v-if="allSearchedSubCategory.length">
        <p class="font_size_16">Suggestions Sub-Category</p>
        <div class="row p-1">
          <NuxtLink
            v-for="subCategory in allSearchedSubCategory"
            :to="`/category/${subCategory.category.slug}?subCategoryId=${subCategory.slug}&subCategoryName=${subCategory.name}`"
            :key="subCategory.id"
            class="d-inline col-sm-4 border border-2 border-primary rounded-pill mt-3 p-2"
          >
            <div class="row">
              <span class="col-2 me-2">
                <img
                  :src="subCategory.image"
                  alt="category"
                  class="rounded-circle category_image"
                />
              </span>
              <span class="col text-start">{{ subCategory.name }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-else>
      <div>
        <div class="row justify-content-between">
          <div class="col">
            <h2 class="fw-bolder font_size_24">Featured</h2>
          </div>
          <!-- <div class="col-4 text-end">
            <NuxtLink to="/category" class="text-primary fw-bolder font_size_16">See all</NuxtLink>
          </div> -->
        </div>

        <VueSlickCarousel
          :arrows="false"
          :dots="false"
          v-bind="settings"
          v-if="featuredTests.length"
        >
          <div v-for="(test, index) in featuredTests" :key="index" class="mb-3 px-2">
            <NuxtLink :to="`/category/test/${test.slug}`">
              <TestCards
                :title="test.title"
                :price="`$${formatPrice(test.price)}`"
                :addToCart="true"
                :description="`${test.time_limit} mins • ${
                  test.questions.items.length
                } questions • ${totalMarks(test.questions.items)} marks`"
              />
            </NuxtLink>
          </div>
        </VueSlickCarousel>
      </div>

      <div class="mt-3">
        <div class="row justify-content-between">
          <div class="col">
            <h2 class="fw-bolder font_size_24">Categories</h2>
          </div>
          <div class="col-4 text-end">
            <NuxtLink to="/category" class="text-primary fw-bolder font_size_16">
              See all
            </NuxtLink>
          </div>
        </div>

        <div class="scroll_x">
          <div
            v-for="(category, index) in allCategories"
            :key="index"
            class="bg-secondary border border-2 border-primary rounded-pill fw-bolder d-inline-block text-center text-capitalize m-1 p-2 font_size_16"
          >
            <NuxtLink :to="`/category/${category.slug}`"> {{ category.name }} </NuxtLink>
          </div>
        </div>
      </div>

      <div class="mt-3 pb-3">
        <div class="row justify-content-between">
          <div class="col">
            <h2 class="fw-bolder font_size_24">Recently Added</h2>
          </div>
          <div class="col-4 text-end">
            <!-- <NuxtLink to="/category" class="text-primary fw-bolder font_size_16">
              See all
            </NuxtLink> -->
          </div>
        </div>

        <VueSlickCarousel
          :arrows="false"
          :dots="false"
          v-bind="settings"
          v-if="recentlyAddedTests.length"
        >
          <div v-for="(test, index) in recentlyAddedTests" :key="index" class="px-2 pb-2">
            <NuxtLink :to="`/category/test/${test.slug}`">
              <TestCards
                :title="test.title"
                :price="`$${formatPrice(test.price)}`"
                :addToCart="true"
                :description="`${test.time_limit} mins • ${
                  test.questions.items.length
                } questions • ${totalMarks(test.questions.items)} marks`"
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

import { mapState, mapActions } from 'vuex';
export default {
  middleware: ['authenticated'],
  components: { VueSlickCarousel },

  head() {
    return {
      title: 'Create Your Mock Test',
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
          content: 'Create Your Mock Test - Mockcertified App',
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
          content: 'Create Your Mock Test - Mockcertified App',
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
        dots: true,
        infinite: false,
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
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 778,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 544,
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
    ...mapState('testManagement', ['featuredTests', 'categories', 'recentlyAddedTests']),
  },

  async mounted() {
    if (!this.categories.length) {
      await this.getAllCategories();
    }

    if (!this.featuredTests.length) {
      await this.getAllFeaturedTest();
    }

    if (!this.recentlyAddedTests.length) {
      await this.getRecentlyAddedTests();
    }
    this.allCategories = this.categories;
  },

  methods: {
    ...mapActions('testManagement', [
      'getAllFeaturedTest',
      'getRecentlyAddedTests',
      'getAllCategories',
      'getTestByQuery',
    ]),

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

    // redirectPage(id) {
    //   this.$router.push(`/category/test/${id}`);
    // },

    async searchQueryFunc() {
      if (!this.searchQuery) {
        this.allSearchedTest = [];
        return;
      }
      const res = await this.getTestByQuery(this.searchQuery);
      this.searchQuery = '';
      if (!res) {
        this.allSearchedTest = [];
        return;
      }
      this.allSearchedTest = res.testList;
      this.allSearchedSubCategory = res.subCategoryList;
      this.allSearchedCategory = res.categoryList;
    },
  },
};
</script>

<style scoped>
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
</style>
