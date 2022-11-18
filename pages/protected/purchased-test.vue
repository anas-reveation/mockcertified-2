<template>
  <div class="container">
    <div v-if="isFetched && !filteredTests.length">
      <div class="d-sm-none">
        <h1 class="fw-bold font_size_32">No Test Available</h1>
        <p v-if="platform === 'web'">
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
            v-if="platform === 'web'"
            to="/category"
            class="btn btn-secondary border border-2 border-primary rounded mt-4 w-50"
          >
            Buy a test
          </NuxtLink>
        </div>
      </div>
      <!-- Desktop -->
      <div class="d-none d-sm-block">
        <div class="row mt-5">
          <div class="col-6">
            <h1 class="fw-bold font_size_32">No Test Available</h1>
            <p v-if="platform === 'web'">
              Want to buy new tests?
              <br />
              Click on the button below!
            </p>
            <NuxtLink
              v-if="platform === 'web'"
              to="/category"
              class="btn btn-secondary border border-2 border-primary rounded mt-4 w-50"
            >
              Buy a test
            </NuxtLink>
          </div>
          <div class="col-6">
            <div class="text-center">
              <img
                src="@/assets/images/boy_illustration.png"
                alt="boy_illustration"
                class="boy_illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="text-sm-start text-end mb-3">
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

      <div class="row">
        <div v-for="test in filteredTests" :key="test.id" class="col-sm-6 col-md-4 mb-3">
          <NuxtLink v-if="test.test" :to="`/protected/test/${test.test.slug}`">
            <TestCards
              :title="test.test.title"
              :description="`${test.test.time_limit} mins • ${
                test.test.questions.items.length
              } questions • ${totalMarks(test.test.questions.items)} marks`"
            />
          </NuxtLink>
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
      title: 'Your Purchased Mock Test',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'View all your purchased mock test. And start it at anytime.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Your Purchased Mock Test - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'View all your purchased mock test. And start it at anytime.',
        },
        {
          name: 'keywords',
          content: 'Purchased Mock Test, Mockcertified App',
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
          content: 'Your Purchased Mock Test - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'View all your purchased mock test. And start it at anytime.',
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
      isAscending: true,
      isFetched: false,
    };
  },

  computed: {
    ...mapState('auth', ['user']),
    ...mapState(['isLoading', 'platform', 'allPurchasedTests']),
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

    // redirectPage(test) {
    //   this.$router.push(`/protected/test/${test.test.id}`);
    // },
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
