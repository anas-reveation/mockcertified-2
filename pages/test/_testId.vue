<template>
  <div v-if="selectedTest" class="container">
    <div class="container-fluid">
      <img
        src="@/assets/images/previous.png"
        class="pb-4"
        width="30"
        @click="$router.back()"
        alt=""
      />

      <img
        class="w-100 rounded"
        src="https://cdn.pixabay.com/photo/2015/11/15/07/47/geometry-1044090__340.jpg"
        alt=""
      />
      <div class="mt-3">
        <span class="fs-4 fw-bolder text-success">${{ selectedTest.price }}</span>

        <div class="d-flex justify-content-between mb-3 mt-3">
          <span class="fs-5 fw-bolder text-secondary"
            >{{ selectedTest.created_by.first_name }} {{ selectedTest.created_by.last_name }}</span
          >
          <span class="fs-6 fw-bolder text-dark"
            >{{ selectedTest.questions.items.length }} questions</span
          >
        </div>

        <span class="fs-4 fw-bold">Description</span>
        <p class="py-2 text-dark rounded">
          {{ selectedTest.description }}
        </p>
        <div class="d-flex justify-content-between">
          <span class="fs-6 fw-bolder text-dark">{{ selectedTest.time_limit }} min</span>
          <span class="fs-6 fw-bolder text-dark">{{ totalMarks }} marks</span>
        </div>
        <button type="button" class="btn w-100 py-2 my-2 btn-color shadow">Attempt test</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  middleware: ['authenticated'],

  data() {
    return {
      testDetail: null,
    };
  },

  computed: {
    ...mapState(['selectedTest']),

    totalMarks() {
      if (this.selectedTest) {
        let totalMarks = 0;
        this.selectedTest.questions.items.map((ques) => {
          totalMarks += ques.marks;
        });
        return totalMarks;
      }
    },
  },

  async mounted() {
    if (!this.selectedTest) {
      this.$router.back();
    }
    this.testDetail = this.selectedTest;
  },
};
</script>
