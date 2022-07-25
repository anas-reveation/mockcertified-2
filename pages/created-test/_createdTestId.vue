<template>
  <div v-if="testDetail" class="container">
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
      <div class="mt-3">
        <div class="d-flex justify-content-between mb-3 mt-3">
          <span class="fs-5 fw-bolder text-success"> ${{ formatPrice(testDetail.price) }} </span>
          <span class="fs-6 fw-bolder text-dark"> {{ testQuestions.length }} questions </span>
        </div>

        <span class="fs-4 fw-bold">Description</span>
        <p class="py-2 text-dark rounded">
          {{ testDetail.description }}
        </p>
        <div class="d-flex justify-content-between">
          <span class="fs-6 fw-bolder text-dark">{{ testDetail.time_limit }} min</span>
          <span class="fs-6 fw-bolder text-dark">{{ totalMarks }} marks</span>
        </div>
      </div>
      <hr />
      <div>
        <p class="fs-3 fw-bolder text-dark">Questions</p>

        <div v-for="(question, index) in testQuestions" :key="index" class="mb-3">
          <div class="fw-bold">{{ index + 1 }}) {{ question.question }}</div>
          <div>
            <div v-for="(option, index2) in question.options" :key="index2" class="ms-2">
              {{ index2 + 1 }} {{ option[1] }}
            </div>
            <div>
              <div><span class="fw-bold">Answer</span>:- {{ question.answer }}</div>
              <div><span class="fw-bold">Explanation</span>:- {{ question.explainantion }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  middleware: ['authenticated'],

  data() {
    return {
      testDetail: null,
    };
  },

  async asyncData({ params }) {
    const createdTestId = params.createdTestId;
    return { createdTestId };
  },

  computed: {
    ...mapState(['allCreatedTests']),

    totalMarks() {
      let totalMarks = 0;
      this.testQuestions.map((ques) => {
        totalMarks += ques.marks;
      });
      return totalMarks;
    },
  },

  async mounted() {
    if (!this.allCreatedTests.length) {
      await this.getUserTests();
    }

    this.testDetail = this.allCreatedTests.find((test) => test.id === this.createdTestId);

    if (!this.testDetail) {
      this.$router.push('/dashboard');
      return;
    }

    this.testQuestions = this.testDetail.questions.items.map((ques) => {
      const parsedData = JSON.parse(ques.options);
      return {
        ...ques,
        options: Object.entries(parsedData),
      };
    });
  },

  methods: {
    ...mapActions('testManagement', ['getUserTests']),

    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },
  },
};
</script>
