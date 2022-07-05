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
          attemptedOpen
            ? 'btn tabs btn-active-color shadow flex-fill p-2'
            : 'btn tabs flex-fill p-2'
        "
        @click="changeTab('attempted')"
      >
        Attempted
      </button>

      <button
        :class="
          allTestOpen ? 'btn tabs btn-active-color shadow flex-fill p-2' : 'btn tabs flex-fill p-2'
        "
        @click="changeTab('all')"
      >
        All Tests
      </button>
    </div>
    <div class="mt-3">
      <div
        v-if="attemptedOpen"
        v-for="test in attemptedTests"
        :key="test.id"
        @click="redirectPage(test.id)"
      >
        <TestCard :title="test.title" :timeLimit="test.time_limit" />
      </div>
      <div
        v-if="allTestOpen"
        v-for="test in allTests"
        :key="test.id"
        @click="redirectPage(test.id)"
      >
        <TestCard :title="test.title" :timeLimit="test.time_limit" />
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
      currentUser: {},
      attemptedOpen: true,
      allTestOpen: false,
      attemptedTests: [],
      allTests: [],
    };
  },

  computed: {
    ...mapState('auth', ['user']),
  },

  async mounted() {
    const allTests = await this.getTests();
    this.attemptedTests = allTests;
    this.allTests = allTests;
  },

  methods: {
    ...mapActions('testManagement', ['getTests']),

    changeTab(tabName) {
      if (tabName === 'attempted') {
        this.attemptedOpen = true;
        this.allTestOpen = false;
      }
      if (tabName === 'all') {
        this.attemptedOpen = false;
        this.allTestOpen = true;
      }
    },

    redirectPage(id) {
      this.$router.push(`/test/${id}`);
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
