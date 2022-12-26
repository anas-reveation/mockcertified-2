<template>
  <div class="container">
    <SearcBar v-model="searchQuery" :searchQueryFunc="searchQueryFunc" />
    <div
      v-if="allSearchedTest.length || allSearchedCategory.length || allSearchedSubCategory.length"
    >
      <div v-if="allSearchedTest.length">
        <p class="font_size_16">Suggestions</p>

        <div class="row">
          <div
            v-for="(test, index) in allSearchedTest"
            :key="index"
            class="col-sm-6 col-md-4 mb-3"
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
            class="col-12 col-md-4 col-sm-6"
            data-aos="zoom-in"
          >
            <div class="row shawdow_card m-2 p-2 category_border_radius">
              <span class="col-2 me-2 d-flex align-items-center">
                <img :src="category.image" alt="category" class="category_image" />
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
            class="col-12 col-md-4 col-sm-6"
            data-aos="zoom-in"
          >
            <div class="row shawdow_card m-2 p-2 category_border_radius">
              <span class="col-2 me-2 d-flex align-items-center">
                <img :src="subCategory.image" alt="category" class="category_image" />
              </span>
              <span class="col text-start">{{ subCategory.name }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-else-if="isFetched">
      <h2 class="text-center mt-4">No search results found</h2>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  // head() {
  //   return {
  //     title: 'Create Your Mock Test',
  //     meta: [
  //       {
  //         hid: 'description',
  //         name: 'description',
  //         content:
  //           'This application serves as a platform to link information seekers with subject matter experts. They can create mock exams and market them to potential customers.',
  //       },
  //       {
  //         hid: 'og:title',
  //         property: 'og:title',
  //         content: 'Create Your Mock Test - Mockcertified App',
  //       },
  //       {
  //         hid: 'og:description',
  //         property: 'og:description',
  //         content:
  //           'This application serves as a platform to link information seekers with subject matter experts. They can create mock exams and market them to potential customers.',
  //       },
  //       {
  //         name: 'keywords',
  //         content:
  //           'Mockcertified, Mock Test, mock exam, practice mock test, practice mock, Create Mock Test, Mockcertified App',
  //       },
  //       {
  //         hid: 'og:type',
  //         property: 'og:type',
  //         content: 'website',
  //       },
  //       {
  //         hid: 'og:image',
  //         property: 'og:image',
  //         content: `https://${process.env.DOMAIN}${require('~/assets/images/logo_with_name.svg')}`,
  //       },
  //       {
  //         hid: 'og:url',
  //         property: 'og:url',
  //         content: `https://${process.env.DOMAIN}/${this.$router.currentRoute.name}`,
  //       },

  //       // Twitter Meta Tags
  //       { name: 'twitter:card', content: 'summary_large_image' },
  //       {
  //         hid: 'twitter:title',
  //         name: 'twitter:title',
  //         content: 'Create Your Mock Test - Mockcertified App',
  //       },
  //       {
  //         hid: 'twitter:description',
  //         name: 'twitter:description',
  //         content:
  //           'This application serves as a platform to link information seekers with subject matter experts. They can create mock exams and market them to potential customers.',
  //       },

  //       {
  //         hid: 'twitter:domain',
  //         property: 'twitter:domain',
  //         content: process.env.DOMAIN,
  //       },
  //       {
  //         hid: 'twitter:url',
  //         property: 'twitter:url',
  //         content: `https://${process.env.DOMAIN}/${this.$router.currentRoute.name}`,
  //       },
  //       {
  //         hid: 'twitter:image',
  //         name: 'twitter:image',
  //         content: `https://${process.env.DOMAIN}${require('~/assets/images/logo_with_name.svg')}`,
  //       },
  //     ],
  //   };
  // },
  data() {
    return {
      allSearchedTest: [],
      allSearchedCategory: [],
      allSearchedSubCategory: [],
      isFetched: false,
      searchQuery: null,
    };
  },

  // async asyncData({ query }) {
  //   const searchQuery = query.search_query ? query.search_query : null;
  //   return { searchQuery };
  // },

  async mounted() {
    this.searchQuery = this.$route.query.search_query ? this.$route.query.search_query : null;
    if (!this.searchQuery) {
      this.$router.push('/dashboard');
      return;
    }
    await this.searchQueryFunc();
  },

  methods: {
    ...mapActions('testManagement', ['getTestByQuery']),

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
      const res = await this.getTestByQuery(this.searchQuery);
      this.$router.push(`/search?search_query=${this.searchQuery}`);
      this.searchQuery = '';
      if (!res) {
        this.allSearchedTest = [];
        return;
      }
      this.allSearchedTest = res.testList;
      this.allSearchedSubCategory = res.subCategoryList;
      this.allSearchedCategory = res.categoryList;
      this.isFetched = true;
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

.shawdow_card {
  -webkit-box-shadow: 0px 0px 40px 8px rgba(103, 130, 225, 0.18);
  -moz-box-shadow: 0px 0px 40px 8px rgba(103, 130, 225, 0.18);
  box-shadow: 0px 0px 40px 8px rgba(103, 130, 225, 0.18);
}

@include media-breakpoint-up(sm) {
  .category_border_radius {
    border-radius: 100px;
  }
}
</style>
