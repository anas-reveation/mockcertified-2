<template>
  <div v-if="testDetail" class="container mt-3">
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
      :blogLink="testDetail.blog_link"
      :rejectDescription="testDetail.reject_description"
      :isDescEdit="true"
      :descEditFun="descEditFun"
    />

    <div class="mt-3">
      <div v-for="(question, index) in testQuestions" :key="index">
        <TestQuestion :question="question" :index="index + 1" />
      </div>
    </div>
    <div v-if="user && testDetail.status == 'PENDING_APPROVAL'" class="col text-end">
      <button @click="publishFunction('approve')" type="submit" class="btn btn-primary text-white">
        <span class="font_size_16"> Publish </span>
      </button>
    </div>
  </div>
</template>

<script>
import { Share } from '@capacitor/share';
import { mapState, mapActions } from 'vuex';
import TestQuestion from '~/components/TestQuestion.vue';
import { Browser } from '@capacitor/browser';

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
      isAccountActive: false,
      stripeUrl: null,
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
      this.$router.push('/homepage');
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

    if (this.user.stripe_seller_id) {
      await this.getStripeIdStatusLocal();
      const res = await this.stripeOnboardingLocal();
      this.stripeUrl = res;
    } else if (!this.user.stripe_seller_id || this.user.stripe_seller_id == '') {
      await this.getStripeIdStatusLocal();
      const res = await this.stripeOnboardingLocal();
      this.stripeUrl = res;
      this.isAccountActive = null;
    }
  },

  methods: {
    ...mapActions('testManagement', ['getUserTests', 'getTestIdBySlug']),
    ...mapActions('seller', ['editTestDescription', 'stripeOnboarding', 'getStripeIdStatus']),
    ...mapActions('admin', ['approveRejectTest']),

    async publishFunction(status) {
      if (this.user.stripe_seller_id && this.isAccountActive) {
        let params = {
          testId: this.testDetail.id,
          status,
        };
        const res = await this.approveRejectTest(params);
        if (res) {
          this.$router.push('/homepage');
        }
      } else {
        let stripeUrl = this.stripeUrl;
        this.stripeUrl = null;
        if (stripeUrl) {
          this.newWindowsOpen(stripeUrl);
        } else {
          const res = await this.stripeOnboardingLocal();
          stripeUrl = res;
          this.newWindowsOpen(stripeUrl);
        }
      }
    },
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

    async getStripeIdStatusLocal() {
      const res = await this.getStripeIdStatus();
      if (res == 'active') {
        this.isAccountActive = true;
      } else if (res == 'notActive') {
        this.isAccountActive = false;
      }
    },
    async stripeOnboardingLocal() {
      if (!this.isAccountActive && this.user.stripe_seller_id) {
        const res = await this.stripeOnboarding();
        return res;
      } else if (!this.isAccountActive && !this.user.stripe_seller_id) {
        const res = await this.stripeOnboarding();
        return res;
      }
    },

    async descEditFun(descContent) {
      const obj = {
        testId: this.testDetail.id,
        testDescription: descContent,
      };
      await this.editTestDescription(obj);
    },

    async newWindowsOpen(url) {
      await Browser.open({ url: url });
    },
  },
};
</script>
