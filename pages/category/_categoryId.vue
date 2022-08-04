<template>
  <div class="container-fluid">
    <div v-if="!allTestBySubCategory.length">
      <div v-for="category in allSubCategory" :key="category.id" @click="getAllTests(category.id)">
        <TestCard :title="category.name" />
      </div>
    </div>

    <div v-else>
      <div class="row">
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
      </div>
      <div v-for="test in allTestBySubCategory" @click="redirectPage(test.id)">
        <TestCard
          :title="test.title"
          :timeLimit="test.time_limit"
          :price="formatPrice(test.price)"
          :addItem="true"
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
    };
  },

  computed: {
    ...mapState('buyer', ['cartItems']),
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
  },

  methods: {
    ...mapActions('testManagement', ['getAllSubCategories', 'getTestsBySubCategory']),
    ...mapMutations('buyer', ['addToCart']),

    redirectPage(id) {
      this.$router.push(`/category/test/${id}`);
    },

    async getAllTests(subCategoryId) {
      this.allTestBySubCategory = await this.getTestsBySubCategory(subCategoryId);
      if (!this.allTestBySubCategory.length) {
        alert('No tests available');
        this.$router.back();
        return;
      }
    },

    formatPrice(price) {
      return parseFloat(price).toFixed(2);
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
