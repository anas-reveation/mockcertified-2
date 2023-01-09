<template>
  <div class="container">
    <div class="mb-2 d-flex justify-content-center justify-content-sm-end">
      <div
        class="p-1 m-1 cursor_pointer sorting_text_size"
        :class="isApprovedOpen ? 'text-primary' : 'text-dark'"
        @click="changeTabName('isApprovedOpen')"
      >
        Approved
        <div v-if="isApprovedOpen" class="bg-primary mt-0 blue_underline" />
      </div>
      <div
        class="p-1 m-1 cursor_pointer sorting_text_size"
        :class="isInProgressOpen ? 'text-primary' : 'text-dark'"
        @click="changeTabName('isInProgressOpen')"
      >
        Ongoing
        <div v-if="isInProgressOpen" class="bg-primary mt-0 blue_underline" />
      </div>
      <div
        class="p-1 m-1 cursor_pointer sorting_text_size"
        :class="isRejectedOpen ? 'text-primary' : 'text-dark'"
        @click="changeTabName('isRejectedOpen')"
      >
        Rejected
        <div v-if="isRejectedOpen" class="bg-primary mt-0 blue_underline" />
      </div>
    </div>

    <h1 class="mt-2 mb-4 text-primary font_size_32 col-md-12 col-sm-6">Created Test</h1>

    <div v-if="isLoaderHidden" class="row">
      <div v-for="i in 3" :key="i" class="col-sm-6 col-md-4 mb-3" data-aos="flip-right">
        <TestCardsSkeleton />
      </div>
    </div>

    <div v-if="!isLoaderHidden && !filteredTests.length" class="mt-4 px-3">
      <div class="text-center">
        <img
          src="@/assets/images/boy_illustration.png"
          alt="boy_illustration"
          class="boy_illustration"
        />
        <h1 class="fw-bolder mt-3 font_size_32">No Test Available</h1>
      </div>
    </div>
    <div v-if="filteredTests.length && !isLoading" class="row">
      <div v-for="test in filteredTests" :key="test.id" class="col-sm-4 mb-3" data-aos="flip-right">
        <NuxtLink :to="`/protected/created-test/${test.slug}`">
          <TestCards
            :title="test.title"
            :price="`$${formatPrice(test.price)}`"
            :description="`${test.time_limit} mins • ${
              test.questions.items.length
            } questions • ${totalMarks(test.questions.items)} marks`"
            :dateTime="getDate(test.createdAt)"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
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
    ...mapState(['isLoading', 'isLoaderHidden', 'allCreatedTests']),

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
    this.setIsLoaderHidden(true);
    if (!this.allCreatedTests.length) {
      await this.getUserTests();
    }
    this.changeTabName('isApprovedOpen');

    this.setIsLoaderHidden(false);
  },

  methods: {
    ...mapActions('testManagement', ['getUserTests']),
    ...mapMutations(['setIsLoaderHidden']),

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

    getDate(getdatetime) {
      var dateStr = new Date(getdatetime);
      return dateStr.toLocaleDateString();
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

.boy_illustration {
  object-fit: contain;
  height: 230px;
  width: 230px;
}

.blue_underline {
  height: 2px;
  background: #6782e1;
}

@include media-breakpoint-up(sm) {
  .width_res {
    width: 25% !important;
    margin-left: auto;
  }
}

@include media-breakpoint-down(sm) {
  .sorting_text_size {
    font-size: 14px;
  }
}
</style>
