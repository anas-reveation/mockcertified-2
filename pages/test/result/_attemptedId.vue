<template>
  <div class="container" v-if="testDetail">
    <div class="container-fluid">
      <div class="row">
        <div class="col-2">
          <img
            src="@/assets/images/previous.png"
            class="pb-4"
            width="30"
            @click="$router.back()"
            alt=""
          />
        </div>
        <div class="col-9 fw-bold text-capitalize">
          <h1 class="text-left">{{ testDetail.title }}</h1>
        </div>
      </div>
      <div class="result-banner shadow d-flex flex-column align-items-center">
        <div
          class="score opacity-75 border border-success border-5 rounded-circle d-flex justify-content-center align-items-center"
        >
          <span class="fs-4 fw-bolder">{{ percentage }}%</span>
        </div>
        <div
          class="ps-3 pe-3 w-100 d-flex justify-content-between align-items-center gap-3 flex-grow-1"
        >
          <div class="d-flex flex-column justify-content-between mb-3 mt-3">
            <span class="fs-5 fw-bolder text-secondary mb-3">
              {{ `${totalScore}/${totalMarks}` }} Score
            </span>
            <span class="fs-6 fw-bolder text-dark">{{ attemptedQuestions }} Attempted</span>
          </div>
          <div class="d-flex flex-column justify-content-between mb-3 mt-3">
            <span class="fs-5 fw-bolder text-secondary mb-3">{{ correctAnswer }} Correct</span>
            <span class="fs-6 fw-bolder text-dark"
              >{{ attemptedQuestions - correctAnswer }} Incorrect</span
            >
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between mt-3">
        <div class="fs-5 fw-bolder text-secondary text-capitalize">
          {{ `${testDetail.created_by.first_name} ${testDetail.created_by.last_name}` }}
        </div>
        <div>
          <img
            class="share_icon"
            src="@/assets/images/share.svg"
            alt="share"
            @click="shareResult"
          />
        </div>
      </div>

      <div class="mt-3">
        <span class="fs-4 fw-bold">Description</span>
        <p class="py-2 text-dark rounded">
          {{ testDetail.description }}
        </p>
      </div>
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
<style>
.result-banner {
  width: 100%;
  min-width: 280px;
  min-height: 280px;
  border-radius: 10px;
}

.score {
  width: 100px;
  height: 100px;
}

.share_icon {
  width: 40px;
  height: 30px;
}
</style>
