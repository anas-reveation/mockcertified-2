<template>
  <div v-if="testDetail" class="container">
    <TestDetail
      :title="testDetail.title"
      :shortDescription="`${testDetail.time_limit} min• ${testDetail.questions.items.length} questions•
      ${totalMarks} marks`"
      :description="testDetail.description"
      :price="testDetail.price"
      :fullName="`${testDetail.created_by.first_name} ${testDetail.created_by.last_name}`"
      :shareFunc="shareTest"
    >
      <template>
        <div class="container border border-2 border-primary rounded mt-4 p-4">
          <p class="fs-4 fw-bolder">Result</p>
          <div class="row">
            <div class="col-8">
              <div class="row">
                <div class="col">
                  <p>Test Score: {{ totalScore }}/{{ totalMarks }}</p>
                  <p>Attempted: {{ attemptedQuestions }}/{{ totalQuestions }}</p>
                  <p>Correct: {{ correctAnswer }}/{{ attemptedQuestions }}</p>
                  <p>
                    Incorrect: {{ attemptedQuestions - correctAnswer }}/{{ attemptedQuestions }}
                  </p>
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

          <!-- Button trigger modal -->
          <div class="text-center mt-3">
            <button
              type="button"
              class="btn btn-secondary border border-2 border-dark"
              data-bs-toggle="modal"
              data-bs-target="#reviewAnswers"
            >
              Review Answers
            </button>
          </div>
        </div>
      </template>
    </TestDetail>

    <div class="text-center pb-3">
      <NuxtLink
        :to="`/test/${testDetail.id}`"
        class="btn btn-secondary border border-2 border-dark"
        @click=""
      >
        Start Again
      </NuxtLink>
    </div>

    <!-- Start Modal -->
    <div
      class="modal fade"
      id="reviewAnswers"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="reviewAnswersLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bolder" id="reviewAnswersLabel">Questions</h5>
            <span data-bs-dismiss="modal" aria-label="Close">
              <img src="@/assets/images/circle-cross.svg" alt="" />
            </span>
          </div>
          <div class="modal-body">
            <div v-for="(question, index) in allQuestions" :key="index">
              <TestQuestion
                :question="question"
                :index="index + 1"
                :questionVisible="false"
                class="mb-2"
              />
            </div>
          </div>
          <!-- <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary border-2 border-dark"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div> -->
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>
</template>

<script>
import { Share } from '@capacitor/share';
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      attemptedQuestions: null,
      allQuestions: [],
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

    const correctAnswer = attemptedTest[0].result.items.filter((res, index) => {
      // Array of question that is attempted
      const options = res.question.options;
      const parsedData = JSON.parse(options);
      const questionDetail = {
        ...res.question,
        options: Object.entries(parsedData),
        resultStatus: res.result_status,
        userInput: res.user_input,
      };
      this.allQuestions.push(questionDetail);

      // Checking answer
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

    async shareTest() {
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
