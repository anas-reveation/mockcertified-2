<template>
  <div class="container">
    <h1 class="mt-5 mb-4 font_size_36 col-md-12 col-sm-6">Created Test</h1>

    <div class="mb-2 w-100 d-flex justify-content-center width_res">
      <div
        class="text-primary border border-2 border-primary rounded flex-fill text-center fw-bold p-1 m-1 cursor_pointer"
        :class="isApprovedOpen && 'bg-secondary text-dark'"
        @click="changeTabName('isApprovedOpen')"
      >
        Approved
      </div>
      <div
        class="text-primary border border-2 border-primary rounded flex-fill text-center fw-bold p-1 m-1 cursor_pointer"
        :class="isInProgressOpen && 'bg-secondary text-dark'"
        @click="changeTabName('isInProgressOpen')"
      >
        Ongoing
      </div>
      <div
        class="text-primary border border-2 border-primary rounded flex-fill text-center fw-bold p-1 m-1 cursor_pointer"
        :class="isRejectedOpen && 'bg-secondary text-dark'"
        @click="changeTabName('isRejectedOpen')"
      >
        Rejected
      </div>
    </div>

    <div v-if="!isLoading && !filteredTests.length" class="mt-4 px-3">
      <h1>No Test Available</h1>
    </div>
    <div class="row">
      <div v-for="test in filteredTests" :key="test.id" class="col-sm-4 mb-3">
        <NuxtLink :to="`/protected/created-test/${test.slug}`">
          <TestCards
            :title="test.title"
            :price="`$${formatPrice(test.price)}`"
            :description="`${test.time_limit} mins • ${
              test.questions.items.length
            } questions • ${totalMarks(test.questions.items)} marks`"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  middleware: ['authenticated'],

  head() {
    return {
      title: 'Created Test',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'View all of your previously created tests in single dashboard. How many were accepted, how many were in progress, and how many were rejected?',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Created Test - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'View all of your previously created tests in single dashboard. How many were accepted, how many were in progress, and how many were rejected?',
        },
        {
          name: 'keywords',
          content: 'Created Test, Approved, Ongoing, Rejected, Mockcertified App',
        },

        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `https://${process.env.DOMAIN}${require('~/assets/images/logo_with_name.svg')}`,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://${process.env.DOMAIN}/${this.$router.currentRoute.name}`,
        },

        // Twitter Meta Tags
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Created Test - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'View all of your previously created tests in single dashboard. How many were accepted, how many were in progress, and how many were rejected?',
        },

        {
          hid: 'twitter:domain',
          property: 'twitter:domain',
          content: process.env.DOMAIN,
        },
        {
          hid: 'twitter:url',
          property: 'twitter:url',
          content: `https://${process.env.DOMAIN}/${this.$router.currentRoute.name}`,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: `https://${process.env.DOMAIN}${require('~/assets/images/logo_with_name.svg')}`,
        },
      ],
    };
  },

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

    // redirectPage(id) {
    //   this.$router.push(`/protected/created-test/${id}`);
    // },
  },
};
</script>

<style scoped lang="scss">
@import '~bootstrap/scss/_functions.scss';
@import '~bootstrap/scss/_variables.scss';
@import '~bootstrap/scss/mixins/_breakpoints';

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

@include media-breakpoint-up(sm) {
  .width_res {
    width: 25% !important;
    margin-left: auto;
  }
}
</style>
