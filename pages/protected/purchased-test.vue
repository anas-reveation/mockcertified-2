<template>
  <div class="container">
    <div v-if="isFetched && !filteredTests.length">
      <h1 class="fw-bold font_size_32">No Test Available</h1>
      <p>
        Want to buy new tests?
        <br />
        Click on the button below!
      </p>

      <div class="text-center">
        <img
          src="@/assets/images/boy_illustration.png"
          alt="boy_illustration"
          class="boy_illustration"
        />
        <NuxtLink
          to="/category"
          class="btn btn-secondary border border-2 border-primary rounded mt-4 w-50"
        >
          Buy a test
        </NuxtLink>
      </div>
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
      isFetched: false,
    };
  },

  computed: {
    ...mapState('auth', ['user']),
    ...mapState(['isLoading', 'allPurchasedTests']),
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
    this.isFetched = true;
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
      this.$router.push(`/protected/test/${test.test.id}`);
    },
  },
};
</script>

<style scoped>
.boy_illustration {
  object-fit: contain;
  height: 250px;
  width: 250px;
}
</style>
