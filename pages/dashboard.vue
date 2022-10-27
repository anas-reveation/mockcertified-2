<template>
  <div class="container">
    <SearcBar v-model="searchQuery" :searchQueryFunc="searchQueryFunc" />

    <div v-if="allSearchedTest.length">
      <p class="font_size_16">Suggestions</p>

      <div class="row">
        <div v-for="(test, index) in allSearchedTest" :key="index" class="col-sm-6 col-md-4 mb-3">
          <NuxtLink :to="`/category/test/${test.id}`">
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
            <NuxtLink :to="`/category/test/${test.id}`">
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
            <NuxtLink :to="`/category/${category.id}`"> {{ category.name }} </NuxtLink>
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
            <NuxtLink :to="`/category/test/${test.id}`">
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

  data() {
    return {
      purchasedTestOpen: false,
      attemptedOpen: false,
      noTest: false,
      sortingTabName: '',
      allCategories: [],
      searchQuery: '',
      allSearchedTest: [],
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
      this.allSearchedTest = res;
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
</style>
