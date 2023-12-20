<template>
  <div>
    <div class="bg_div">
      <div class="container">
        <h2 class="font-size-38 text-white py-5 font_family_poppins_light">
          <NuxtLink to="/categories" class="text-white">
            <span class="font_family_poppins_bold">Categories</span>
          </NuxtLink>

          <span v-for="(item, index) in breadCrum" :key="index" @click="goingBack(index)">
            >
            <a href="#" :class="index === breadCrum.length - 1 && 'text-white'">
              {{ item.name }}
            </a>
          </span>
        </h2>
      </div>
    </div>
    <div class="my-5 my-5">
      <div class="container d-flex flex-column justify-content-center align-items-center">
        <div class="text-center my-4 w_100">
          <h3
            class="font-size-24 font-size-md-28 font-size-lg-44 fw-bolder font_family_poppins_bold"
          >
            Find the right category
          </h3>
        </div>
      </div>
      <div class="container">
        <div class="row g-4">
          <div
            v-for="category in allCategoriesFilter"
            :key="category.id"
            class="col-12 col-md-6 col-lg-4"
          >
            <div class="card h-100 d-flex flex-row p-3 align-items-center">
              <img :src="category.image" alt="category" class="card_img" />
              <div class="ms-3">
                <p class="fw-bolder font-size-18 mb-2" :title="category.name">
                  {{ category.name }}
                </p>
                <!-- <p class="fw-light font-size-14">lorem ipsum dolor</p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  middleware: ['authenticated'],
  layout: 'homePageLayout',

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
    const categorySlug = params.categoriesId;
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
        title: 'No test available',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 7000,
      });
      this.$router.back();
      this.setIsLoaderHidden(false);
      return;
    }
    this.allCategoriesFilter = [...this.allSubCategory].sort((a, b) => {
      const nameA = a.name.toLowerCase(); // Convert names to lowercase for case-insensitive sorting
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1; // nameA comes before nameB
      }
      if (nameA > nameB) {
        return 1; // nameA comes after nameB
      }
      return 0; // names are equal
    });
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
          title: `No test available for ${name}`,
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

.bg_div {
  background-image: url('~@/assets/images/banner_cat.svg'); /* Path to your image */
  background-size: cover;
  width: 100%;
}

.card {
  box-shadow: 6px 6px 10px 0 rgba(0, 0, 0, 0.09);
}
.card_img {
  width: 85px;
  height: 85px;
}
</style>
