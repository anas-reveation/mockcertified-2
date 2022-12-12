<template>
  <div class="container">
    <div>
      <div class="mb-2 w-100 d-flex justify-content-center width_res">
        <div
          class="text-primary border border-2 border-primary rounded flex-fill text-center fw-bold p-1 m-1 cursor_pointer"
          :class="sortingTabName === 'IN_PROGRESS' && 'bg-secondary text-dark'"
          @click="changeTabName('IN_PROGRESS')"
        >
          Ongoing
        </div>
        <div
          class="text-primary border border-2 border-primary rounded flex-fill text-center fw-bold p-1 m-1 cursor_pointer"
          :class="sortingTabName === 'COMPLETED' && 'bg-secondary text-dark'"
          @click="changeTabName('COMPLETED')"
        >
          Completed
        </div>
        <div
          class="text-primary border border-2 border-primary rounded flex-fill text-center fw-bold p-1 m-1 cursor_pointer"
          :class="sortingTabName === 'ABORTED' && 'bg-secondary text-dark'"
          @click="changeTabName('ABORTED')"
        >
          Aborted
        </div>
      </div>

      <div v-if="isFetched && !filteredTests.length" class="px-3">
        <div class="d-sm-none">
          <h1 class="fw-bold font_size_32">No Test Available</h1>
          <p>
            Want to give a test?
            <br />
            Click on the button below!
          </p>
          <div class="text-center">
            <img
              src="@/assets/images/girl_illustration.png"
              alt="illustration"
              class="girl_illustration"
            />

            <br />

            <NuxtLink
              to="/protected/purchased-test"
              class="btn btn-secondary border border-2 border-primary rounded mt-4"
            >
              Attempt a test
            </NuxtLink>
          </div>
        </div>

        <!-- Desktop -->
        <div class="d-none d-sm-block">
          <div class="row mt-5">
            <div class="col-6">
              <h1 class="fw-bold font_size_32">No Test Available</h1>
              <p>
                Want to give a test?
                <br />
                Click on the button below!
              </p>

              <NuxtLink
                to="/protected/purchased-test"
                class="btn btn-secondary border border-2 border-primary rounded mt-4"
              >
                Attempt a test
              </NuxtLink>
            </div>
            <div class="col-6">
              <div class="text-center">
                <img
                  src="@/assets/images/girl_illustration.png"
                  alt="illustration"
                  class="girl_illustration"
                />

                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-sm-start text-end mb-2">
          <span>Sort by :</span>
          <select class="border border-primary rounded" v-model="sortBy">
            <option value="date">Date</option>
            <option value="duration">Duration</option>
          </select>
          <span class="border border-primary rounded px-1" @click="isAscending = !isAscending">
            <img
              v-if="isAscending"
              src="@/assets/images/arrow_up.svg"
              alt="up-arrow"
              class="mb-1"
            />
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

        <div class="row">
          <div
            v-for="test in filteredTests"
            :key="test.id"
            class="col-sm-6 col-md-4 mb-3"
            data-aos="flip-right"
          >
            <NuxtLink
              v-if="test.status === 'IN_PROGRESS'"
              :to="`/protected/test/${test.test.slug}`"
            >
              <TestCards
                :title="test.test.title"
                :dateTime="getDate(test.createdAt)"
                :description="`${test.test.time_limit} mins • ${
                  test.test.questions.items.length
                } questions • ${totalMarks(test.test.questions.items)} marks`"
              />
            </NuxtLink>
            <NuxtLink v-else :to="`/protected/test/result/${test.id}`">
              <TestCards
                :title="test.test.title"
                :dateTime="getDate(test.createdAt)"
                :description="`${test.test.time_limit} mins • ${
                  test.test.questions.items.length
                } questions • ${totalMarks(test.test.questions.items)} marks`"
              />
            </NuxtLink>
          </div>
        </div>
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
      title: 'Your Attempted Test',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Verify each mock test you have already taken. It is divided into three categories: ongoing, finished, and aborted. It can be sorted by both duration and date.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Your Attempted Test - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Verify each mock test you have already taken. It is divided into three categories: ongoing, finished, and aborted. It can be sorted by both duration and date.',
        },
        {
          name: 'keywords',
          content: 'Reattempt, Your attempted test',
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
          content: 'Your Attempted Test - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Verify each mock test you have already taken. It is divided into three categories: ongoing, finished, and aborted. It can be sorted by both duration and date.',
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
      filteredTests: [],
      sortBy: 'date',
      sortingTabName: '',
      isAscending: true,
      isFetched: false,
    };
  },

  computed: {
    ...mapState('auth', ['user']),
    ...mapState(['isLoading', 'allAttemptedTests']),
  },

  watch: {
    sortBy(newValue, _oldValue) {
      if (newValue === 'duration') {
        this.filteredTests = [...this.filteredTests].sort(function (a, b) {
          return a.test.time_limit - b.test.time_limit;
        });
      } else if (newValue === 'date') {
        this.filteredTests = [...this.filteredTests].sort(function (a, b) {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
      } else {
        this.filteredTests = this.allAttemptedTests;
      }
      this.isAscending = true;
    },

    sortingTabName(newValue, _oldValue) {
      // Start Reset filter
      this.isAscending = true;
      this.sortBy = 'date';
      // End Reset filter

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

    changeTabName(tabName) {
      if (this.sortingTabName === tabName) {
        this.filteredTests = this.allAttemptedTests;
        this.sortingTabName = '';
        return;
      }
      this.sortingTabName = tabName;
    },

    getDate(getdatetime) {
      var dateStr = new Date(getdatetime);
      return dateStr.toLocaleDateString();
    },

    // redirectPage(test) {
    //   this.$router.push(`/protected/test/${test.test.id}`);
    // },

    // redirectResultPage(attemptId) {
    //   this.$router.push(`/protected/test/result/${attemptId}`);
    // },
  },
};
</script>

<style scoped lang="scss">
@import '~bootstrap/scss/_functions.scss';
@import '~bootstrap/scss/_variables.scss';
@import '~bootstrap/scss/mixins/_breakpoints';

.girl_illustration {
  object-fit: contain;
  height: 200px;
  width: 200px;
}

@include media-breakpoint-up(sm) {
  .width_res {
    width: 25% !important;
    margin-left: auto;
  }
}
</style>
