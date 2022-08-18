<template>
  <div v-if="testDetail" class="container">
    <div class="row justify-content-between">
      <h1 class="col fw-bolder text-capitalize">{{ testDetail.title }}</h1>
      <div class="col text-end">
        <img
          src="@/assets/images/share_icon.svg"
          alt="share"
          height="30"
          width="30"
          @click="shareTest"
        />
      </div>
    </div>
    <p class="my-2 font_family_roboto">
      {{ testDetail.time_limit }} min• {{ testDetail.questions.items.length }} questions•
      {{ totalMarks }} marks•
    </p>

    <div class="row justify-content-between mt-3">
      <div class="col-9 fs-5 text-capitalize fw-bold">
        <img
          src="@/assets/images/profile_icon.svg"
          alt="share"
          class="me-2"
          height="30"
          width="30"
        />
        {{ user.first_name }} {{ user.last_name }}
      </div>
      <span class="col-3 text-primary fw-bold text-end">${{ formatPrice(testDetail.price) }}</span>
    </div>

    <div class="mt-3">
      <h3 class="fw-bolder">Description</h3>
      <p>{{ testDetail.description }}</p>
    </div>

    <div v-for="(question, index) in testQuestions" :key="index">
      <TestQuestion :question="question" />
    </div>
  </div>
</template>

<script>
import { Share } from '@capacitor/share';
import { mapState, mapActions } from 'vuex';
import TestQuestion from '~/components/TestQuestion.vue';

export default {
  components: { TestQuestion },
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
    ...mapState('auth', ['user']),
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

    async shareTest() {
      const domainOrigin = window.location.origin;
      const testId = this.testDetail.id;
      const title = this.testDetail.title;
      const url = `${domainOrigin}/category/test/${testId}`;
      await Share.share({
        title,
        text: `${title} is Really awesome test`,
        url,
        dialogTitle: 'Share with buddies',
      });
    },
  },
};
</script>
