<template>
  <div class="container">
    <h1 class="fw-bolder mt-3 font_size_24">Categories</h1>

    <div class="row">
      <div
        v-for="category in allCategoriesFilter"
        :key="category.id"
        class="col-sm-6 col-md-4 mb-3"
      >
        <div class="border border-2 border-primary px-2 py-1">
          <NuxtLink :to="`/protected/admin/category/${category.slug}`">
            <div class="row">
              <span class="col-2 me-2">
                <img :src="category.image" alt="category" class="rounded-circle category_image" />
              </span>
              <span class="col text-start"> {{ category.name }} </span>
            </div>
          </NuxtLink>

          <div class="my-1">
            <span
              @click="redirectEditCategoryPage(category.id, category.name, category.image)"
              class="rounded-3 bg-warning p-1 my-1 me-2 cursor_pointer font_size_16"
            >
              Update
            </span>

            <span
              @click="redirectAddSubCategoryPage(category.id, category.name, category.image)"
              class="rounded-3 bg-warning p-1 cursor_pointer font_size_16"
            >
              Add Subcategory
            </span>
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

  // head() {
  //   return {
  //     title: 'Mock Test Categories',
  //     meta: [
  //       {
  //         hid: 'description',
  //         name: 'description',
  //         content:
  //           'Get all the categories at the Mock Certified application platform. Search and choose the category and their sub-category as per your interest, and select your preferred mock test.',
  //       },
  //       {
  //         hid: 'og:title',
  //         property: 'og:title',
  //         content: 'Mock Test Categories - Mockcertified App',
  //       },
  //       {
  //         hid: 'og:description',
  //         property: 'og:description',
  //         content:
  //           'Get all the categories at the Mock Certified application platform. Search and choose the category and their sub-category as per your interest, and select your preferred mock test.',
  //       },
  //       {
  //         name: 'keywords',
  //         content:
  //           'Mock Test Categories, Mockcertified App, AWS, Google, NDEB, NBDE, FSMB, Salesforce, Nursing, Cisco, Microsoft, EC Council, PMI, UiPath',
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
  //         content: 'Mock Test Categories - Mockcertified App',
  //       },
  //       {
  //         hid: 'twitter:description',
  //         name: 'twitter:description',
  //         content:
  //           'Get all the categories at the Mock Certified application platform. Search and choose the category and their sub-category as per your interest, and select your preferred mock test.',
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
      allCategories: [],
      searchQuery: '',
      allCategoriesFilter: [],
    };
  },

  computed: {
    ...mapState('testManagement', ['categories']),
  },

  async mounted() {
    if (!this.categories.length) {
      await this.getAllCategories();
    }

    this.allCategories = this.categories;
    this.allCategoriesFilter = this.allCategories;
  },

  methods: {
    ...mapActions('testManagement', ['getAllCategories']),
    ...mapMutations('admin', ['setEditCatSubCat']),

    redirectEditCategoryPage(catId, name, imageUrl) {
      const obj = { id: catId, name, imageUrl };
      this.setEditCatSubCat(obj);
      this.$router.push('/protected/admin/category/edit-category');
    },

    redirectAddSubCategoryPage(catId, name, imageUrl) {
      const obj = { id: catId, name, imageUrl };
      this.setEditCatSubCat(obj);
      this.$router.push('/protected/admin/category/add-subcategory');
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
