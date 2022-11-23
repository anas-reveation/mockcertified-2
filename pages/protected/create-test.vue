<template>
  <div class="container container_width">
    <h1 class="mt-5 mb-4 font_size_36 col-md-12">Create new test</h1>
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
            v-if="category"
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
          step="any"
          @keydown="numberValidation"
          v-model="formData.price"
          required
        />
        <label class="form-label">
          Price ($ USD)
          <img
            v-if="!errors.price.isValid"
            src="@/assets/images/i_button.svg"
            alt="i-button"
            @click="errors.price.isVisiable = !errors.price.isVisiable"
          />
        </label>
        <div
          v-if="errors.price.isVisiable"
          class="position-absolute p-1 bg-white text-danger border border-2 border-danger rounded font_family_roboto font_size_14 password_format_position"
        >
          {{ errors.price.msg }}
        </div>
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

      <div class="mb-4 input-data">
        <input
          type="text"
          class="border border-2 border-primary rounded form-control"
          v-model="formData.credit"
        />
        <label class="form-label">Test Material Reference (optional)</label>
      </div>

      <div class="mb-4 input-data border border-2 border-primary rounded">
        <input
          class="container"
          type="file"
          ref="fileupload"
          @change="uploadFile"
          @click="resetFileRef"
        />
        <label class="form-label fixed_up">Question list (csv file only)</label>
      </div>

      <button type="button" class="btn text-white mb-3 bg_clr_blue" @click="downloadCsv">
        Download template
      </button>

      <div class="text-center row">
        <div class="col-sm-6">
          <button
            v-if="questionList.length"
            type="button"
            class="btn btn-secondary border border-2 border-primary w-50 mb-2 width_res"
            data-bs-toggle="modal"
            data-bs-target="#reviewQuestion"
          >
            Review Question
          </button>
          <span v-if="this.errors.fileError.msg" class="text-danger">
            {{ this.errors.fileError.msg }}
          </span>
        </div>
        <div class="col-sm-6">
          <button
            type="submit"
            class="btn border border-2 border-primary w-50 mb-2 width_res"
            :class="!isDisableBtn && 'btn-secondary'"
            :disabled="isDisableBtn || questionList.length <= 0"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
    <div v-else-if="!isDisable">
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
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bolder" id="reviewQuestionLabel">Questions</h5>
            <span data-bs-dismiss="modal" aria-label="Close">
              <img src="@/assets/images/circle-cross.svg" alt="circle-cross" />
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
              <div>
                <span class="fw-bolder">Show as a Sample</span>:
                {{ question.is_showcase ? 'Yes' : 'No' }}
              </div>
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
import { mapState, mapActions, mapMutations } from 'vuex';
import { Browser } from '@capacitor/browser';

