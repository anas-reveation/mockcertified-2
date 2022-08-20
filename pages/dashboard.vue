<template>
  <div class="container">
    <div>
      <div class="row justify-content-between">
        <div class="col">
          <h2 class="fw-bolder font_size_24">Featured</h2>
        </div>
        <div class="col-4 text-end">
          <NuxtLink to="/category" class="text-primary fw-bolder">see all</NuxtLink>
        </div>
      </div>

      <div
        v-for="(test, index) in featuredTests"
        :key="index"
        @click="redirectPage(test.id)"
        class="mb-3"
      >
        <TestCards
          v-if="index === 0"
          :title="test.title"
          :price="`$${formatPrice(test.price)}`"
          :addToCart="true"
          :description="`${test.time_limit} mins • ${
            test.questions.items.length
          } questions • ${totalMarks(test.questions.items)} marks`"
        />
      </div>
    </div>

    <div class="mt-3">
      <div class="row justify-content-between">
        <div class="col">
          <h2 class="fw-bolder font_size_24">Categories</h2>
        </div>
        <div class="col-4 text-end">
          <NuxtLink to="/category" class="text-primary fw-bolder">see all</NuxtLink>
        </div>
      </div>

      <div>
        <span
          v-for="(category, index) in allCategories"
          :key="index"
          class="bg-secondary border border-2 border-dark rounded-pill fw-bolder m-1 p-2 d-inline-block text-center text-capitalize font_size_16"
        >
          <NuxtLink :to="`/category/${category.id}`"> {{ category.name }} </NuxtLink>
        </span>
      </div>
    </div>

    <div class="mt-3 pb-3">
      <div class="row justify-content-between">
        <div class="col">
          <h2 class="fw-bolder font_size_24">Recently Added</h2>
        </div>
        <div class="col-4 text-end">
          <NuxtLink to="/category" class="text-primary fw-bolder">see all</NuxtLink>
        </div>
      </div>

      <div v-for="(test, index) in recentlyAddedTests" :key="index" @click="redirectPage(test.id)">
        <TestCards
          v-if="index === 0"
          :title="test.title"
          :price="`$${formatPrice(test.price)}`"
          :addToCart="true"
          :description="`${test.time_limit} mins • ${
            test.questions.items.length
          } questions • ${totalMarks(test.questions.items)} marks`"
        />
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
      purchasedTestOpen: false,
      attemptedOpen: false,
      noTest: false,
      sortingTabName: '',
      filteredTests: [],
      allCategories: [],
    };
  },

  computed: {
    ...mapState('testManagement', ['featuredTests', 'categories', 'recentlyAddedTests']),
  },

  watch: {
    sortingTabName(newValue, _oldValue) {
      if (newValue) {
        this.filteredTests = this.allAttemptedTests.filter((test) => test.status === newValue);
        return;
      }
      this.filteredTests = this.allAttemptedTests;
    },
  },

  async mounted() {
    if (!this.categories.length) {
      await this.getAllCategories();
    }

    if (!this.featuredTests.length) {
      await this.getAllFeaturedTest();
    }

    if (!this.recentlyAddedTests.length) {
      await this.getRecentlyAddedTests();
    }
    this.allCategories = this.categories;
  },

  methods: {
    ...mapActions('testManagement', [
      'getAllFeaturedTest',
      'getRecentlyAddedTests',
      'getAllCategories',
    ]),

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

    redirectPage(test) {
      this.$router.push(`/test/${test.test.id}`);
    },

    attempt() {
      this.$router.push('/attempt');
    },
  },
};
</script>

<style scoped>
.btn-active-color {
  background-color: #11a49b !important;
  color: white !important;
}
.btn-color {
  color: black !important;
}
.btn-outline-primary {
  outline-color: #11a49b !important;
}
.tabs {
  border: 1px solid rgb(143, 142, 142);
}
.result-circle {
  width: 50px;
  height: 50px;
  border: 1px solid rgb(156, 155, 155);
  border-radius: 50%;
}
</style>
