<template>
  <div class="container">
    <SearcBar v-model="searchQuery" :searchQueryFunc="searchQueryFunc" class="mt-3" />

    <AnimatedPlaceholder v-if="isLoaderHidden" width="200px" height="10px" />

    <div v-if="isLoaderHidden" class="row mt-4">
      <div v-for="i in 6" :key="i" class="col-12 col-md-4 col-sm-6" data-aos="zoom-in">
        <AnimatedPlaceholder width="200px" borderRadius="50px" class="m-2" />
      </div>
    </div>

    <h1 v-if="allCategoriesFilter.length" class="fw-bolder mt-3 font_size_24">Categories</h1>

    <div v-if="allCategoriesFilter.length" class="row mt-4">
      <NuxtLink
        :to="`/category/${category.slug}`"
        v-for="category in allCategoriesFilter"
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
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
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
      isHovering: false,
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
    ...mapState(['isLoaderHidden']),
    ...mapState('testManagement', ['categories']),
  },

  async mounted() {
    this.setIsLoaderHidden(true);
    if (!this.categories.length) {
      await this.getAllCategories();
    }
    this.allCategories = this.categories;
    this.allCategoriesFilter = [...this.allCategories].sort((a, b) => {
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
    this.setIsLoaderHidden(false);
  },

  methods: {
    ...mapMutations(['setIsLoaderHidden']),
    ...mapActions('testManagement', ['getAllCategories']),

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
