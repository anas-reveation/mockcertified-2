<template>
  <div v-if="testDetail" class="container">
    <TestDetail
      :title="testDetail.title"
      :shortDescription="`${testDetail.time_limit} min • ${testDetail.questions.items.length} questions •
      ${totalMarks} marks`"
      :description="testDetail.description"
      :price="testDetail.price"
      :fullName="`${testDetail.created_by.first_name} ${testDetail.created_by.last_name}`"
      :shareFunc="shareTest"
      :credit="testDetail.credit"
    />

    <div class="text-center">
      <div v-if="testStatus" class="d-sm-flex justify-content-start">
        <NuxtLink
          :to="`/protected/test/start-test/${testDetail.id}?attempted_id=${attemptedId}`"
          class="btn btn-secondary border border-2 border-primary fw-bold w-50 mt-3 width_res"
        >
          {{ testStatus }}
        </NuxtLink>
        <button
          class="btn btn-secondary border border-2 border-primary fw-bold w-50 mt-3 width_res"
          @click="startTestAgain"
        >
          Start over
        </button>
      </div>

      <NuxtLink
        v-else
        :to="`/protected/test/start-test/${testDetail.id}`"
        class="btn btn-secondary border border-2 border-primary fw-bold w-50 width_res"
      >
        Start
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { Share } from '@capacitor/share';
import { mapState, mapActions } from 'vuex';

export default {
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
          content: `${this.testDetail && this.testDetail.description} - Mockcertified App`,
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
          content: `${this.testDetail && this.testDetail.description} - Mockcertified App`,
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
      testStatus: null,
      attemptedId: null,
      totalMarks: 0,
    };
  },

  async asyncData({ params }) {
    const testId = params.testId;
    return { testId };
  },

  computed: {
    ...mapState(['allPurchasedTests', 'allAttemptedTests']),
  },

  async mounted() {
    const testId = this.testId;
    const attemptedTest = this.allAttemptedTests.filter((item) => {
      if (item.test.id === testId) {
        if (item.status === 'IN_PROGRESS') {
          this.testStatus = 'Continue';
          return item;
        }
      }
    });
    const purchasedTest = this.allPurchasedTests.filter((item) => item.test.id === testId);
    if (attemptedTest.length) {
      this.attemptedId = attemptedTest[0].id;
      this.testDetail = attemptedTest[0].test;
      this.totalMarksCal(attemptedTest[0].test);
      return;
    } else if (purchasedTest.length) {
      this.testDetail = purchasedTest[0].test;
      this.totalMarksCal(purchasedTest[0].test);
      return;
    } else {
      this.$router.back();
    }
  },

  methods: {
    ...mapActions('testManagement', ['abortedAttemptedTest']),

    totalMarksCal(test) {
      if (test) {
        let totalMarks = 0;
        test.questions.items.map((ques) => {
          totalMarks += ques.marks;
        });
        this.totalMarks = totalMarks;
      }
    },

    async startTestAgain() {
      const res = await this.abortedAttemptedTest(this.attemptedId);
      if (res) {
        this.$router.push(`/protected/test/start-test/${this.testId}`);
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

<style scoped lang="scss">
@import '~bootstrap/scss/_functions.scss';
@import '~bootstrap/scss/_variables.scss';
@import '~bootstrap/scss/mixins/_breakpoints';

@include media-breakpoint-up(sm) {
  .width_res {
    width: 250px !important;
    margin-right: 1rem;
  }
}
</style>
