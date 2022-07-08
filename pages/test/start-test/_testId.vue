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

    <div v-else class="container mt-3">
      <div class="fixed-top header_timer">
        <button class="w-100 btn btn-color mb-2" @click="timerEnabled = true">
          {{ timerString }}
        </button>
      </div>
      <div
        v-for="(questionItem, index) in allQuestions"
        :key="index"
        v-if="index === questionCounter"
        class="container-fluid text-left margin_top_bottom"
      >
        <p class="fw-bold shadow p-4 mb-5 bg-body rounded">
          <span>Q{{ index + 1 }} -</span> {{ questionItem.question }}
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
            <button type="button" class="btn btn-outline-success" @click="submitTest">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

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
    };
  },

  async asyncData({ params, query }) {
    const testId = params.testId;
    const attemptedId = query.attempted_id ? query.attempted_id : null;
    return { testId, attemptedId };
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
    ...mapState(['allPurchasedTests']),
  },

  async mounted() {
    const testId = this.testId;
    const purchasedTest = this.allPurchasedTests.filter((item) => item.test.id === testId);
    if (purchasedTest.length) {
      const oneTest = purchasedTest[0];
      this.purchasedId = oneTest.id;
      // converted mintues to seoconds
      this.timerCount = oneTest.test.time_limit * 60;
      const allQuestions = oneTest.test.questions.items;

      // Parse the options of question & making array of objects on fly (for user's input)
      this.allQuestions = allQuestions.map((ques) => {
        const obj = {
          questionId: ques.id,
          userInput: null,
        };

        // this.allQuestionsSubmission.push(obj);

        const parsedData = JSON.parse(ques.options);
        return {
          ...ques,
          options: Object.entries(parsedData),
        };
      });
    } else {
      this.$router.push('/dashboard');
    }
  },

  methods: {
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
      if (this.questionCounter < this.allQuestions.length - 1) {
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
          if (this.questionCounter >= this.allQuestions.length) {
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
  },
};
</script>

<style scoped>
.btn-color {
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
