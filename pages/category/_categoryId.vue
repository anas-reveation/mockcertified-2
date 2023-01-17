<template>
  <div class="container">
    <SearcBar v-model="searchQuery" :searchQueryFunc="searchQueryFunc" class="mt-3" />

    <AnimatedPlaceholder v-if="isLoaderHidden" width="200px" height="10px" />

    <div v-if="isLoaderHidden" class="row mt-4">
      <div v-for="i in 6" :key="i" class="col-12 col-md-4 col-sm-6" data-aos="zoom-in">
        <AnimatedPlaceholder width="200px" borderRadius="50px" class="m-2" />
      </div>
    </div>

    <p v-if="!isLoaderHidden" class="mt-2 font_size_24">
      <NuxtLink to="/category">
        <span class="fw-bolder mt-3">Categories</span>
      </NuxtLink>
      <span v-for="(item, index) in breadCrum" :key="index" @click="goingBack(index)">
        >
        <a href="#" :class="index === breadCrum.length - 1 && 'text-primary'">
          {{ item.name }}
        </a>
      </span>
    </p>
    <div v-if="!allTestBySubCategory.length">
      <div v-if="!isLoaderHidden" class="row mt-4">
        <a
          href="#"
          v-for="category in allCategoriesFilter"
          :key="category.id"
          class="col-12 col-md-4 col-sm-6"
          @click="getAllTests(category.id, category.name)"
          data-aos="zoom-in"
        >
          <div
            class="row align-items-center m-2 p-2 shawdow_category category_border_radius hover_effect"
          >
            <span class="col-2">
              <img :src="category.image" alt="category" class="category_image" />
            </span>
            <span class="col text-start text-truncate font_size_16"> {{ category.name }}</span>
          </div>
        </a>
      </div>
    </div>

    <div v-else>
      <div class="row mt-4">
        <div
          v-for="(test, index) in allCategoriesFilter"
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
            />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-if="!allCategoriesFilter.length && !isLoading" class="fw-bolder text-center mt-5">
      No result found
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  middleware: ['authenticated'],

  head() {
    return {
      title: `${this.categoryName}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Get a variety of ${this.categoryName} practise tests. Choose the ${this.categoryName} sub-categorized designation exam that you desire. And begin your test right now.`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.categoryName} - Mockcertified App`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Get a variety of ${this.categoryName} practise tests. Choose the ${this.categoryName} sub-categorized designation exam that you desire. And begin your test right now.`,
        },
        {
          name: 'keywords',
          content: `${this.categoryName}, Mock Test Categories`,
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
          content: `${this.categoryName} - Mockcertified App`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `Get a variety of ${this.categoryName} practise tests. Choose the ${this.categoryName} sub-categorized designation exam that you desire. And begin your test right now.`,
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
      allSubCategory: [],
      allTestBySubCategory: [],
      breadCrum: [],
      searchQuery: '',
      allCategoriesFilter: [],
      categoryId: null,
      isHovering: false,
    };
  },

  watch: {
    // searchQuery(newValue) {
    //   if (this.allTestBySubCategory.length) {
    //     this.allCategoriesFilter = this.allTestBySubCategory.filter((item) =>
    //       item.title.toLowerCase().match(newValue.toLowerCase().replace(/\s+/g, ' ').trim()),
    //     );
    //   } else {
    //     this.allCategoriesFilter = this.allSubCategory.filter((item) =>
    //       item.name.toLowerCase().match(newValue.toLowerCase().replace(/\s+/g, ' ').trim()),
    //     );
    //   }
    // },
  },

  computed: {
    ...mapState('testManagement', ['categoryName']),
    ...mapState(['isLoading', 'isLoaderHidden']),
  },

  async asyncData({ params, query, store }) {
    const categorySlug = params.categoryId;
    const subCategorySlug = query.subCategoryId ? query.subCategoryId : null;
    const subCategoryName = query.subCategoryName ? query.subCategoryName : null;
    return { categorySlug, subCategorySlug, subCategoryName };
  },

  async mounted() {
    this.setIsLoaderHidden(true);

    this.categoryId = await this.getCategoryIdBySlug(this.categorySlug);

    if (!this.categoryId) {
      this.setIsLoaderHidden(false);
      this.$router.back();
      return;
    }

    if (this.subCategorySlug) {
      this.subCategoryId = await this.getSubCategoryIdBySlug(this.subCategorySlug);
      await this.getAllTests(this.subCategoryId, this.subCategoryName);
      this.setIsLoaderHidden(false);
      return;
    }

    this.allSubCategory = await this.getAllSubCategories(this.categoryId);
    if (!this.allSubCategory.length) {
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'No tests available',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 7000,
      });
      this.$router.back();
      this.setIsLoaderHidden(false);
      return;
    }
    this.allCategoriesFilter = this.allSubCategory;
    const obj = {
      name: this.categoryName,
    };
    this.breadCrum.push(obj);
    this.setIsLoaderHidden(false);
  },

  methods: {
    ...mapActions('testManagement', [
      'getAllSubCategories',
      'getTestsBySubCategory',
      'getCategoryIdBySlug',
      'getSubCategoryIdBySlug',
    ]),
    ...mapMutations('buyer', ['addToCart']),
    ...mapMutations(['setIsLoaderHidden']),

    async goingBack(index) {
      this.allTestBySubCategory = [];
      this.allCategoriesFilter = [];
      this.breadCrum = [];
      if (index !== this.breadCrum.length - 1) {
        this.allSubCategory = await this.getAllSubCategories(this.categoryId);
        this.allCategoriesFilter = this.allSubCategory;
        const obj = {
          name: this.categoryName,
        };
        this.breadCrum.push(obj);
      }
    },

    async getAllTests(subCategoryId, name) {
      const obj = {
        name,
      };
      this.breadCrum.push(obj);

      this.setIsLoaderHidden(true);
      this.allTestBySubCategory = await this.getTestsBySubCategory(subCategoryId);
      if (!this.allTestBySubCategory.length) {
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: 'No tests available',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
        this.$router.back();
        this.breadCrum.pop();
        this.setIsLoaderHidden(false);
        return;
      }
      this.allCategoriesFilter = this.allTestBySubCategory;
      this.setIsLoaderHidden(false);
    },

    totalMarks(questionsArr) {
      let totalMarks = 0;
      questionsArr.map((ques) => {
        totalMarks += ques.marks;
      });
      return totalMarks;
    },

    formatPrice(price) {
      return parseFloat(price).toFixed(2);
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

.shawdow_category {
  box-shadow: 2px 2px 10px rgba(103, 130, 225, 0.1);
}

.category_image {
  object-fit: contain;
  width: 35px;
  height: 35px;
}

.hover_effect:hover {
  border: 1px solid #6782e1;
}

@include media-breakpoint-up(sm) {
  .category_border_radius {
    border-radius: 100px;
  }
}
</style>
