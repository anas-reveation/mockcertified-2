<template>
  <div v-if="testDetail" class="container">
    <div class="row justify-content-between">
      <h1 class="col text-capitalize">{{ testDetail.title }}</h1>
      <div class="col text-end">
        <img
          src="@/assets/images/share_icon.svg"
          alt="share"
          height="30"
          width="30"
          @click="shareTest"
        />
      </div>
    </div>
    <p class="my-2 font_family_roboto">
      {{ testDetail.time_limit }} min • {{ testDetail.questions.items.length }} questions •
      {{ totalMarks }} marks •
    </p>

    <div class="row justify-content-between mt-3">
      <div class="col-9 fs-5 text-capitalize fw-bold">
        <img
          src="@/assets/images/profile_icon.svg"
          alt="share"
          class="me-2"
          height="30"
          width="30"
        />
        {{ testDetail.created_by.first_name }} {{ testDetail.created_by.last_name }}
      </div>
      <span class="col-3 text-primary fw-bold text-end">${{ formatPrice(testDetail.price) }}</span>
    </div>

    <div class="mt-3">
      <h3>Description</h3>
      <p>{{ testDetail.description }}</p>

      <div class="text-center">
        <div v-if="testStatus">
          <NuxtLink
            :to="`/test/start-test/${testDetail.id}?attempted_id=${attemptedId}`"
            class="btn btn-secondary border border-2 border-dark fw-bold w-50"
          >
            {{ testStatus }}
          </NuxtLink>
          <button
            class="btn btn-secondary border border-2 border-dark fw-bold w-50 mt-3"
            @click="startTestAgain"
          >
            Start over
          </button>
        </div>

        <NuxtLink
          v-else
          :to="`/test/start-test/${testDetail.id}`"
          class="btn btn-secondary border border-2 border-dark fw-bold w-50"
        >
          Start
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { Share } from '@capacitor/share';
import { mapState, mapActions } from 'vuex';

export default {
  middleware: ['authenticated'],

  data() {
    return {
      testDetail: null,
      testStatus: null,
      attemptedId: null,
      totalMarks: 0,
    };
  },

  async asyncData({ params }) {
    const testId = params.testId;
    return { testId };
  },

  computed: {
    ...mapState(['allPurchasedTests', 'allAttemptedTests']),
  },

  async mounted() {
    const testId = this.testId;
    const attemptedTest = this.allAttemptedTests.filter((item) => {
      if (item.test.id === testId) {
        if (item.status === 'IN_PROGRESS') {
          this.testStatus = 'Continue';
          return item;
        }
      }
    });
    const purchasedTest = this.allPurchasedTests.filter((item) => item.test.id === testId);
    if (attemptedTest.length) {
      this.attemptedId = attemptedTest[0].id;
      this.testDetail = attemptedTest[0].test;
      this.totalMarksCal(attemptedTest[0].test);
      return;
    } else if (purchasedTest.length) {
      this.testDetail = purchasedTest[0].test;
      this.totalMarksCal(purchasedTest[0].test);
      return;
    } else {
      this.$router.back();
    }
  },

  methods: {
    ...mapActions('testManagement', ['abortedAttemptedTest']),

    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },

    totalMarksCal(test) {
      if (test) {
        let totalMarks = 0;
        test.questions.items.map((ques) => {
          totalMarks += ques.marks;
        });
        this.totalMarks = totalMarks;
      }
    },

    async startTestAgain() {
      const res = await this.abortedAttemptedTest(this.attemptedId);
      if (res) {
        this.$router.push(`/test/start-test/${this.testId}`);
      } else {
        alert('something went wrong');
      }
    },

    async shareTest() {
      const domainOrigin = window.location.origin;
      const testId = this.testDetail.id;
      const title = this.testDetail.title;
      const url = `${domainOrigin}/category/test/${testId}`;
      await Share.share({
        title,
        text: `${title} is Really awesome test`,
        url,
        dialogTitle: 'Share with buddies',
      });
    },
  },
};
</script>
