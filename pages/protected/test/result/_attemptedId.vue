<template>
  <div class="container">
    <div v-if="isLoaderHidden" class="mt-3">
      <div class="row">
        <div class="col-12 col-lg-6 mt-3">
          <AnimatedPlaceholder width="150px" height="16px" class="mt-3" />
          <br />
          <AnimatedPlaceholder width="200px" height="16px" class="mt-3" />
          <br />
          <AnimatedPlaceholder width="150px" height="16px" class="mt-3" />
          <br />
          <AnimatedPlaceholder width="300px" height="16px" class="mt-3" />
          <br />
        </div>
        <TestCardsSkeleton class="col-12 col-lg-6 mt-3" />
      </div>
      <TestCardsSkeleton class="mt-3" />
    </div>

    <div v-else-if="!isLoaderHidden && testDetail">
      <div class="row mb-4">
        <div class="col-lg-6 mt-4" data-aos="zoom-in">
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
            <!-- MOBILE RESUlt SECTION -->
            <template>
              <div class="container border border-2 border-primary rounded mt-4 p-3 d-lg-none">
                <span class="fw-bolder">
                  Result
                  <br />
                </span>
                <span class="text-muted font_family_roboto font_size_14">
                  Attempted on {{ attemptedTimeStamp }}
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
                        <img
                          v-if="percentage <= 35"
                          src="@/assets/images/sad_face.svg"
                          alt="sad_face"
                        />
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
                    <p class="font_size_14">
                      Attempted: {{ attemptedQuestions }}/{{ totalQuestions }}
                    </p>
                    <p class="font_size_14">
                      Correct: {{ correctAnswer }}/{{ attemptedQuestions }}
                    </p>
                    <p class="font_size_14">
                      Incorrect: {{ attemptedQuestions - correctAnswer }}/{{ attemptedQuestions }}
                    </p>
                  </div>
                </div>

                <!-- Button trigger modal -->
                <div class="text-center mt-3">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#reviewAnswers"
                  >
                    Review Answers
                  </button>
                </div>
              </div>
            </template>
          </TestDetail>

          <div class="text-center text-sm-start mt-2 start_btn_position">
            <NuxtLink
              :to="`/protected/test/${testDetail.slug}`"
              class="btn btn-primary text-white"
              @click=""
            >
              Start Again
            </NuxtLink>
          </div>
        </div>

        <!-- Desktop result section -->
        <div class="col-lg-6">
          <div class="container border border-2 border-primary rounded mt-4 p-3 d-none d-lg-block">
            <span class="fw-bolder">
              Result
              <br />
            </span>
            <span class="text-muted font_family_roboto font_size_14">
              Attempted on {{ attemptedTimeStamp }}
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
                    <img
                      v-if="percentage <= 35"
                      src="@/assets/images/sad_face.svg"
                      alt="sad_face"
                    />
                  </span>
                  <!-- End image -->

                  <apexchart type="donut" width="200" :options="chartOptions" :series="series">
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
            <div class="text-center mt-3" v-if="attemptedQuestions !== 0">
              <button
                type="button"
                class="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#reviewAnswers"
              >
                Review Answers
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div class="mt-3 pb-3">
        <h2 class="col fw-bolder font_size_20 feedback_title">Feedback</h2>

        <form v-if="!isEditFeedback" @submit.prevent="feedbackSubmit" class="feedback_width">
          <textarea
            v-model.trim="feedbackDesc"
            class="w-100 p-1 textarea_box font_size_14"
            rows="4"
            type="text"
            @input="check"
            required
          />

          <div class="row">
            <div class="col text-start">
              <p class="font_size_14" :class="remaining === 0 && 'text-danger'">
                {{ instruction }}
              </p>
            </div>
            <div class="col text-end">
              <button type="submit" class="btn btn-primary text-white" :disabled="remaining === 0">
                <span class="font_size_16"> submit </span>
              </button>
            </div>
          </div>
        </form>

        <div v-else>
          <div class="row">
            <div class="col-1">
              <div
                class="d-flex flex-column align-items-center justify-content-center bg-primary text-white ms-lg-3 circle"
              >
                <span class="text-uppercase">
                  {{ user.first_name[0] }}{{ user.last_name[0] }}
                </span>
              </div>
            </div>
            <div class="col mt-2 ms-2 ms-lg-0">
              <div class="row">
                <div class="col">
                  <div class="fw-bolder font_size_20 feedback_user_font">
                    {{ `${user.first_name}  ${user.last_name}` }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col text-muted font_size_14 feedback_timestamp">{{ feedbackTime }}</div>
                <div class="col text-end">
                  <img
                    src="@/assets/images/edit.svg"
                    alt="edit"
                    class="cursor_pointer"
                    @click="isEditFeedback = false"
                  />
                </div>
              </div>

              <div class="d-none d-lg-block mt-3 p-2 font_size_14 feedback_area">
                {{ feedbackDesc }}
              </div>
            </div>
            <div class="d-lg-none ms-2 mt-1 p-2 font_size_14 feedback_area">
              {{ feedbackDesc }}
            </div>
          </div>
        </div>
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
  </div>
</template>

<script>
var AWS = require('aws-sdk');
AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

import { Share } from '@capacitor/share';
import { mapState, mapActions, mapMutations } from 'vuex';

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

      purchasedTestId: null,
      testIdDetail: null,
      feedbackDesc: '',
      feedbackTime: null,
      isEditFeedback: false,
      isFeedbackExits: false,
      limit: 300,

      SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,

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
      chartOptionsDesktop: {
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

  head() {
    return {
      title: `${this.testDetail && this.testDetail.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.testDetail && this.testDetail.description}`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.testDetail && this.testDetail.title} - Mockcertified App`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `${this.testDetail && this.testDetail.description}`,
        },
        {
          name: 'keywords',
          content: 'Check your mock test result, Review Answers, Mockcertified App',
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
          content: `${this.testDetail && this.testDetail.title} - Mockcertified App`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `${this.testDetail && this.testDetail.description}`,
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

  async asyncData({ params }) {
    const attemptedId = params.attemptedId;
    return { attemptedId };
  },

  computed: {
    ...mapState(['isLoaderHidden', 'allAttemptedTests', 'allPurchasedTests']),
    ...mapState('auth', ['user']),

    instruction: function () {
      return this.feedbackDesc === ''
        ? 'Limit: ' + this.limit + ' characters'
        : 'Remaining ' + this.remaining + ' characters';
    },
    remaining: function () {
      return this.limit - this.feedbackDesc.length;
    },
  },

  async mounted() {
    this.setIsLoaderHidden(true);
    this.SET_LOADER(true);
    let attemptedTest = this.allAttemptedTests.filter((item) => item.id === this.attemptedId);
    if (!attemptedTest.length) {
      await this.getUserTests();
    }

    attemptedTest = this.allAttemptedTests.filter((item) => item.id === this.attemptedId);
    if (!attemptedTest.length) {
      this.SET_LOADER(false);
      this.setIsLoaderHidden(false);
      this.$router.push('/dashboard');
      return;
    }

    // Feedback Start
    this.testIdDetail = attemptedTest[0].test.id;
    const purchasedTestDetail = this.allPurchasedTests.find(
      (purchasedTest) => purchasedTest.test.id === this.testIdDetail,
    );
    this.purchasedTestId = purchasedTestDetail.id;
    if (!this.purchasedTestId) {
      this.SET_LOADER(false);
      this.setIsLoaderHidden(false);
      this.$router.push('/dashboard');
      return;
    }
    const feedbackDetail = await this.getFeedbackPurchasedTest(this.purchasedTestId);
    if (feedbackDetail) {
      this.isEditFeedback = true;
      this.isFeedbackExits = true;
      this.feedbackDesc = feedbackDetail.description;
      this.feedbackTime = this.getDate(feedbackDetail.updatedAt);
    }
    // Feedback End

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
      const ordered = Object.keys(parsedData)
        .sort()
        .reduce((obj, key) => {
          obj[key] = parsedData[key];
          return obj;
        }, {});
      const questionDetail = {
        ...res.question,
        options: Object.entries(ordered),
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
    this.setIsLoaderHidden(false);
  },

  methods: {
    ...mapActions('testManagement', ['getUserTests', 'getFeedbackPurchasedTest']),
    ...mapActions('buyer', ['giveFeedback', 'editFeedback']),
    ...mapMutations(['SET_LOADER', 'setIsLoaderHidden']),

    attempt() {
      this.$router.push('/protected/test-screen');
    },

    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },

    async feedbackSubmit() {
      if (!this.isFeedbackExits) {
        const obj = {
          purchasedTestId: this.purchasedTestId,
          testId: this.testIdDetail,
          description: this.feedbackDesc,
        };
        const res = await this.giveFeedback(obj);
        if (res) {
          await this.sendEmail();
          this.isEditFeedback = true;
          this.isFeedbackExits = true;
        }
      } else {
        const obj2 = {
          purchasedTestId: this.purchasedTestId,
          description: this.feedbackDesc,
        };
        const res2 = await this.editFeedback(obj2);
        if (res2) {
          await this.sendEmail();
          this.isEditFeedback = true;
          this.isFeedbackExits = true;
        }
      }
    },

    getDate(getdatetime) {
      var dateStr = new Date(getdatetime);
      return dateStr.toLocaleDateString();
    },

    check() {
      this.feedbackDesc = this.feedbackDesc.substr(0, this.limit);
    },

    sendEmail() {
      var params = {
        Destination: {
          ToAddresses: [this.ADMIN_EMAIL],
        },
        Message: {
          /* required */
          Body: {
            /* required */
            Html: {
              Charset: 'UTF-8',
              Data: `<div
                      style="
                        font-family: Helvetica, Arial, sans-serif;
                        min-width: 1000px;
                        overflow: auto;
                        line-height: 2;
                      "
                    >
                      <div style="margin: 50px auto; width: 70%; padding: 20px 20px">
                        <div style="border-bottom: 1px solid #eee">
                          <img
                            src="https://amplify-mobileappmarketplace-dev-123858-deployment.s3.amazonaws.com/logo_with_name.svg"
                          />
                        </div>
                        <p style="font-size: 1.1em">Hi,</p>
                        <p>The Feedback: ${this.feedbackDesc}</p>
                        <p>Test Name: ${this.testDetail.title}</p>
                        <p>Seller Name: ${this.testDetail.created_by.first_name} ${this.testDetail.created_by.last_name}; ID: ${this.testDetail.created_by.id}</p>
                        <p>Buyer Name: ${this.user.first_name} ${this.user.last_name}; ID: ${this.user.id}</p>
                        <p>Test Link: <a href="https://${process.env.DOMAIN}/protected/admin/test/${this.testDetail.slug}">Link</a></p>
                        <p style="font-size: 0.9em">Regards,<br />MockCertified Team</p>
                        <hr style="border: none; border-top: 1px solid #eee" />
                        <div
                          style="
                            float: right;
                            padding: 8px 0;
                            color: #aaa;
                            font-size: 0.8em;
                            line-height: 1;
                            font-weight: 300;
                          "
                        >
                          <img
                            src="https://amplify-mobileappmarketplace-dev-123858-deployment.s3.amazonaws.com/logo_with_name.svg"
                          />
                        </div>
                      </div>
                    </div>`,
            },
            Text: {
              Charset: 'UTF-8',
              Data: 'TEXT_FORMAT_BODY',
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: `You have received feedback from: ${this.user.first_name} ${this.user.last_name}`,
          },
        },
        Source: this.SUPPORT_EMAIL,
      };

      // Create the promise and SES service object
      var sendPromise = new AWS.SES().sendEmail(params).promise();

      // Handle promise's fulfilled/rejected states
      sendPromise
        .then(function (data) {})
        .catch(function (err) {
          console.error(err, err.stack);
        });
    },

    async shareTest() {
      const domainOrigin = window.location.origin;
      const testSlug = this.testDetail.slug;
      const title = this.testDetail.title;
      const url = `${domainOrigin}/category/test/${testSlug}`;
      try {
        await Share.share({
          title,
          text: `Hurray, I got ${this.percentage}% in ${title} test`,
          url,
          dialogTitle: 'Share with buddies',
        });
      } catch (_err) {}
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint';

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

.textarea_box {
  border: 1.5px solid #878787;
  border-radius: 4px;
}

.circle {
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin-top: 10px;
}

@include media-breakpoint-down(lg) {
  .donut_image {
    top: 35%;
  }

  .feedback_width {
    width: 100%;
  }

  .circle {
    height: 35px;
    width: 35px;
    font-size: 12px;
  }

  .feedback_title {
    font-size: 16px;
  }

  .feedback_user_font {
    font-size: 14px;
  }

  .feedback_timestamp {
    font-size: 10px;
  }
}

@include media-breakpoint-down(sm) {
  .circle {
    height: 30px;
    width: 30px;
    font-size: 12px;
  }
}

@include media-breakpoint-up(lg) {
  .donut_image {
    top: 34%;
    right: 42%;
  }

  .feedback_width {
    width: 50%;
  }

  .start_btn_position {
    position: absolute;
    bottom: 0;
  }
}

.feedback_area {
  background: #f5f5f5;
  border-radius: 4px;
  word-wrap: break-word;
}
</style>
