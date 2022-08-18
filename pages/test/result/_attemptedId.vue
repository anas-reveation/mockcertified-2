<template>
  <div v-if="testDetail" class="container">
    <div class="row justify-content-between">
      <h1 class="col fw-bolder text-capitalize">{{ testDetail.title }}</h1>
      <div class="col text-end">
        <img src="@/assets/images/share_icon.svg" alt="share" height="30" width="30" />
      </div>
    </div>
    <p class="my-2">
      {{ testDetail.time_limit }} min • {{ totalQuestions }} questions • {{ totalMarks }} marks •
    </p>

    <div class="container border border-2 border-primary rounded mt-4 p-4">
      <p class="fs-4 fw-bolder">Result</p>
      <div class="row">
        <div class="col-8">
          <div class="row">
            <div class="col">
              <p>Test Score: {{ totalScore }}/{{ totalMarks }}</p>
              <p>Attempted: {{ attemptedQuestions }}/{{ totalQuestions }}</p>
              <p>Correct: {{ correctAnswer }}/{{ attemptedQuestions }}</p>
              <p>Incorrect: {{ attemptedQuestions - correctAnswer }}/{{ attemptedQuestions }}</p>
            </div>
            <div class="col-2">
              <div class="vr h-100 bg-primary border border-3"></div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div
            class="d-flex justify-content-center align-items-center border border-5 border-primary text-center rounded-circle number_circle"
          >
            <span>{{ percentage }}%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-between mt-3">
      <div class="col-9 fs-5 text-capitalize fw-bolder">
        <img
          src="@/assets/images/profile_icon.svg"
          class="me-2"
          alt="share"
          @click="shareResult"
          height="30"
          width="30"
        />
        {{ `${testDetail.created_by.first_name} ${testDetail.created_by.last_name}` }}
      </div>
      <span class="col-3 text-primary fw-bolder text-end">
        ${{ formatPrice(testDetail.price) }}
      </span>
    </div>

    <div class="mt-3 pb-3">
      <h4 class="fw-bolder">Description</h4>
      <p>{{ testDetail.description }}</p>
    </div>
  </div>
</template>

<script>
import { Share } from '@capacitor/share';
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      attemptedQuestions: null,
      correctAnswer: null,
      totalQuestions: 0,
      totalMarks: 0,
      totalScore: 0,
      percentage: 0,
      testDetail: null,
    };
  },

  async asyncData({ params }) {
    const attemptedId = params.attemptedId;
    return { attemptedId };
  },

  computed: {
    ...mapState(['allAttemptedTests']),
  },

  mounted() {
    this.SET_LOADER(true);
    const attemptedTest = this.allAttemptedTests.filter((item) => item.id === this.attemptedId);
    if (!attemptedTest.length) {
      this.SET_LOADER(false);
      this.$router.push('/dashboard');
      return;
    }
    this.testDetail = attemptedTest[0].test;
    this.totalQuestions = this.testDetail.questions.items.length;
    this.attemptedQuestions = attemptedTest[0].result.items.length;

    let totalMarks = 0;
    attemptedTest[0].test.questions.items.forEach((question) => {
      totalMarks += question.marks;
    });
    this.totalMarks = totalMarks;

    let totalScore = 0;
    const correctAnswer = attemptedTest[0].result.items.filter((res) => {
      if (res.result_status === true) {
        totalScore += res.question.marks;
        return res;
      }
    });
    this.totalScore = totalScore;
    this.correctAnswer = correctAnswer.length;
    this.percentage = ((this.totalScore / this.totalMarks) * 100).toFixed(2);
    this.SET_LOADER(false);
  },

  methods: {
    ...mapMutations(['SET_LOADER']),

    attempt() {
      this.$router.push('/test-screen');
    },

    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },

    async shareResult() {
      const domainOrigin = window.location.origin;
      const testId = this.testDetail.id;
      const title = this.testDetail.title;
      const url = `${domainOrigin}/category/test/${testId}`;
      await Share.share({
        title,
        text: `Hurray, I got ${this.percentage}% in ${title} test`,
        url,
        dialogTitle: 'Share with buddies',
      });
    },
  },
};
</script>

<style scoped>
.number_circle {
  width: 86px;
  height: 86px;
}
</style>
