<template>
  <div class="container">
    <form class="row position-relative" @submit.prevent="">
      <div class="position-absolute search_icon_position">
        <img src="@/assets/images/search_icon.svg" alt="search-icon" width="30" height="30" />
      </div>
      <input
        class="col form-control bg_input border border-2 border-primary rounded-pill me-2 text_indent"
        type="search"
        placeholder="Search"
        aria-label="Search"
        v-model="searchQuery"
      />
      <button class="col-3 btn btn-primary text-white rounded-pill px-2" type="button">
        Search
      </button>
    </form>

    <h1 class="fw-bolder mt-3 font_size_24">Categories</h1>

    <div
      v-for="category in allCategoriesFilter"
      :key="category.id"
      class="border border-2 border-primary rounded-pill mt-3 p-2"
      @click="redirectPage(category.id)"
    >
      <div class="row">
        <span class="col-3">
          <img :src="category.image" alt="category" class="rounded-circle category_image" />
        </span>
        <span class="col text-start">
          {{ category.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  middleware: ['authenticated'],

  data() {
    return {
      allCategories: [],
      searchQuery: '',
      allCategoriesFilter: [],
    };
  },

  watch: {
    searchQuery(newValue) {
      this.allCategoriesFilter = this.allCategories.filter((item) =>
        item.name.toLowerCase().match(newValue.toLowerCase()),
      );
    },
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

    redirectPage(id) {
      this.$router.push(`/category/${id}`);
    },
  },
};
</script>

<style scoped>
.bg_input {
  background-color: #e9edfb;
}

.search_icon_position {
  top: 5px;
  left: -7px;
  width: 35px;
}

.text_indent {
  text-indent: 25px;
}

.category_image {
  object-fit: contain;
  width: 35px;
  height: 35px;
}
</style>
