<template>
  <div class="container">
    <p class="mt-2">
      <NuxtLink to="/protected/admin/category">
        <span>Categories</span>
      </NuxtLink>
      <span
        v-for="(item, index) in breadCrum"
        :key="index"
        :class="index === breadCrum.length - 1 && 'fw-bolder'"
        @click="goingBack(index)"
      >
        > <a href="#">{{ item.name }}</a>
      </span>
    </p>
    <div v-if="!allTestBySubCategory.length">
      <div class="row">
        <div
          v-for="category in allCategoriesFilter"
          :key="category.id"
          class="col-sm-6 col-md-4 mb-3"
        >
          <div class="border border-2 border-primary px-2 py-1">
            <div class="row">
              <span class="col-2 d-flex align-items-center">
                <img :src="category.image" alt="category" class="rounded-circle category_image" />
              </span>
              <span class="col text-start"> {{ category.name }}</span>
            </div>

            <span
              @click="redirectPage(category.id, category.name, category.image)"
              class="rounded-3 bg-warning p-1 font_size_16 my-1 cursor_pointer"
            >
              Update
            </span>
          </div>
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

  // head() {
  //   return {
  //     title: `${this.categoryName}`,
  //     meta: [
  //       {
  //         hid: 'description',
  //         name: 'description',
  //         content: `Get a variety of ${this.categoryName} practise tests. Choose the ${this.categoryName} sub-categorized designation exam that you desire. And begin your test right now.`,
  //       },
  //       {
  //         hid: 'og:title',
  //         property: 'og:title',
  //         content: `${this.categoryName} - Mockcertified App`,
  //       },
  //       {
  //         hid: 'og:description',
  //         property: 'og:description',
  //         content: `Get a variety of ${this.categoryName} practise tests. Choose the ${this.categoryName} sub-categorized designation exam that you desire. And begin your test right now.`,
  //       },
  //       {
  //         name: 'keywords',
  //         content: `${this.categoryName}, Mock Test Categories`,
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
  //         content: `${this.categoryName} - Mockcertified App`,
  //       },
  //       {
  //         hid: 'twitter:description',
  //         name: 'twitter:description',
  //         content: `Get a variety of ${this.categoryName} practise tests. Choose the ${this.categoryName} sub-categorized designation exam that you desire. And begin your test right now.`,
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
      allSubCategory: [],
      allTestBySubCategory: [],
      breadCrum: [],
      allCategoriesFilter: [],
      categoryId: null,
    };
  },

  computed: {
    ...mapState('testManagement', ['categoryName']),
    ...mapState(['isLoading']),
  },

  async asyncData({ params }) {
    const categorySlug = params.categoryId;
    return { categorySlug };
  },

  async mounted() {
    this.categoryId = await this.getCategoryIdBySlug(this.categorySlug);

    if (!this.categoryId) {
      this.$router.back();
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
        timer: 3000,
      });
      this.$router.back();
      return;
    }
    this.allCategoriesFilter = this.allSubCategory;
    const obj = {
      name: this.categoryName,
    };
    this.breadCrum.push(obj);
  },

  methods: {
    ...mapActions('testManagement', ['getAllSubCategories', 'getCategoryIdBySlug']),
    ...mapMutations('admin', ['setEditCatSubCat']),

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

    redirectPage(subCatId, name, imageUrl) {
      const obj = { id: subCatId, name, imageUrl };
      this.setEditCatSubCat(obj);
      this.$router.push('/protected/admin/category/edit-subcategory');
    },
  },
};
</script>

<style scoped>
.category_image {
  object-fit: contain;
  width: 35px;
  height: 35px;
}
</style>
