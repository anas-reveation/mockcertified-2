<template>
  <div class="container">
    <form
      v-if="user && user.stripe_seller_id && isAccountActive"
      class="wrapper mt-3"
      @submit.prevent="testSubmit"
    >
      <div class="mb-4 input-data">
        <input
          type="text"
          title="It should contain only text"
          class="border border-2 border-primary rounded form-control"
          v-model="formData.title"
          required
        />
        <label class="form-label">Title</label>
      </div>

      <div class="mb-4 input-data">
        <input
          type="text"
          class="border border-2 border-primary rounded form-control"
          v-model="formData.description"
          required
        />
        <label class="form-label">Description</label>
      </div>

      <div class="mb-4 input-data">
        <select
          class="form-select border border-2 border-primary rounded text-capitalize"
          aria-label="Default select example"
          v-model="formData.categoryId"
        >
          <option selected value="default" disabled>Select Category</option>
          <option
            v-for="(category, index) in allCategories"
            :key="index"
            :value="category.id"
            class="text-capitalize"
          >
            {{ category.name }}
          </option>
        </select>
        <label class="form-label fixed_up">Category</label>
      </div>

      <div class="mb-4 input-data">
        <select
          class="form-select border border-2 border-primary rounded text-capitalize"
          aria-label="Default select example"
          v-model="formData.subCategoryId"
        >
          <option selected value="default" disabled>Select Sub Category</option>
          <option
            v-for="(subCategory, index) in allSubCategories"
            :key="index"
            :value="subCategory.id"
            class="text-capitalize"
          >
            {{ subCategory.name }}
          </option>
        </select>
        <label class="form-label fixed_up">Sub Category</label>
      </div>

      <div class="mb-4 input-data">
        <input
          type="number"
          class="border border-2 border-primary rounded form-control"
          min="1"
          @keydown="numberValidation"
          v-model="formData.price"
          required
        />
        <label class="form-label">Price ($ USD)</label>
      </div>

      <div class="mb-4 input-data">
        <input
          type="number"
          class="border border-2 border-primary rounded form-control"
          min="1"
          @keydown="numberValidation"
          v-model="formData.timeLimit"
          required
        />
        <label class="form-label">
          Time Limit (in min)
          <img
            v-if="!errors.timeLimit.isValid"
            src="@/assets/images/i_button.svg"
            alt="i-button"
            @click="errors.timeLimit.isVisiable = !errors.timeLimit.isVisiable"
          />
        </label>
        <div
          v-if="errors.timeLimit.isVisiable"
          class="position-absolute p-1 bg-white text-danger border border-2 border-danger rounded font_family_roboto font_size_14 password_format_position"
        >
          {{ errors.timeLimit.msg }}
        </div>
      </div>

      <div class="mb-2 input-data border border-2 border-primary rounded">
        <input class="container" type="file" ref="fileupload" @change="onChange" required />
        <label class="form-label fixed_up">Question list (csv file only)</label>
      </div>

      <button type="button" class="btn text-white mb-2 bg_clr_blue" @click="downloadCsv">
        Download template
      </button>

      <div class="text-center">
        <button
          v-if="questionList.length"
          type="button"
          class="btn btn-secondary border border-2 border-primary w-70 mb-2"
          data-bs-toggle="modal"
          data-bs-target="#reviewQuestion"
        >
          Review Question
        </button>
        <button
          type="submit"
          class="btn border border-2 border-primary w-50 mb-2"
          :class="!isDisableBtn && 'btn-secondary'"
          :disabled="isDisableBtn"
        >
          Submit
        </button>
      </div>
    </form>
    <div v-else>
      <div>
        <label><h2>Please create your stripe express seller account</h2></label>
      </div>
      <div class="mb-2">
        <button
          type="button"
          @click="redirectToStripe"
          class="btn btn-secondary border border-2 border-primary"
          :disabled="isDisable"
        >
          Connect
        </button>
      </div>
    </div>

    <!-- Start Modal -->
    <div
      class="modal fade"
      id="reviewQuestion"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="reviewQuestionLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bolder" id="reviewQuestionLabel">Questions</h5>
            <span data-bs-dismiss="modal" aria-label="Close">
              <img src="@/assets/images/circle-cross.svg" alt="" />
            </span>
          </div>
          <div v-if="questionList.length" class="modal-body">
            <div v-for="(question, index) in reviewQuestions" :key="index">
              <TestQuestion
                :question="question"
                :index="index + 1"
                :questionVisible="false"
                class="mb-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { mapState, mapActions } from 'vuex';
