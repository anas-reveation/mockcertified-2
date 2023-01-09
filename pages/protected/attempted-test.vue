<template>
  <div class="container">
    <div>
      <div class="mb-2 d-flex justify-content-center justify-content-sm-end">
        <div
          class="p-1 m-1 cursor_pointer sorting_text_size"
          :class="sortingTabName === 'IN_PROGRESS' ? 'text-primary' : 'text-dark'"
          @click="changeTabName('IN_PROGRESS')"
        >
          Ongoing
          <div v-if="sortingTabName === 'IN_PROGRESS'" class="bg-primary mt-0 blue_underline" />
        </div>
        <div
          class="p-1 m-1 cursor_pointer sorting_text_size"
          :class="sortingTabName === 'COMPLETED' ? 'text-primary' : 'text-dark'"
          @click="changeTabName('COMPLETED')"
        >
          Completed
          <div v-if="sortingTabName === 'COMPLETED'" class="bg-primary mt-0 blue_underline" />
        </div>
        <div
          class="p-1 m-1 cursor_pointer sorting_text_size"
          :class="sortingTabName === 'ABORTED' ? 'text-primary' : 'text-dark'"
          @click="changeTabName('ABORTED')"
        >
          Aborted
          <div v-if="sortingTabName === 'ABORTED'" class="bg-primary mt-0 blue_underline" />
        </div>
      </div>

      <div v-if="isFetched && !filteredTests.length" class="px-3">
        <div class="text-center mt-2">
          <img
            src="@/assets/images/girl_illustration.png"
            alt="illustration"
            class="girl_illustration"
          />
          <h1 class="fw-bolder mt-2 font_size_32 attempted_test_font_size_h1">No Test Available</h1>
          <p class="text-muted attempted_test_font_size">Give a test from your purchased test</p>
          <NuxtLink to="/protected/purchased-test" class="btn btn-primary text-white rounded">
            <span class="font_size_16"> Attempt A Test </span>
          </NuxtLink>
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

        <div v-if="isLoaderHidden" class="row">
          <div v-for="i in 3" :key="i" class="col-sm-6 col-md-4 mb-3" data-aos="flip-right">
            <TestCardsSkeleton />
          </div>
        </div>

        <div v-if="filteredTests.length && !isLoading" class="row">
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
import { mapState, mapActions, mapMutations } from 'vuex';
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
    ...mapState(['isLoading', 'isLoaderHidden', 'allAttemptedTests']),
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
    this.setIsLoaderHidden(true);
    await this.getUserTests();
    this.filteredTests = this.allAttemptedTests;
    this.isFetched = true;
    this.changeTabName('IN_PROGRESS');
    this.setIsLoaderHidden(false);
  },

  methods: {
    ...mapMutations(['setIsLoaderHidden']),
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
@import '~/assets/css/bootstrapBreakpoint';

.girl_illustration {
  object-fit: contain;
  height: 230px;
  width: 230px;
}

.blue_underline {
  height: 2px;
  background: #6782e1;
}

@include media-breakpoint-down(lg) {
  .girl_illustration {
    width: 200px;
  }
}

@include media-breakpoint-down(sm) {
  .attempted_test_font_size {
    font-size: 14px;
  }

  .attempted_test_font_size_h1 {
    font-size: 24px;
  }
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
