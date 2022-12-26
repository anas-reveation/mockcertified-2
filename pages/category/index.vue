<template>
  <div class="container">
    <SearcBar v-model="searchQuery" :searchQueryFunc="searchQueryFunc" />

    <h1 class="fw-bolder mt-3 font_size_24">Categories</h1>

    <div class="row">
      <NuxtLink
        :to="`/category/${category.slug}`"
        v-for="category in allCategoriesFilter"
        :key="category.id"
        class="col-12 col-md-4 col-sm-6"
        data-aos="zoom-in"
      >
        <div class="row shawdow_card m-2 p-2 category_border_radius">
          <span class="col-2 me-2 d-flex align-items-center">
            <img :src="category.image" alt="category" class="category_image" />
          </span>
          <span class="col text-start font_size_16"> {{ category.name }} </span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  middleware: ['authenticated'],

  head() {
    return {
      title: 'Mock Test Categories',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Get all the categories at the Mock Certified application platform. Search and choose the category and their sub-category as per your interest, and select your preferred mock test.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Mock Test Categories - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Get all the categories at the Mock Certified application platform. Search and choose the category and their sub-category as per your interest, and select your preferred mock test.',
        },
        {
          name: 'keywords',
          content:
            'Mock Test Categories, Mockcertified App, AWS, Google, NDEB, NBDE, FSMB, Salesforce, Nursing, Cisco, Microsoft, EC Council, PMI, UiPath',
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
          content: 'Mock Test Categories - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Get all the categories at the Mock Certified application platform. Search and choose the category and their sub-category as per your interest, and select your preferred mock test.',
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
      allCategories: [],
      searchQuery: '',
      allCategoriesFilter: [],
    };
  },

  watch: {
    // searchQuery(newValue) {
    //   this.allCategoriesFilter = this.allCategories.filter((item) =>
    //     item.name.toLowerCase().match(newValue.toLowerCase().replace(/\s+/g, ' ').trim()),
    //   );
    // },
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

    async searchQueryFunc() {
      this.$router.push(`/search?search_query=${this.searchQuery}`);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

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
