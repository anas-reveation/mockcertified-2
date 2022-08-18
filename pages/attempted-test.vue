<template>
  <div class="container">
    <div v-if="!filteredTests.length" class="px-3">
      <h1>No Test Attempted</h1>
      <p>
        Want to give a test?
        <br />
        Click on the button below!
      </p>
      <NuxtLink to="/purchased-test" class="btn btn-secondary border border-2 border-dark rounded">
        Purchased Test
      </NuxtLink>
    </div>

    <div v-else>
      <div class="mb-2 w-100 d-flex justify-content-center overflow-scroll">
        <div
          class="text-primary border border-2 border-primary rounded flex-fill text-center fw-bold p-1 m-1"
          :class="sortingTabName === 'IN_PROGRESS' && 'bg-secondary text-dark'"
          @click="changeTabName('IN_PROGRESS')"
        >
          Ongoing
        </div>
        <div
          class="text-primary border border-2 border-primary rounded flex-fill text-center fw-bold p-1 m-1"
          :class="sortingTabName === 'COMPLETED' && 'bg-secondary text-dark'"
          @click="changeTabName('COMPLETED')"
        >
          Completed
        </div>
        <div
          class="text-primary border border-2 border-primary rounded flex-fill text-center fw-bold p-1 m-1"
          :class="sortingTabName === 'ABORTED' && 'bg-secondary text-dark'"
          @click="changeTabName('ABORTED')"
        >
          Aborted
        </div>
      </div>

      <div class="mb-2 row justify-content-end">
        <div class="col text-end">
          <span>Sort by :</span>
          <select class="border border-primary rounded" v-model="sortBy">
            <option value="date">Date</option>
            <option value="duration">Duration</option>
          </select>
        </div>
        <div class="col-2">
          <span class="border border-primary rounded px-2" @click="isAscending = !isAscending">
            <img
              v-if="isAscending"
              src="@/assets/images/arrow_up.svg"
              alt="up-arrow"
              class="mb-1"
            />
            <img v-else src="@/assets/images/arrow_down.svg" alt="down-arroe" class="mb-1" />
          </span>
        </div>
      </div>

      <div
        v-for="test in filteredTests"
        :key="test.id"
        class="mb-3"
        @click="test.status === 'IN_PROGRESS' ? redirectPage(test) : redirectResultPage(test.id)"
      >
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
      sortingTabName: '',
      isAscending: true,
    };
  },

  computed: {
    ...mapState('auth', ['user']),
    ...mapState(['allAttemptedTests']),
  },

  watch: {
    sortBy(newValue, _oldValue) {
      if (newValue === 'duration') {
        this.filteredTests = [...this.filteredTests].sort(function (a, b) {
          return a.test.time_limit - b.test.time_limit;
        });
        return;
      }
      this.filteredTests = this.allAttemptedTests;
      this.isAscending = true;
    },

    sortingTabName(newValue, _oldValue) {
      if (newValue) {
        this.filteredTests = this.allAttemptedTests.filter((test) => test.status === newValue);
        return;
      }
      this.filteredTests = this.allAttemptedTests;
    },

    isAscending() {
      this.filteredTests = [...this.filteredTests].reverse();
    },
  },

  async mounted() {
    await this.getUserTests();
    this.filteredTests = this.allAttemptedTests;
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

    changeTabName(tabName) {
      if (this.sortingTabName === tabName) {
        this.filteredTests = this.allAttemptedTests;
        this.sortingTabName = '';
        return;
      }
      this.sortingTabName = tabName;
    },

    redirectPage(test) {
      this.$router.push(`/test/${test.test.id}`);
    },

    redirectResultPage(attemptId) {
      this.$router.push(`/test/result/${attemptId}`);
    },
  },
};
</script>
