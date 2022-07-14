<template>
  <div class="container-fluid">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <form class="d-flex w-100" @submit.prevent="">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="searchQuery"
          />
          <button class="btn btn-outline-success" type="button">Search</button>
        </form>
      </div>
    </nav>
    <div
      v-for="category in allCategoriesFilter"
      :key="category.id"
      @click="redirectPage(category.id)"
    >
      <TestCard :title="category.name" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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

  async mounted() {
    this.allCategories = await this.getAllCategories();
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

<style>
.btn-color {
  background-color: #11a49b !important;
  color: white;
}
</style>
