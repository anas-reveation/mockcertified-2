<template>
  <div class="container">
    <form class="row position-relative" @submit.prevent="">
      <span class="position-absolute search_icon_position">
        <img
          class=""
          src="@/assets/images/search_icon.svg"
          alt="search-icon"
          width="30"
          height="30"
        />
      </span>
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

    <p class="mt-2">
      Categories
      <span
        v-for="(item, index) in breadCrum"
        :key="index"
        :class="index === breadCrum.length - 1 && 'fw-bolder'"
      >
        > {{ item.name }}
      </span>
    </p>
    <div v-if="!allTestBySubCategory.length">
      <div
        v-for="category in allCategoriesFilter"
        :key="category.id"
        class="border border-2 border-primary rounded-pill mt-3 p-2"
        @click="getAllTests(category.id, category.name)"
      >
        <div class="row">
          <span class="col-3">
            <img
              src="https://techaide.global/uploads/image/case-2.png"
              alt="category"
              width="40"
              height="30"
            />
          </span>
          <span class="col text-start">
            {{ category.name }}
          </span>
        </div>
      </div>
    </div>

    <div v-else>
      <!-- <div class="row">
        <div class="col-2">
          <img
            src="@/assets/images/previous.png"
            class="pb-4"
            width="30"
            @click="allTestBySubCategory = []"
            alt=""
          />
        </div>
        <div class="col-9 fw-bold text-capitalize">
          <h1 class="text-left">All Tests</h1>
        </div>
      </div> -->
      <div v-for="test in allCategoriesFilter" @click="redirectPage(test.id)" class="mb-3">
        <TestCards
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
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  middleware: ['authenticated'],

  data() {
    return {
      allSubCategory: [],
      allTestBySubCategory: [],
      breadCrum: [],
      searchQuery: '',
      allCategoriesFilter: [],
    };
  },

  watch: {
    searchQuery(newValue) {
      if (this.allTestBySubCategory.length) {
        this.allCategoriesFilter = this.allTestBySubCategory.filter((item) =>
          item.title.toLowerCase().match(newValue.toLowerCase()),
        );
      } else {
        this.allCategoriesFilter = this.allSubCategory.filter((item) =>
          item.name.toLowerCase().match(newValue.toLowerCase()),
        );
      }
    },
  },

  computed: {
    ...mapState('buyer', ['cartItems']),
    ...mapState('testManagement', ['categoryName']),
  },

  async asyncData({ params }) {
    const categoryId = params.categoryId;
    return { categoryId };
  },

  async mounted() {
    this.allSubCategory = await this.getAllSubCategories(this.categoryId);
    if (!this.allSubCategory.length) {
      alert('No tests available');
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
    ...mapActions('testManagement', ['getAllSubCategories', 'getTestsBySubCategory']),
    ...mapMutations('buyer', ['addToCart']),

    redirectPage(id) {
      this.$router.push(`/category/test/${id}`);
    },

    async getAllTests(subCategoryId, name) {
      const obj = {
        name,
      };
      this.breadCrum.push(obj);
      this.allTestBySubCategory = await this.getTestsBySubCategory(subCategoryId);
      if (!this.allTestBySubCategory.length) {
        alert('No tests available');
        this.$router.back();
        return;
      }
      this.allCategoriesFilter = this.allTestBySubCategory;
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
</style>
