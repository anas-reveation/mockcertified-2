<template>
  <div>
    <!-- START INSTRUCTION -->
    <div v-if="!startTest" class="container mt-3">
      <TestInstructions />
      <button type="button" class="btn w-100 mt-3 btn-color mb-3" @click="startTestFun">
        Start Test
      </button>
    </div>
    <!-- END INSTRUCTION -->
    <!-- @click="$router.push('auth/signup')" -->

    <div v-else class="container mt-3">
      <div class="w-100 d-flex justify-content-between px-3 fixed-top header_timer bg_green">
        <div class="mb-2">
          {{ timerString }}
        </div>
        <div class="" @click="timerEnabled = !timerEnabled">
          {{ timerEnabled ? 'STOP' : 'RESUME' }}
        </div>
      </div>

      <div
        v-for="(questionItem, index) in allQuestions"
        :key="index"
        v-if="index === questionCounter"
        class="container-fluid text-left margin_top_bottom"
      >
        <img
          v-show="timerEnabled === false"
          src="@/assets/images/previous.png"
          width="30"
          @click="goBack"
          alt=""
        />
        <p class="fw-bold shadow p-4 mb-5 bg-body rounded">
          <span>Q{{ questionCounter + 1 }} -</span> {{ questionItem.question }}
        </p>
        <div class="d-flex flex-column mt-2">
          <ul class="list-group">
            <li
              v-for="(value, index2) in questionItem.options"
              :key="index2"
              class="list-group-item border border-success mb-4 p-3"
              :class="selectAnswer.userInput === value[1] ? 'btn-color' : 'bg-white text-success'"
              @click="selectOption(questionItem.id, value[1])"
            >
              {{ index2 + 1 }}) {{ value[1] }}
            </li>
          </ul>
        </div>
      </div>

      <div class="container-fluid bg-white fixed-bottom footer_height">
        <div class="d-flex flex-row mx-6 justify-content-between">
          <div>
            <button
              type="button"
              class="btn btn-outline-success"
              @click="submitTest"
              :disabled="timerEnabled === false"
            >
              Submit
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
      handler(value) {
        if (value > 0 && this.timerEnabled) {
          setTimeout(() => {
            this.timerCount--;
            this.covertTimer(this.timerCount);
          }, 1000);
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },

  computed: {
    ...mapState(['allPurchasedTests', 'allAttemptedTests']),
  },

  async mounted() {
    this.SET_LOADER(true);
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        // TODO
        console.log('this.timerCount', this.timerCount);
        CapacitorApp.exitApp();
      } else {
        window.history.back();
      }
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

      // TODO remaining time
      // converted mintues to seoconds
      this.timerCount = attemptedTest[0].test.time_limit * 60;

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
    ...mapActions('testManagement', ['startAttemptingTest', 'answerSubmit', 'compeletedTest']),

    async startTestFun() {
      if (!this.attemptedId) {
        const res = await this.startAttemptingTest(this.testId);
        if (res) {
          this.firstAttemptedId = res.id;
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
      if (this.selectAnswer.questionId && this.selectAnswer.userInput) {
        const attemptedId = this.attemptedId ? this.attemptedId : this.firstAttemptedId;
        const obj = {
          attemptedId,
          questionId: this.selectAnswer.questionId,
          userInput: this.selectAnswer.userInput,
        };
        const res = await this.answerSubmit(obj);
        if (res) {
          this.selectAnswer.questionId = null;
          this.selectAnswer.userInput = null;
          this.questionCounter += 1;
          if (this.questionCounter >= this.totalQuestions) {
            const completedRes = await this.compeletedTest(attemptedId);
            if (completedRes) {
              this.$router.push('/dashboard');
            }
          }
        } else {
          alert('something went wrong');
        }
      } else {
        alert('please select option');
      }
    },

    goBack() {
      // TODO
      console.log('this.timerCount', this.timerCount);
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.btn-color {
  background-color: #11a49b;
  color: #fff;
}

.bg_green {
  background-color: #11a49b;
  color: #fff;
}

.header_timer {
  height: 30px;
}

.footer_height {
  height: 50px;
}

.margin_top_bottom {
  margin-top: 40px;
  margin-bottom: 50px;
}
</style>