import { Browser } from '@capacitor/browser';

export default {
  middleware: ['authenticated'],
  data() {
    return {
      formData: {
        title: null,
        description: null,
        categoryId: 'default',
        subCategoryId: 'default',
        price: null,
        timeLimit: null,
      },
      allCategories: [],
      allSubCategories: [],
      questionList: [],
      reviewQuestions: [],
      isAccountActive: false,
      isDisable: true,
      isDisableBtn: true,
      stripeUrl: null,

      errors: {
        timeLimit: {
          isValid: true,
          isVisiable: false,
          msg: 'Maximum 300 min.',
        },
      },
    };
  },

  watch: {
    'formData.title'(newValue, oldValue) {
      let result = /\d/.test(newValue);
      if (result) {
        this.formData.title = oldValue;
      }
    },

    'formData.categoryId'(newValue, _oldValue) {
      this.subCategoryId = 'default';
      const category = this.allCategories.find((category) => category.id === newValue);
      this.allSubCategories = category.sub_category.items;
    },

    'formData.timeLimit'(newValue, _oldValue) {
      if (newValue > 300) {
        this.errors.timeLimit.isValid = false;
      } else {
        this.errors.timeLimit.isValid = true;
      }
      if (this.errors.timeLimit.isValid) {
        this.errors.timeLimit.isVisiable = false;
      }
    },

    formData: {
      handler(newValue, _oldValue) {
        if (
          newValue.title &&
          newValue.description &&
          newValue.price &&
          newValue.timeLimit &&
          newValue.categoryId !== 'default' &&
          newValue.subCategoryId !== 'default' &&
          this.errors.timeLimit.isValid
        ) {
          this.isDisableBtn = false;
        } else {
          this.isDisableBtn = true;
        }
        // Note: `newValue` will be equal to `oldValue` here
        // on nested mutations as long as the object itself
        // hasn't been replaced.
      },
      deep: true,
    },

    questionList(newValue, _oldValue) {
      if (newValue.length <= 0) {
        this.isDisableBtn = true;
      }
    },
  },

  computed: {
    ...mapState('auth', ['user']),
  },

  async mounted() {
    const allCategories = await this.getAllCategories();

    // Start Moving "other" category at end
    const category = allCategories.find((category) => category.name === 'other');
    this.allCategories = allCategories.filter((category) => category.name !== 'other');
    this.allCategories.push(category);
    // End Moving "other" category at end

    if (this.user.stripe_seller_id) {
      await this.getStripeIdStatusLocal();
      const res = await this.stripeOnboardingLocal();
      this.stripeUrl = res;
    }
    this.isDisable = false;
  },

  methods: {
    ...mapActions('testManagement', ['getAllCategories']),
    ...mapActions('seller', ['createTest', 'stripeOnboarding', 'getStripeIdStatus']),

    numberValidation(event) {
      ['e', 'E', '+', '-'].includes(event.key) && event.preventDefault();
    },

    downloadCsv() {
      let url = process.env.QUESTION_TEMPLATE_CSV;
      this.newWindowsOpen(url);
    },

    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
      if (this.file && this.file.type == 'text/csv') {
        const reader = new FileReader();
        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: 'binary', cellDates: true, dateNF: 'yyyy/mm/dd;@' });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          this.pasreFileData(data);
        };
        reader.readAsBinaryString(this.file);
      } else {
        this.questionList = [];
      }
    },

    pasreFileData(FileData) {
      let isFormatted = true;

      for (let i = 0; i < FileData.length; i++) {
        const row = FileData[i];
        let questionObj = {
          question: null,
          options: [],
          answer: null,
          explanation: null,
        };

        // Individual Question
        for (let j = 0; j < row.length; j++) {
          // Skipping header (first row from loop)
          if (i === 0) {
            continue;
          }
          // header of this column
          const header = FileData[0][j];
          const col = row[j];

          if (header && header === 'question' && col) {
            questionObj.question = col.replace(/\s+/g, ' ').trim();
          } else if (header && header === 'answer' && col && col.startsWith('option_')) {
            questionObj.answer = col.replace(/\s+/g, ' ').trim();
          } else if (header && header === 'explanation' && col) {
            questionObj.explanation = col.replace(/\s+/g, ' ').trim();
          } else if (header && header.startsWith('option_') && col) {
            const alphabet = String.fromCharCode(64 + j);
            const optionKey = 'option_' + alphabet;
            let optionObj = {};
            optionObj[optionKey] = col.replace(/\s+/g, ' ').trim();
            questionObj.options.push(optionObj);
          }
        }
        // skipping header
        if (i === 0) {
          continue;
        }

        if (
          !questionObj.question ||
          !questionObj.answer ||
          !questionObj.explanation ||
          !questionObj.options.length
        ) {
          isFormatted = false;
          this.$swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Invalid file formatted',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
          break;
        }
        let mergedAllOptions = {};
        let isSelectedAnswer = false;
        questionObj.options.forEach((obj) => {
          Object.keys(obj).forEach(function (key) {
            // do something with obj[key]
            if (key === questionObj.answer) {
              questionObj.answer = obj[key];
              isSelectedAnswer = true;
            }
            return;
          });

          // Merging options into one object
          mergedAllOptions = {
            ...mergedAllOptions,
            ...obj,
          };
        });
        if (!isSelectedAnswer) {
          this.questionList = [];
          this.$swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: "You haven't selected correct option",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
          break;
        }

        questionObj.options = JSON.stringify(mergedAllOptions);
        this.questionList.push(questionObj);
      }

      if (!isFormatted) {
        this.questionList = [];
        return;
      }

      this.reviewQuestionsFunc();
    },

    async testSubmit() {
      if (this.formData.categoryId === 'default' || this.formData.subCategoryId === 'default') {
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: 'Please select category and sub category',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
        return;
      }

      this.formData.title = this.formData.title.toLowerCase().replace(/\s+/g, ' ').trim();
      const obj = {
        testDetail: this.formData,
        questionList: this.questionList,
      };
      const res = await this.createTest(obj);
      if (res) {
        this.$router.push('/protected/dashboard');
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Test submitted',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
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

    async stripeOnboardingLocal() {
      if (!this.isAccountActive && this.user.stripe_seller_id) {
        const res = await this.stripeOnboarding();
        return res;
      } else if (!this.isAccountActive && !this.user.stripe_seller_id) {
        const res = await this.stripeOnboarding();
        return res;
      }
    },

    async getStripeIdStatusLocal() {
      const res = await this.getStripeIdStatus();
      if (res == 'active') {
        this.isAccountActive = true;
      } else if (res == 'notActive') {
        this.isAccountActive = false;
      }
    },
    reviewQuestionsFunc() {
      this.questionList.filter((res, index) => {
        // Array of question that is attempted
        const options = res.options;
        const parsedData = JSON.parse(options);
        const questionDetail = {
          ...res,
          // spelling mistake
          explainantion: res.explanation,
          options: Object.entries(parsedData),
        };
        this.reviewQuestions.push(questionDetail);
      });
    },

    redirectToStripe() {
      if (this.stripeUrl) {
        this.newWindowsOpen(this.stripeUrl);
      }
    },

    async newWindowsOpen(url) {
      await Browser.open({ url: url });
    },
  },
};
</script>

<style scoped lang="scss">
.bg_clr_blue {
  background: #1877cf;
}

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

.password_format_position {
  left: 8rem;
  bottom: 2.5rem;
}

.wrapper .input-data label {
  img {
    pointer-events: auto;
  }
}
</style>
