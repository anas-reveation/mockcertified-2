<template>
  <div class="container">
    <SearcBar v-model="searchQuery" />

    <p class="mt-2">
      <NuxtLink to="/category">
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
        <a
          href="#"
          v-for="category in allCategoriesFilter"
          :key="category.id"
          class="d-inline col-sm-4 border border-2 border-primary rounded-pill mt-3 p-2"
          @click="getAllTests(category.id, category.name)"
        >
          <div class="row">
            <span class="col-2 d-flex align-items-center">
              <img :src="category.image" alt="category" class="rounded-circle category_image" />
            </span>
            <span class="col text-start"> {{ category.name }}</span>
          </div>
        </a>
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
      <div class="row">
        <div v-for="test in allCategoriesFilter" class="col-sm-6 col-md-4 mb-3">
          <NuxtLink :to="`/category/test/${test.id}`">
            <TestCards
              :title="test.title"
              :price="`$${formatPrice(test.price)}`"
              :addToCart="true"
              :description="`${test.time_limit} mins • ${
                test.questions.items.length
              } questions • ${totalMarks(test.questions.items)} marks`"
            />
          </NuxtLink>
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
          item.title.toLowerCase().match(newValue.toLowerCase().replace(/\s+/g, ' ').trim()),
        );
      } else {
        this.allCategoriesFilter = this.allSubCategory.filter((item) =>
          item.name.toLowerCase().match(newValue.toLowerCase().replace(/\s+/g, ' ').trim()),
        );
      }
    },
  },

  computed: {
    ...mapState('buyer', ['cartItems']),
    ...mapState('testManagement', ['categoryName']),
    ...mapState(['isLoading']),
  },

  async asyncData({ params }) {
    const categoryId = params.categoryId;
    return { categoryId };
  },

  async mounted() {
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
    ...mapActions('testManagement', ['getAllSubCategories', 'getTestsBySubCategory']),
    ...mapMutations('buyer', ['addToCart']),

    // redirectPage(id) {
    //   this.$router.push(`/category/test/${id}`);
    // },

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
      this.allTestBySubCategory = await this.getTestsBySubCategory(subCategoryId);
      if (!this.allTestBySubCategory.length) {
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
        this.breadCrum.pop();
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
.category_image {
  object-fit: contain;
  width: 35px;
  height: 35px;
}
</style>
