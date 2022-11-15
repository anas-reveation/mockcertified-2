<template>
  <div class="remove_padding_x">
    <Navbar v-if="!startTest" />
    <div>
      <!-- START INSTRUCTION -->
      <div v-if="!startTest" class="px-2 mt-2">
        <TestInstructions v-if="testInstruction" :bodyContent="testInstruction" />
        <div v-if="testInstruction" class="text-center">
          <button
            type="button"
            class="btn btn-secondary border border-2 border-primary fw-bold w-50 mt-3 mb-3 width_res"
            @click="startTestFun"
          >
            Start
          </button>
        </div>
      </div>
      <!-- END INSTRUCTION -->

      <div v-else class="mt-4 container">
        <div class="fixed-top bg-white pt-3">
          <div class="row px-4">
            <div class="col-8 text-primary">
              <img
                class="cursor_pointer"
                v-if="timerEnabled === false"
                src="@/assets/images/back_icon.svg"
                alt="back_icon"
                @click="goBack"
              />
              {{ timerString }}
            </div>
            <button
              class="col-4 btn border-2 border-primary p-0 width_res"
              :class="!timerEnabled ? 'bg-primary text-white' : 'text-primary'"
              @click="timerEnabled = !timerEnabled"
            >
              {{ timerEnabled ? 'PAUSE' : 'RESUME' }}
            </button>
          </div>
          <div class="bg-primary w-100 mt-2 hr_line" />
        </div>

        <div
          v-for="(questionItem, index) in allQuestions"
          :key="index"
          v-if="index === showCounter"
          class="container-fluid text-left mt-5 pt-3 px-4 margin_top_bottom"
        >
          <h1 class="fw-bolder font_size_16">Question {{ questionCounter + 1 }}</h1>
          <p class="fw-bold my-2 font_size_16">{{ questionItem.question }}</p>
          <div class="d-flex flex-column mt-2">
            <ul class="list-group">
              <li
                v-for="(value, index2) in questionItem.options"
                :key="index2"
                class="list-group-item border border-2 border-primary rounded text-dark fw-bold mb-2 p-2 font_size_16 cursor_pointer"
                :class="
                  selectAnswer.userInput === value[1] ? 'bg-secondary' : 'bg-white text-success'
                "
                @click="selectOption(questionItem.id, value[1])"
              >
                {{ String.fromCharCode(65 + index2) }}. {{ value[1] }}
              </li>
            </ul>
          </div>
        </div>

        <div class="container bg-white fixed_bottom p-2 mb-1 px-sm-4 footer_height">
          <div
            class="d-flex"
            :class="questionCounter !== 0 ? 'justify-content-between' : 'justify-content-end'"
          >
            <button
              v-if="questionCounter !== 0"
              type="button"
              class="btn border-primary"
              @click="previousQuestion"
              :disabled="timerEnabled === false"
            >
              Previous
            </button>
            <button
              type="button"
              class="btn border-primary"
              :class="timerEnabled && selectAnswer.userInput ? 'btn-secondary' : 'btn-gray'"
              @click="submitTest"
              :disabled="timerEnabled === false"
            >
              {{ nextQuestionText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { App as CapacitorApp } from '@capacitor/app';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  layout: 'introLayout',

  data() {
    return {
      startTest: false,
      showCounter: 0,
      questionCounter: 0,
      allQuestions: [],
      allQuestionsSubmission: [],
      givenAnswerList: [],
      purchasedId: null,
      timerCount: 0,
      timerEnabled: false,
      timerString: '00:00:00',
      firstAttemptedId: null,
      selectAnswer: {
        questionId: null,
        userInput: null,
      },
      totalQuestions: null,
      nextQuestionText: 'Next',
      testInstruction: null,
    };
  },

  async asyncData({ params, query }) {
    const testId = params.testId;
    const attemptedId = query.attempted_id ? query.attempted_id : null;
    return { testId, attemptedId };
  },

  fetch() {
    this.SET_LOADER(true);
  },

  watch: {
    startTest(_value) {
      window.scrollTo(0, 0);
      this.timerEnabled = true;
    },

    timerEnabled(value) {
      if (value) {
        setTimeout(() => {
          this.timerCount--;
          this.covertTimer(this.timerCount);
        }, 1000);
      }
    },

    timerCount: {
      async handler(value, previousValue) {
        if (value > 0 && this.timerEnabled) {
          setTimeout(() => {
            this.timerCount--;
            this.covertTimer(this.timerCount);
          }, 1000);
        } else if (value <= 0 && previousValue === 1) {
          await this.compeletedTest(this.attemptedId);
          await this.setTestRemainingTimeLocal();
          this.$swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Times Up',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
          this.$router.push(`/protected/test/result/${this.attemptedId}`);
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },

    showCounter(value, _oldValue) {
      if (value > this.totalQuestions - 2) {
        this.nextQuestionText = 'Submit';
      } else {
        this.nextQuestionText = 'Next';
      }
    },
  },

  computed: {
    ...mapState(['allPurchasedTests', 'allAttemptedTests']),

    remainingTime() {
      return (this.timerCount / 60).toFixed(2);
    },
  },

  beforeDestroy() {
    // Only if test is started
    if (this.startTest) {
      this.setTestRemainingTimeLocal();
      // this.$router.push('/protected/purchased-test');
    }
  },

  async mounted() {
    this.SET_LOADER(true);
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      // Only if test is started
      if (this.startTest) {
        this.setTestRemainingTimeLocal();
        this.$router.push('/protected/purchased-test');
      }
    });

    this.testInstruction = await this.getTestInstruction();

    const testId = this.testId;
    const purchasedTest = this.allPurchasedTests.filter((item) => item.test.id === testId);
    if (!purchasedTest.length) {
      this.SET_LOADER(false);
      this.$router.push('/protected/purchased-test');
      return;
    }

    if (this.attemptedId) {
      const attemptedTest = this.allAttemptedTests.filter((item) => item.id === this.attemptedId);
      if (!attemptedTest.length) {
        this.SET_LOADER(false);
        this.$router.push('/protected/purchased-test');
        return;
      }
      const results = [...attemptedTest[0].result.items];
      this.givenAnswerList = results;

      // If remaining_time === null, set to test time_limit
      const isRemainingTime = attemptedTest[0].remaining_time;
      this.timerCount = isRemainingTime
        ? Math.round(attemptedTest[0].remaining_time * 60)
        : attemptedTest[0].test.time_limit * 60;

      // remaining questions
      let givenAnswerCounter = 0;
      this.allQuestions = attemptedTest[0].test.questions.items
        .map((ques) => {
          // Check if already given answer to this question
          let userInput = null;
          const isAlredyGivenAnswer = results.some((result) => {
            userInput = result.user_input;
            return result.question_id === ques.id;
          });

          if (isAlredyGivenAnswer) {
            givenAnswerCounter += 1;
          }
          // if (!isAlredyGivenAnswer) {
          const parsedData = JSON.parse(ques.options);
          return {
            ...ques,
            options: Object.entries(parsedData),
            userInput,
          };
          // }
        })
        .filter(Boolean); // Removed the undefined elements
      this.totalQuestions = this.allQuestions.length;
      this.questionCounter = attemptedTest[0].test.questions.items.length - this.totalQuestions;
      this.showCounter = this.questionCounter = givenAnswerCounter;
      this.SET_LOADER(false);
      return;
    }

    const oneTest = purchasedTest[0];
    this.purchasedId = oneTest.id;

    // converted mintues to seoconds
    this.timerCount = oneTest.test.time_limit * 60;
    const allQuestions = oneTest.test.questions.items;

    // Parse the options of question & making array of objects on fly (for user's input)
    this.allQuestions = allQuestions.map((ques) => {
      const parsedData = JSON.parse(ques.options);
      this.SET_LOADER(false);
      return {
        ...ques,
        options: Object.entries(parsedData),
      };
    });
    this.totalQuestions = this.allQuestions.length;
  },

  methods: {
    ...mapMutations(['SET_LOADER']),
    ...mapActions('testManagement', [
      'startAttemptingTest',
      'answerSubmit',
      'compeletedTest',
      'setTestRemainingTime',
      'getTestInstruction',
    ]),

    async startTestFun() {
      if (!this.attemptedId) {
        // First time attempting
        const res = await this.startAttemptingTest(this.testId);
        if (res) {
          this.attemptedId = res.id;
        } else {
          return;
        }
      }
      this.startTest = !this.startTest;
    },

    nextQuestionFun() {
      // if (this.questionCounter < this.totalQuestions - 1) {
      //   this.questionCounter = this.questionCounter + 1;
      //   return;
      // }
      const quesDetail = this.allQuestions[this.questionCounter];
      this.selectOption(quesDetail.id, quesDetail.userInput);
    },

    previousQuestion() {
      if (this.questionCounter !== 0) {
        this.questionCounter -= 1;
        this.showCounter -= 1;
        const quesDetail = this.allQuestions[this.questionCounter];
        this.selectOption(quesDetail.id, quesDetail.userInput);
      }
    },

    selectOption(questionId, userInput) {
      this.selectAnswer.questionId = questionId;
      this.selectAnswer.userInput = userInput;
    },

    covertTimer(seconds) {
      this.timerString = new Date(seconds * 1000).toISOString().slice(11, 19);
    },

    async submitTest() {
      window.scrollTo(0, 0);

      if (this.selectAnswer.questionId && this.selectAnswer.userInput) {
        let obj = {
          attemptedId: this.attemptedId,
          questionId: this.selectAnswer.questionId,
          userInput: this.selectAnswer.userInput,
        };
        const alreadyAnswered = this.givenAnswerList.find((result) => {
          return result.question_id === this.selectAnswer.questionId;
        });
        if (alreadyAnswered) {
          obj = {
            ...obj,
            result_id: alreadyAnswered.id,
          };
        }
        const res = await this.answerSubmit(obj);
        if (res) {
          // If response is an object then only we are adding
          if (res !== true) {
            // adding given answer(response) in 'givenAnswerList' (only when user attempt that question first time)
            this.givenAnswerList.push(res);
          }

          // Adding userInput in user's attempted allQquestion list
          const indexOfQuestion = this.allQuestions.findIndex(
            (ques) => ques.id === this.selectAnswer.questionId,
          );
          this.allQuestions[indexOfQuestion].userInput = this.selectAnswer.userInput;

          this.selectAnswer.questionId = null;
          this.selectAnswer.userInput = null;
          this.questionCounter += 1;
          this.showCounter += 1;

          if (this.showCounter > this.totalQuestions - 1) {
            const completedRes = await this.compeletedTest(this.attemptedId);
            this.setTestRemainingTimeLocal();
            if (completedRes) {
              this.$router.push(`/protected/test/result/${this.attemptedId}`);
              this.$swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Successfully completed test',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 3000,
              });
            }
          } else {
            this.nextQuestionFun();
          }
        } else {
          this.$swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Something went wrong',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
        }
      } else {
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: 'please select option',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
      }
    },

    async setTestRemainingTimeLocal() {
      await this.setTestRemainingTime({
        attemptedId: this.attemptedId,
        remainingTime: this.remainingTime,
      });
    },

    async goBack() {
      await this.setTestRemainingTimeLocal();
      this.$router.push('/protected/purchased-test');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~bootstrap/scss/_functions.scss';
@import '~bootstrap/scss/_variables.scss';
@import '~bootstrap/scss/mixins/_breakpoints';

.header_timer {
  height: 30px;
}

.footer_height {
  height: 60px;
}

.margin_top_bottom {
  margin-top: 40px;
  margin-bottom: 60px;
}

.hr_line {
  height: 2px;
}

.remove_padding_x {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.cursor_pointer {
  cursor: pointer;
}

.fixed_bottom {
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1030;
  }
}

@include media-breakpoint-up(sm) {
  .width_res {
    width: 250px !important;
    margin-left: auto;
  }
}
</style>
