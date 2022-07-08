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

      <img
        class="w-100 rounded"
        src="https://cdn.pixabay.com/photo/2015/11/15/07/47/geometry-1044090__340.jpg"
        alt=""
      />
      <div class="mt-3">
        <span class="fs-4 fw-bolder text-success">${{ formatPrice(testDetail.price) }}</span>

        <div class="d-flex justify-content-between mb-3 mt-3">
          <span class="fs-5 fw-bolder text-secondary"
            >{{ testDetail.created_by.first_name }} {{ testDetail.created_by.last_name }}</span
          >
          <span class="fs-6 fw-bolder text-dark"
            >{{ testDetail.questions.items.length }} questions</span
          >
        </div>

        <span class="fs-4 fw-bold">Description</span>
        <p class="py-2 text-dark rounded">
          {{ testDetail.description }}
        </p>
        <div class="d-flex justify-content-between">
          <span class="fs-6 fw-bolder text-dark">{{ testDetail.time_limit }} min</span>
          <span class="fs-6 fw-bolder text-dark">{{ totalMarks }} marks</span>
        </div>

        <div v-if="testStatus">
          <NuxtLink
            :to="`/test/start-test/${testDetail.id}?attempted_id=${attemptedId}`"
            class="btn w-100 py-2 my-2 btn-color shadow"
          >
            {{ testStatus }}
          </NuxtLink>
          <button class="btn w-100 py-2 my-2 btn-color shadow" @click="startTestAgain">
            Start over
          </button>
        </div>

        <NuxtLink
          v-else
          :to="`/test/start-test/${testDetail.id}`"
          class="btn w-100 py-2 my-2 btn-color shadow"
        >
          Attempt test
        </NuxtLink>
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
    ...mapActions('testManagement', ['abandonedAttemptedTest']),

    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },

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
      const res = await this.abandonedAttemptedTest(this.attemptedId);
      if (res) {
        this.$router.push(`/test/start-test/${this.testId}`);
      } else {
        alert('something went wrong');
      }
    },
  },
};
</script>
