<template>
  <div>
    <!-- START INSTRUCTION -->
    <Navbar v-if="!startTest" class="px-0" />
    <div v-if="!startTest" class="mt-3">
      <TestInstructions />
      <div class="text-center">
        <button
          type="button"
          class="btn btn-secondary border border-2 border-dark fw-bold w-50 mt-3 mb-3"
          @click="startTestFun"
        >
          Start
        </button>
      </div>
    </div>
    <!-- END INSTRUCTION -->

    <div v-else class="mt-4">
      <div class="row fixed-top bg-white px-4 pt-3">
        <div class="col-8">
          <img
            v-if="timerEnabled === false"
            src="@/assets/images/back_icon.svg"
            alt="back_icon"
            @click="goBack"
          />
          {{ timerString }}
        </div>
        <button
          class="col-4 btn text-primary border-2 border-primary px-1"
          @click="timerEnabled = !timerEnabled"
        >
          {{ timerEnabled ? 'PAUSE' : 'RESUME' }}
        </button>
        <hr class="bg-primary border border-3 w-100 mt-2" />
      </div>

      <div
        v-for="(questionItem, index) in allQuestions"
        :key="index"
        v-if="index === showCounter"
        class="container-fluid text-left mt-5 pt-5 margin_top_bottom"
      >
        <h1 class="fw-bolder">Question {{ questionCounter + 1 }}</h1>
        <p class="fw-bold my-4">{{ questionItem.question }}</p>
        <div class="d-flex flex-column mt-2">
          <ul class="list-group">
            <li
              v-for="(value, index2) in questionItem.options"
              :key="index2"
              class="list-group-item border border-2 border-dark rounded text-dark fw-bold mb-4 p-3"
              :class="
                selectAnswer.userInput === value[1] ? 'bg-secondary' : 'bg-white text-success'
              "
              @click="selectOption(questionItem.id, value[1])"
            >
              {{ index2 + 1 }}. {{ value[1] }}
            </li>
          </ul>
        </div>
      </div>

      <div class="container-fluid bg-white fixed-bottom p-2 footer_height">
        <div class="text-center">
          <button
            type="button"
            class="btn btn-outline-dark"
            :class="timerEnabled && selectAnswer.userInput ? 'btn-secondary' : 'btn-gray'"
            @click="submitTest"
            :disabled="timerEnabled === false"
          >
            Submit
          </button>
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
          this.$router.push('/dashboard');
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },

  computed: {
    ...mapState(['allPurchasedTests', 'allAttemptedTests']),

    remainingTime() {
      return (this.timerCount / 60).toFixed(2);
    },
  },

  async mounted() {
    this.SET_LOADER(true);
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      this.setTestRemainingTimeLocal();
      this.$router.push('/dashboard');
    });

    const testId = this.testId;
    const purchasedTest = this.allPurchasedTests.filter((item) => item.test.id === testId);
    if (!purchasedTest.length) {
      this.SET_LOADER(false);
      this.$router.push('/dashboard');
      return;
    }

    if (this.attemptedId) {
      const attemptedTest = this.allAttemptedTests.filter((item) => item.id === this.attemptedId);
      if (!attemptedTest.length) {
        this.SET_LOADER(false);
        this.$router.push('/dashboard');
        return;
      }
      const results = attemptedTest[0].result.items;

      // converted mintues to seoconds
      this.timerCount = Math.round(attemptedTest[0].remaining_time * 60);

      this.allQuestions = attemptedTest[0].test.questions.items
        .map((ques) => {
          // Check if already given answer to this question
          const isAlredyGivenAnswer = results.some((result) => {
            return result.question_id === ques.id;
          });

          if (!isAlredyGivenAnswer) {
            const parsedData = JSON.parse(ques.options);
            return {
              ...ques,
              options: Object.entries(parsedData),
            };
          }
        })
        .filter(Boolean); // Removed the undefined elements

      this.totalQuestions = this.allQuestions.length;
      this.questionCounter = attemptedTest[0].test.questions.items.length - this.totalQuestions;

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

    nextQuestion() {
      if (this.questionCounter < this.totalQuestions - 1) {
        this.questionCounter = this.questionCounter + 1;
        return;
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
        const obj = {
          attemptedId: this.attemptedId,
          questionId: this.selectAnswer.questionId,
          userInput: this.selectAnswer.userInput,
        };
        const res = await this.answerSubmit(obj);
        if (res) {
          this.selectAnswer.questionId = null;
          this.selectAnswer.userInput = null;
          this.questionCounter += 1;
          this.showCounter += 1;
          console.log('this.questionCounter', this.questionCounter);
          console.log('this.totalQuestions', this.totalQuestions);
          if (this.showCounter > this.totalQuestions - 1) {
            const completedRes = await this.compeletedTest(this.attemptedId);
            this.setTestRemainingTimeLocal();
            if (completedRes) {
              this.$router.push(`/result/${this.attemptedId}`);
            }
          }
        } else {
          alert('something went wrong');
        }
      } else {
        alert('please select option');
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
      this.$router.push('/dashboard');
    },
  },
};
</script>

<style scoped>
.header_timer {
  height: 30px;
}

.footer_height {
  height: 60px;
}

.margin_top_bottom {
  margin-top: 40px;
  margin-bottom: 50px;
}
</style>
