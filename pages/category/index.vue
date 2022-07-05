<template>
  <div class="container-fluid">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <form class="d-flex w-100">
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
      @click="redirectPage(category.category)"
    >
      <TestCard :title="category.category" :timeLimit="category.time_limit" />
    </div>
  </div>
</template>

<script>
// TODO Fetch all test with category
import { mapActions, mapState } from 'vuex';
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
      // this.$emit("input", newValue);
      console.log('newValue', newValue);
      this.allCategoriesFilter = this.allCategories.filter((item) =>
        item.category.toLowerCase().match(newValue.toLowerCase()),
      );
      console.log('thissss', this.temp);
    },
  },

  async mounted() {
    const allTests = await this.getTests();
    this.allCategories = allTests;
    this.allCategoriesFilter = allTests;
  },

  methods: {
    ...mapActions('testManagement', ['getTests']),
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
