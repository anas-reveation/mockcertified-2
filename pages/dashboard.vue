<template>
  <div class="container-fluid">
    <span class="fs-2 fw-bold d-block"></span>
    <div
      class="mt-2 w-100 d-flex justify-content-center"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <button
        :class="
          purchasedTestOpen
            ? 'btn tabs btn-active-color shadow flex-fill p-2'
            : 'btn tabs flex-fill p-2'
        "
        @click="changeTab('purchasedTestOpen')"
      >
        Purchased
      </button>

      <button
        :class="
          attemptedOpen
            ? 'btn tabs btn-active-color shadow flex-fill p-2'
            : 'btn tabs flex-fill p-2'
        "
        @click="changeTab('attemptedOpen')"
      >
        Attempted
      </button>
    </div>
    <div class="mt-3">
      <div
        v-if="purchasedTestOpen"
        v-for="test in allPurchasedTests"
        :key="test.id"
        @click="redirectPage(test)"
      >
        <TestCard :title="test.test.title" :timeLimit="test.test.time_limit" />
      </div>
    </div>

    <div v-if="noTest" class="container">
      <div class="card">
        <!-- <div class="card-header">No test available</div> -->
        <div class="card-body">
          <h5 class="card-title">No test available</h5>
          <p v-if="purchasedTestOpen" class="card-text">Want to buy? Click below button</p>
          <div v-else>
            <p class="card-text">Give a test from your purchased test</p>
            <button
              type="button"
              class="btn btn-outline-success"
              @click="changeTab('purchasedTestOpen')"
            >
              Attempt a test
            </button>
          </div>
          <NuxtLink v-if="purchasedTestOpen" to="/category" class="btn btn-outline-success">
            Buy a test
          </NuxtLink>
        </div>
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
      purchasedTestOpen: false,
      attemptedOpen: false,
      noTest: false,
    };
  },

  computed: {
    ...mapState('auth', ['user']),
    ...mapState(['allPurchasedTests', 'allAttemptedTests']),
  },

  async mounted() {
    this.changeTab('purchasedTestOpen');
    if (this.allPurchasedTests.length <= 0) {
      await this.getAllPurchasedTests();
    }
    if (this.allAttemptedTests.length <= 0) {
      // await this.getAllAttemptedTests();
    }
    this.allPurchasedTests.length > 0 ? (this.noTest = false) : (this.noTest = true);
  },

  methods: {
    ...mapActions('testManagement', ['getAllPurchasedTests']),

    ...mapMutations(['selectTest']),

    changeTab(tabName) {
      if (tabName === 'purchasedTestOpen') {
        this.attemptedOpen = false;
        this.purchasedTestOpen = true;
        this.allPurchasedTests.length > 0 ? (this.noTest = false) : (this.noTest = true);
      }

      if (tabName === 'attemptedOpen') {
        this.attemptedOpen = true;
        this.purchasedTestOpen = false;
        this.allAttemptedTests.length > 0 ? (this.noTest = false) : (this.noTest = true);
      }
    },

    redirectPage(test) {
      this.selectTest(test.test);
      this.$router.push(`/test/${test.test.id}`);
    },

    attempt() {
      this.$router.push('/attempt');
    },
    seeResult() {
      this.$router.push('/result');
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
