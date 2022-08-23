<template>
  <div class="container">
    <div v-if="!filteredTests.length" class="px-3">
      <h1>No Test Available</h1>
      <p>
        Want to buy new tests?
        <br />
        Click on the button below!
      </p>
      <NuxtLink to="/category" class="btn btn-secondary border border-2 border-dark rounded">
        Buy a test
      </NuxtLink>
    </div>

    <div v-else>
      <div class="text-end mb-2">
        <span>Sort by :</span>
        <select class="border border-primary rounded" v-model="sortBy">
          <option value="date">Date</option>
          <option value="duration">Duration</option>
        </select>
        <span class="border border-primary rounded px-1" @click="isAscending = !isAscending">
          <img v-if="isAscending" src="@/assets/images/arrow_up.svg" alt="up-arrow" class="mb-1" />
          <img v-else src="@/assets/images/arrow_up_gray.svg" alt="up-arrow" class="mb-1" />
          <img
            v-if="!isAscending"
            src="@/assets/images/arrow_down.svg"
            alt="down-arroe"
            class="mb-1"
          />
          <img v-else src="@/assets/images/arrow_down_gray.svg" alt="down-arroe" class="mb-1" />
        </span>
      </div>

      <div v-for="test in filteredTests" :key="test.id" @click="redirectPage(test)" class="mb-3">
        <TestCards
          :title="test.test.title"
          :description="`${test.test.time_limit} mins • ${
            test.test.questions.items.length
          } questions • ${totalMarks(test.test.questions.items)} marks`"
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
      filteredTests: [],
      sortBy: 'date',
      isAscending: true,
    };
  },

  computed: {
    ...mapState('auth', ['user']),
    ...mapState(['allPurchasedTests']),
  },

  watch: {
    sortBy(newValue, _oldValue) {
      if (newValue === 'duration') {
        this.filteredTests = [...this.filteredTests].sort(function (a, b) {
          return a.test.time_limit - b.test.time_limit;
        });
        return;
      }
      this.filteredTests = this.allPurchasedTests;
      this.isAscending = true;
    },
    isAscending() {
      this.filteredTests = [...this.filteredTests].reverse();
    },
  },

  async mounted() {
    await this.getUserTests();
    this.filteredTests = this.allPurchasedTests;
  },

  methods: {
    ...mapActions('testManagement', ['getUserTests']),

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
  },
};
</script>
