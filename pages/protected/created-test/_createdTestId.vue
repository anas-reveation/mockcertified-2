<template>
  <div v-if="testDetail" class="container">
    <TestDetail
      class="mt-3"
      :title="testDetail.title"
      :shortDescription="`${testDetail.time_limit} min • ${testDetail.questions.items.length} questions •
      ${totalMarks} marks`"
      :description="testDetail.description"
      :price="testDetail.price"
      :fullName="`${user.first_name} ${user.last_name}`"
      :shareFunc="shareTest"
      :credit="testDetail.credit"
      :rejectDescription="testDetail.reject_description"
    />

    <div class="mt-3">
      <div v-for="(question, index) in testQuestions" :key="index">
        <TestQuestion :question="question" :index="index + 1" />
      </div>
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
          content: `${this.testDetail && this.testDetail.title}, Mockcertified App`,
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

  data() {
    return {
      testDetail: null,
      createdTestId: null,
    };
  },

  async asyncData({ params }) {
    const testSlug = params.createdTestId;
    return { testSlug };
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
    this.createdTestId = await this.getTestIdBySlug(this.testSlug);

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
      const ordered = Object.keys(parsedData)
        .sort()
        .reduce((obj, key) => {
          obj[key] = parsedData[key];
          return obj;
        }, {});
      return {
        ...ques,
        options: Object.entries(ordered),
      };
    });
  },

  methods: {
    ...mapActions('testManagement', ['getUserTests', 'getTestIdBySlug']),

    async shareTest() {
      const domainOrigin = window.location.origin;
      const testSlug = this.testSlug;
      const title = this.testDetail.title;
      const url = `${domainOrigin}/category/test/${testSlug}`;
      try {
        await Share.share({
          title,
          text: `${title} is Really awesome test`,
          url,
          dialogTitle: 'Share with buddies',
        });
      } catch (_err) {}
    },
  },
};
</script>
