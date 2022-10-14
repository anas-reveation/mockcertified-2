<template>
  <div v-if="testDetail" class="container">
    <TestDetail
      :title="testDetail.title"
      :shortDescription="`${testDetail.time_limit} min • ${testDetail.questions.items.length} questions •
      ${totalMarks} marks`"
      :description="testDetail.description"
      :price="testDetail.price"
      :fullName="`${testDetail.created_by.first_name} ${testDetail.created_by.last_name}`"
      :shareFunc="shareTest"
      :credit="testDetail.credit"
    >
      <template>
        <div class="container border border-2 border-primary rounded mt-4 p-3">
          <span class="fw-bolder">
            Result
            <br />
          </span>
          <span class="text-muted font_family_roboto font_size_14">
            attempted on {{ attemptedTimeStamp }}
          </span>
          <div class="row mt-2">
            <div class="col px-0">
              <div class="position-relative apexchart_donut">
                <!-- Start image -->
                <span class="position-absolute donut_image">
                  <img
                    v-if="percentage >= 90"
                    src="@/assets/images/very_happy_face.svg"
                    alt="very_happy_face"
                  />
                  <img
                    v-if="percentage < 90 && percentage >= 75"
                    src="@/assets/images/happy_face.svg"
                    alt="happy_face"
                  />
                  <img
                    v-if="percentage < 75 && percentage > 35"
                    src="@/assets/images/neutral_face.svg"
                    alt="neutral_face"
                  />
                  <img v-if="percentage <= 35" src="@/assets/images/sad_face.svg" alt="sad_face" />
                </span>
                <!-- End image -->

                <apexchart type="donut" width="380" :options="chartOptions" :series="series">
                </apexchart>
              </div>
              <div class="d-flex justify-content-center align-items-center">
                <div>
                  <div class="d-flex">
                    <span class="mt-1 me-2 bg-primary color_box"></span>
                    <span>Correct</span>
                  </div>
                  <div class="d-flex">
                    <span class="mt-1 me-2 bg-secondary color_box"></span>
                    <span>Wrong</span>
                  </div>
                  <div class="d-flex">
                    <span class="mt-1 me-2 color_box" style="background: #492ac2"></span>
                    <span>Skipped</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-1 px-0">
              <div class="vr h-100 bg-primary border border-3"></div>
            </div>
            <div class="col px-0">
              <p class="font_size_14">
                <span v-if="percentage >= 90" class="text-success">GREAT JOB!</span>
                <span v-else-if="percentage < 90 && percentage >= 75" class="text-success">
                  GOOD JOB!
                </span>
                <span v-else class="text-danger">TRY AGAIN!</span>
              </p>
              <p class="font_size_14">Percentage: {{ percentage }}%</p>
              <p class="font_size_14">Test Score: {{ totalScore }}/{{ totalMarks }}</p>
              <p class="font_size_14">Attempted: {{ attemptedQuestions }}/{{ totalQuestions }}</p>
              <p class="font_size_14">Correct: {{ correctAnswer }}/{{ attemptedQuestions }}</p>
              <p class="font_size_14">
                Incorrect: {{ attemptedQuestions - correctAnswer }}/{{ attemptedQuestions }}
              </p>
            </div>
          </div>

          <!-- Button trigger modal -->
          <div class="text-center mt-3">
            <button
              type="button"
              class="btn btn-secondary border border-2 border-primary"
              data-bs-toggle="modal"
              data-bs-target="#reviewAnswers"
            >
              Review Answers
            </button>
          </div>
        </div>
      </template>
    </TestDetail>

    <div class="text-center text-sm-start pb-3">
      <NuxtLink
        :to="`/protected/test/${testDetail.id}`"
        class="btn btn-secondary border border-2 border-primary"
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
              <img src="@/assets/images/circle-cross.svg" alt="circle-cross" />
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
      attemptedTimeStamp: null,
      // chart
      series: [0, 0, 0],
      chartOptions: {
        chart: {
          width: 200,
          type: 'donut',
        },
        colors: ['#6782E1', '#BECBFA', '#492AC2'],
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270,
          },
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: 'gradient',
        },
        legend: {
          show: false,
          // formatter: function (val, opts) {
          //   return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
          // },
        },
        // title: {
        //   text: 'Gradient Donut with custom Start-angle',
        // },
        responsive: [
          {
            breakpoint: 1005,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
          {
            breakpoint: 450,
            options: {
              chart: {
                width: 150,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
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
    this.attemptedTimeStamp = new Date(attemptedTest[0].createdAt).toDateString();

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
    this.series[0] = this.correctAnswer;
    this.series[1] = this.attemptedQuestions - this.correctAnswer;
    this.series[2] = this.totalQuestions - this.attemptedQuestions;
    this.SET_LOADER(false);
  },

  methods: {
    ...mapMutations(['SET_LOADER']),

    attempt() {
      this.$router.push('/protected/test-screen');
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
.color_box {
  width: 16px;
  height: 16px;
  border-radius: 2px;
}

.apexchart_donut > div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.donut_image {
  top: 30%;
  right: 38%;
}

/* .number_circle {
  width: 86px;
  height: 86px;
} */
</style>
