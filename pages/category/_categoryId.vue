<template>
  <div class="container-fluid">
    <div v-for="test in allTestByCategory" :key="test.id" @click="redirectPage(test.id)">
      <TestCard
        :title="test.title"
        :timeLimit="test.time_limit"
        :price="test.price"
        :addItem="true"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  middleware: ['authenticated'],

  data() {
    return {
      allTestByCategory: [],
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
    this.allTestByCategory = await this.getTestsByCategory(this.categoryId);
  },

  methods: {
    ...mapActions('testManagement', ['getTestsByCategory']),
    ...mapMutations('buyer', ['addToCart']),

    redirectPage(id) {
      this.$router.push(`/category/test/${id}`);
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
