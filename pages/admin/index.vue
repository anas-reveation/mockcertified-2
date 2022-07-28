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
          isInProgressOpen
            ? 'btn tabs btn-active-color shadow flex-fill p-2'
            : 'btn tabs flex-fill p-2'
        "
        @click="changeTab('isInProgressOpen')"
      >
        In Progess
      </button>

      <button
        :class="
          isApprovedOpen
            ? 'btn tabs btn-active-color shadow flex-fill p-2'
            : 'btn tabs flex-fill p-2'
        "
        @click="changeTab('isApprovedOpen')"
      >
        Approved
      </button>

      <button
        :class="
          isRejectedOpen
            ? 'btn tabs btn-active-color shadow flex-fill p-2'
            : 'btn tabs flex-fill p-2'
        "
        @click="changeTab('isRejectedOpen')"
      >
        Rejected
      </button>
    </div>

    <ClientOnly>
      <div class="mt-3" v-if="filteredTests.length">
        <div v-for="test in filteredTests" :key="test.id" @click="redirectPage(test.id)">
          <TestCard :title="test.title" :timeLimit="test.time_limit" />
        </div>
      </div>

      <div v-else class="container mt-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">No test available</h5>
          </div>
        </div>
      </div>
    </ClientOnly>
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
    ...mapState('admin', ['allTests']),

    approvedTests() {
      return this.allTests.filter((test) => test.status === 'APPROVED');
    },

    inProgressTests() {
      return this.allTests.filter((test) => test.status === 'IN_PROGRESS');
    },

    rejectedTests() {
      return this.allTests.filter((test) => test.status === 'REJECTED');
    },
  },

  async mounted() {
    await this.getAllTests();
    this.changeTab('isInProgressOpen');
  },

  methods: {
    ...mapActions('admin', ['getAllTests']),

    changeTab(tabName) {
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

    redirectPage(id) {
      this.$router.push(`/admin/test/${id}`);
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
