<template>
  <div class="container">
    <SearcBar v-model="searchQuery" :searchQueryFunc="searchQueryFunc" class="mt-3" />

    <div v-if="isLoaderHidden" class="row">
      <div v-for="i in 3" :key="i" class="col-sm-6 col-md-4 mb-3" data-aos="flip-right">
        <TestCardsSkeleton />
      </div>
    </div>

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
                :category="test.category.name"
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
        <div v-if="allSearchedCategory.length" class="row mt-4">
          <NuxtLink
            :to="`/category/${category.slug}`"
            v-for="category in allSearchedCategory"
            :key="category.id"
            class="col-12 col-md-4 col-sm-6"
            data-aos="zoom-in"
          >
            <div
              class="row align-items-center m-2 p-2 shawdow_category category_border_radius hover_effect"
            >
              <span class="col-2 me-2">
                <img :src="category.image" alt="category" class="category_image" />
              </span>
              <span
                class="col text-start text-truncate ms-2 ms-lg-0 font_size_16"
                :title="category.name"
              >
                {{ category.name }}
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>

      <br />

      <div v-if="allSearchedSubCategory.length">
        <p class="font_size_16">Suggestions Sub-Category</p>
        <div v-if="allSearchedSubCategory.length" class="row mt-4">
          <NuxtLink
            v-for="subCategory in allSearchedSubCategory"
            :to="`/category/${subCategory.category.slug}?subCategoryId=${subCategory.slug}&subCategoryName=${subCategory.name}`"
            :key="subCategory.id"
            class="col-12 col-md-4 col-sm-6"
            data-aos="zoom-in"
          >
            <div
              class="row align-items-center m-2 p-2 shawdow_category category_border_radius hover_effect"
            >
              <span class="col-2 me-2">
                <img :src="subCategory.image" alt="category" class="category_image" />
              </span>
              <span
                class="col text-start text-truncate ms-2 ms-lg-0 font_size_16"
                :title="subCategory.name"
              >
                {{ subCategory.name }}
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-else-if="isFetched">
      <h2 class="fw-bolder text-center mt-4 font_size_24 search_title">No search results found</h2>
      <div class="mt-4">
        <form @submit.prevent="searchFeedbackLocal" class="feedback_width">
          <div class="mt-3">
            <label for="email">Email</label>
            <br />
            <input
              type="email"
              class="p-1 font_size_14 input_field email_width"
              v-model="userEmail"
              required
            />
          </div>

          <div class="mt-3">
            <label for="searchQueryDesc">Description</label>
            <br />
            <textarea
              v-model.trim="feedbackDesc"
              class="w-100 p-1 input_field font_size_14"
              rows="4"
              type="text"
              placeholder="Write your query"
              @input="check"
              required
            />
          </div>

          <div class="row">
            <div class="col text-start">
              <p class="font_size_14" :class="remaining === 0 && 'text-danger'">
                {{ instruction }}
              </p>
            </div>
            <div class="col text-end">
              <button type="submit" class="btn btn-primary text-white" :disabled="remaining === 0">
                <span class="font_size_16"> submit </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
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

      userEmail: '',
      feedbackDesc: '',
      limit: 300,
    };
  },

  computed: {
    ...mapState(['isLoaderHidden']),
    ...mapState('auth', ['user']),

    instruction: function () {
      return this.feedbackDesc === ''
        ? 'Limit: ' + this.limit + ' characters'
        : 'Remaining ' + this.remaining + ' characters';
    },

    remaining: function () {
      return this.limit - this.feedbackDesc.length;
    },
  },

  async mounted() {
    this.setIsLoaderHidden(true);
    this.searchQuery = this.$route.query.search_query ? this.$route.query.search_query : null;
    if (!this.searchQuery) {
      this.setIsLoaderHidden(false);
      this.$router.push('/');
      return;
    }
    await this.searchQueryFunc();

    if (this.user) {
      this.userEmail = this.user.email;
    }
    this.setIsLoaderHidden(false);
  },

  methods: {
    ...mapActions('testManagement', ['getTestByQuery', 'searchFeedback']),
    ...mapMutations(['setIsLoaderHidden']),

    check() {
      this.feedbackDesc = this.feedbackDesc.substr(0, this.limit);
    },

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

    async searchFeedbackLocal() {
      const res = await this.searchFeedback({
        email: this.userEmail,
        description: this.feedbackDesc,
      });

      if (res) {
        this.$router.push('/');
      }
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

.shawdow_category {
  box-shadow: 2px 2px 10px rgba(103, 130, 225, 0.1);
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

.hover_effect:hover {
  border: 1px solid #6782e1;
}

.feedback_area {
  background: #f5f5f5;
  border-radius: 4px;
  word-wrap: break-word;
}

.email_width {
  width: 300px;
}

.input_field {
  border: 1.5px solid #878787;
  border-radius: 4px;
}

@include media-breakpoint-up(sm) {
  .category_border_radius {
    border-radius: 100px;
  }
}

@include media-breakpoint-down(lg) {
  .search_title {
    font-size: 16px;
  }

  .email_width {
    width: 100%;
  }
}
</style>