export default {
  middleware: ['authenticated'],

  head() {
    return {
      title: 'Create A New Test',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Create a new mock test by filling the details title, description, category, sub-category, price, time limits, reference, upload questions list in the form.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Create A New Test - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Create a new mock test by filling the details title, description, category, sub-category, price, time limits, reference, upload questions list in the form.',
        },
        {
          name: 'keywords',
          content: 'Create A New Test, Mockcertified App',
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
          content: 'Create A New Test - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Create a new mock test by filling the details title, description, category, sub-category, price, time limits, reference, upload questions list in the form.',
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
      formData: {
        title: null,
        description: null,
        categoryId: 'default',
        subCategoryId: 'default',
        price: null,
        credit: '',
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
      file: null,
      errors: {
        timeLimit: {
          isValid: true,
          isVisiable: false,
          msg: 'Maximum 300 min.',
        },
        price: {
          isValid: true,
          isVisiable: false,
          msg: 'Upto 2 decimal allow',
        },
        fileError: {
          isValid: true,
          isVisiable: false,
          msg: '',
        },
      },
    };
  },

  watch: {
    // 'formData.title'(newValue, oldValue) {
    //   let result = /\d/.test(newValue);
    //   if (result) {
    //     this.formData.title = oldValue;
    //   }
    // },

    'formData.price'(newValue, _oldValue) {
      let isTwoDecimal = /^\d+(\.\d{1,2})?$/.test(newValue);
      if (!isTwoDecimal) {
        this.errors.price.isValid = false;
      } else {
        this.errors.price.isValid = true;
      }
      if (this.errors.price.isValid) {
        this.errors.price.isVisiable = false;
      }
    },

    file(newValue, _oldValue) {
      if (!newValue) {
        this.questionList = [];
        this.reviewQuestions = [];
      }
    },

    'formData.categoryId'(newValue, _oldValue) {
      this.subCategoryId = 'default';
      const category = this.allCategories.find((category) => category.id === newValue);
      this.allSubCategories = [...category.sub_category.items].sort(function (a, b) {
        let textA = a.name.toUpperCase();
        let textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
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
          this.errors.timeLimit.isValid &&
          this.errors.price.isValid
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
      } else if (
        this.formData.title &&
        this.formData.description &&
        this.formData.price &&
        this.formData.timeLimit &&
        this.formData.categoryId !== 'default' &&
        this.formData.subCategoryId !== 'default' &&
        this.errors.timeLimit.isValid &&
        this.errors.price.isValid
      ) {
        this.isDisableBtn = false;
      }
    },
  },

  computed: {
    ...mapState('auth', ['user']),
  },

  async mounted() {
    if (this.user.stripe_seller_id) {
      await this.getStripeIdStatusLocal();
      const res = await this.stripeOnboardingLocal();
      this.stripeUrl = res;
    } else if (this.user.stripe_seller_id == '') {
      await this.getStripeIdStatusLocal();
      const res = await this.stripeOnboardingLocal();
      this.stripeUrl = res;
      this.isAccountActive = null;
    }
    const allCategories = await this.getAllCategories();

    // Start Moving "other" category at end
    const category = allCategories.find((category) => category.name === 'Other');
    this.allCategories = allCategories.filter((category) => category.name !== 'Other');
    // sorting in alphabetically
    this.allCategories.sort(function (a, b) {
      let textA = a.name.toUpperCase();
      let textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    //
    this.allCategories.push(category);
    // End Moving "other" category at end

    this.isDisable = false;
  },

  methods: {
    ...mapActions('testManagement', ['getAllCategories']),
    ...mapActions('seller', ['createTest', 'stripeOnboarding', 'getStripeIdStatus']),
    ...mapMutations(['SET_LOADER']),

    numberValidation(event) {
      ['e', 'E', '+', '-'].includes(event.key) && event.preventDefault();
    },

    // Whenever user tries to a upload file it will reset so latest changes will appear even user select same file again
    resetFileRef() {
      this.$refs.fileupload.value = '';
      this.questionList = [];
      this.reviewQuestions = [];
      this.errors.fileError.msg = '';
    },

    downloadCsv() {
      let url = process.env.QUESTION_TEMPLATE_CSV;
      this.newWindowsOpen(url);
    },

    uploadFile(event) {
      this.file = null;
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
        this.reviewQuestions = [];
      }
    },

    pasreFileData(FileData) {
      this.questionList = [];
      this.reviewQuestions = [];
      let isFormatted = true;
      // let isPreviewQuestion = false;
      for (let i = 0; i < FileData.length; i++) {
        const row = FileData[i];
        let questionObj = {
          question: null,
          options: [],
          answer: null,
          explanation: null,
          is_showcase: false,
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
          } else if (header && header === 'answer' && col) {
            // From string to array eg:-> "a,b" -> ["a", "b"]
            questionObj.answer = this.getAnswerArray(col);
            questionObj.answer = questionObj.answer.length ? questionObj.answer : null;
          } else if (header && header === 'explanation' && col) {
            questionObj.explanation = col.replace(/\s+/g, ' ').trim();
          } else if (header && header === 'show_as_sample_question' && col) {
            questionObj.is_showcase = col.replace(/\s+/g, ' ').trim().toUpperCase();
            questionObj.is_showcase =
              questionObj.is_showcase === 'Y' || questionObj.is_showcase === 'YES' ? true : false;
            // if (!isPreviewQuestion) {
            //   isPreviewQuestion = questionObj.is_showcase;
            // }
          } else if (header && header.startsWith('option_') && col) {
            const alphabet = String.fromCharCode(64 + j);
            const optionKey = 'option_' + alphabet;
            let optionObj = {};
            optionObj[optionKey] = col.toString().replace(/\s+/g, ' ').trim();
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
          // !questionObj.explanation ||
          !questionObj.options.length
        ) {
          isFormatted = false;
          const formateErrorMsg = 'Invalid file formatted';
          this.errors.fileError.msg = formateErrorMsg;
          this.$swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: formateErrorMsg,
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
          break;
        }

        let mergedAllOptions = {};
        let isSelectedAnswer = false;
        let stringArrayAnswer = [];

        // looping through question's(one question) options
        questionObj.options.forEach((obj) => {
          Object.keys(obj).forEach(function (key) {
            // do something with obj[key]

            // Validation of answer array (If none of the answers match the given option, then it will give a warning/ At least one answer should match the given option.)
            questionObj.answer.forEach((ans) => {
              if (key === 'option_' + ans) {
                isSelectedAnswer = true;
                stringArrayAnswer.push(obj[key]);
              }
            });
          });
          // Merging options into one object
          mergedAllOptions = {
            ...mergedAllOptions,
            ...obj,
          };
        });
        if (!isSelectedAnswer) {
          this.questionList = [];
          const fileErrorMsg = 'You have not selected the correct option';
          this.errors.fileError.msg = fileErrorMsg;
          this.$swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: fileErrorMsg,
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
          break;
        }

        questionObj.answer = stringArrayAnswer;
        questionObj.options = JSON.stringify(mergedAllOptions);
        this.questionList.push(questionObj);
      }

      if (!isFormatted) {
        this.questionList = [];
        this.reviewQuestions = [];
        return;
      }

      // if (!isPreviewQuestion) {
      //   this.questionList = [];
      //   this.reviewQuestions = [];
      //   const fileErrorMsg = 'Please choose question to preview sample question';
      //   this.errors.fileError.msg = fileErrorMsg;
      //   this.$swal.fire({
      //     toast: true,
      //     position: 'top-end',
      //     icon: 'warning',
      //     title: fileErrorMsg,
      //     showConfirmButton: false,
      //     timerProgressBar: true,
      //     timer: 3000,
      //   });
      //   return;
      // }

      this.reviewQuestionsFunc();
    },

    getAnswerArray(stringOption) {
      let answerArray = stringOption.split(',');
      answerArray = answerArray
        .map((ans) => {
          const ans2 = ans.replace(/\s+/g, ' ').trim().toUpperCase();
          if (ans2.length) {
            return ans2;
          }
        })
        .filter((notUndefined) => notUndefined !== undefined);
      if (answerArray.length) {
        return answerArray;
      }
      return false;
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
      if (this.questionList.length <= 0) {
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: 'Please submit questions',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
        return;
      }

      this.formData.title = this.formData.title.replace(/\s+/g, ' ').trim();
      const obj = {
        testDetail: this.formData,
        questionList: this.questionList,
      };

      this.SET_LOADER(true);
      const res = await this.createTest(obj);
      this.SET_LOADER(false);

      if (res) {
        this.$router.push('/dashboard');
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
@import '~/assets/css/bootstrapBreakpoint';

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
.form-select {
  font-size: 15px;
  font-weight: 200;
  height: 39.8px;
}

.wrapper .input-data {
  // height: 40px;
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

@include media-breakpoint-up(sm) {
  .width_res {
    width: 250px !important;
  }
}

@include media-breakpoint-up(lg) {
  .container_width {
    width: 50%;
  }
}
</style>
