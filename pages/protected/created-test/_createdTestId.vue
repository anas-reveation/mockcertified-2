<template>
  <div v-if="testDetail" class="container">
    <TestDetail
      :title="testDetail.title"
      :shortDescription="`${testDetail.time_limit} min • ${testDetail.questions.items.length} questions •
      ${totalMarks} marks`"
      :description="testDetail.description"
      :price="testDetail.price"
      :fullName="`${user.first_name} ${user.last_name}`"
      :shareFunc="shareTest"
      :credit="testDetail.credit"
    />

    <div v-for="(question, index) in testQuestions" :key="index">
      <TestQuestion :question="question" :index="index + 1" />
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
