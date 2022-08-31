<template>
  <div v-if="testDetail" class="container">
    <TestDetail
      :title="testDetail.title"
      :shortDescription="`${testDetail.time_limit} min • ${testDetail.questions.items.length} questions •
      ${totalMarks} marks`"
      :description="testDetail.description"
      :price="testDetail.price"
      :fullName="`${testDetail.created_by.first_name} ${testDetail.created_by.last_name}`"
    />

    <div class="pb-2" v-for="(question, index) in testQuestions" :key="index">
      <TestQuestion :question="question" :index="index + 1" />
    </div>

    <div class="pb-3" v-if="testDetail.reject_description">
      <span class="fw-bolder"> Reject Description</span>:- {{ testDetail.reject_description }}
    </div>

    <div v-if="testDetail.status === 'IN_PROGRESS'">
      <div class="text-center">
        <button
          class="btn btn-secondary border border-2 border-dark w-50"
          type="button"
          @click="approveRejectTestLocal('approve')"
        >
          Approve
        </button>

        <form class="wrapper my-3">
          <div class="mb-4 input-data">
            <input
              type="text"
              class="border border-2 border-primary rounded form-control"
              v-model="rejectDescription"
              required
            />
            <label class="form-label">Reason of Rejection</label>
          </div>
        </form>

        <button
          class="btn border border-2 border-danger text-danger w-50 mb-2"
          type="button"
          :disabled="!rejectDescription"
          @click="approveRejectTestLocal('reject')"
        >
          Reject
        </button>
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
      rejectDescription: null,
    };
  },

  async asyncData({ params }) {
    const testId = params.testId;
    return { testId };
  },

  computed: {
    ...mapState('admin', ['allTests']),

    totalMarks() {
      let totalMarks = 0;
      this.testQuestions.map((ques) => {
        totalMarks += ques.marks;
      });
      return totalMarks;
    },
  },

  async mounted() {
    if (!this.allTests.length) {
      await this.getAllTests();
    }

    this.testDetail = this.allTests.find((test) => test.id === this.testId);
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
    ...mapActions('admin', ['getAllTests', 'approveRejectTest']),

    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },

    async approveRejectTestLocal(status) {
      let params = {
        testId: this.testId,
        status,
      };

      if (status === 'reject' && !this.rejectDescription) {
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: 'Please fill reject decription',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
        return;
      } else if (status === 'reject' && this.rejectDescription) {
        const res = await this.$swal.fire({
          title: 'Do you want to reject the test?',
          showCancelButton: true,
          confirmButtonText: 'Yes',
        });
        if (!res.isConfirmed) {
          return;
        }
        params = {
          ...params,
          rejectDescription: this.rejectDescription,
        };
      } else if (status === 'approve') {
        const res = await this.$swal.fire({
          title: 'Do you want to approve the test?',
          showCancelButton: true,
          confirmButtonText: 'Yes',
        });
        if (!res.isConfirmed) {
          return;
        }
      }

      window.scrollTo(0, 0);
      const res = await this.approveRejectTest(params);
      if (res) {
        this.$router.push('/admin');
      }
    },
  },
};
</script>

<style scoped lang="scss">
.underline_hr {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #000;
  line-height: 0.1em;
  margin: 10px 0 20px;
}

.underline_hr span {
  background: #fff;
  padding: 0 10px;
}

.wrapper .input-data {
  height: 40px;
  width: 100%;
  position: relative;
}

.wrapper .input-data input {
  height: 100%;
  width: 100%;
  border: none;
  font-size: 17px;
  outline-color: #6782e1;
}

.input-data input:focus ~ label,
.input-data input:valid ~ label {
  transform: translateY(-20px);
  font-size: 15px;
  color: #000;
}

.wrapper .input-data label {
  position: absolute;
  top: 3px;
  left: 0.8rem;
  color: #000;
  pointer-events: none;
  transition: all 0.3s ease;
  background-color: white;
}

.input-data input:focus ~ .underline:before,
.input-data input:valid ~ .underline:before {
  transform: scaleX(1);
}

.fixed_up {
  transform: translateY(-20px);
  font-size: 15px;
  color: #000;
}
</style>
