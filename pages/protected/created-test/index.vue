<template>
  <div class="container">
    <div class="mb-2 w-100 d-flex justify-content-center">
      <div
        class="text-primary border border-2 border-primary rounded flex-fill text-center fw-bold p-1 m-1"
        :class="isApprovedOpen && 'bg-secondary text-dark'"
        @click="changeTabName('isApprovedOpen')"
      >
        Approved
      </div>
      <div
        class="text-primary border border-2 border-primary rounded flex-fill text-center fw-bold p-1 m-1"
        :class="isInProgressOpen && 'bg-secondary text-dark'"
        @click="changeTabName('isInProgressOpen')"
      >
        Ongoing
      </div>
      <div
        class="text-primary border border-2 border-primary rounded flex-fill text-center fw-bold p-1 m-1"
        :class="isRejectedOpen && 'bg-secondary text-dark'"
        @click="changeTabName('isRejectedOpen')"
      >
        Rejected
      </div>
    </div>

    <div v-if="!isLoading && !filteredTests.length" class="mt-4 px-3">
      <h1>No Test Available</h1>
    </div>

    <div v-for="test in filteredTests" :key="test.id" class="mb-3" @click="redirectPage(test.id)">
      <TestCards
        :title="test.title"
        :price="`$${formatPrice(test.price)}`"
        :description="`${test.time_limit} mins • ${
          test.questions.items.length
        } questions • ${totalMarks(test.questions.items)} marks`"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  middleware: ['authenticated'],

  data() {
    return {
      isApprovedOpen: false,
      isInProgressOpen: false,
      isRejectedOpen: false,
      noTest: false,
      filteredTests: [],
    };
  },

  computed: {
    ...mapState('auth', ['user']),
    ...mapState(['isLoading', 'allCreatedTests']),

    approvedTests() {
      return this.allCreatedTests.filter((test) => test.status === 'APPROVED');
    },

    inProgressTests() {
      return this.allCreatedTests.filter((test) => test.status === 'IN_PROGRESS');
    },

    rejectedTests() {
      return this.allCreatedTests.filter((test) => test.status === 'REJECTED');
    },
  },

  async mounted() {
    if (!this.allCreatedTests.length) {
      await this.getUserTests();
    }
    this.changeTabName('isApprovedOpen');
  },

  methods: {
    ...mapActions('testManagement', ['getUserTests']),

    changeTabName(tabName) {
      if (tabName === 'isApprovedOpen') {
        this.isApprovedOpen = true;
        this.isInProgressOpen = false;
        this.isRejectedOpen = false;
        this.filteredTests = this.approvedTests;
      } else if (tabName === 'isInProgressOpen') {
        this.isInProgressOpen = true;
        this.isApprovedOpen = false;
        this.isRejectedOpen = false;
        this.filteredTests = this.inProgressTests;
      } else if (tabName === 'isRejectedOpen') {
        this.isRejectedOpen = true;
        this.isApprovedOpen = false;
        this.isInProgressOpen = false;
        this.filteredTests = this.rejectedTests;
      }
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

    redirectPage(id) {
      this.$router.push(`/protected/created-test/${id}`);
    },
  },
};
</script>

<style scoped>
.btn-active-color {
  background-color: #11a49b !important;
  color: white !important;
}

.btn-outline-primary {
  outline-color: #11a49b !important;
}
.tabs {
  border: 1px solid rgb(143, 142, 142);
}
</style>
