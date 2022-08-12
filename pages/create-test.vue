<template>
  <div>
    <form
      v-if="user && user.stripe_seller_id && isAccountActive"
      class="container"
      @submit.prevent="testSubmit"
    >
      <div class="mb-2">
        <label class="form-label">Title</label>
        <input type="text" class="form-control" v-model="formData.title" required />
      </div>
      <div class="mb-2">
        <label class="form-label">Description</label>
        <input type="text" class="form-control" v-model="formData.description" required />
      </div>
      <div class="mb-2">
        <label class="form-label">Category</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="formData.categoryId"
        >
          <option selected value="default" disabled>Select Category</option>
          <option v-for="(category, index) in allCategories" :key="index" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="mb-2">
        <label class="form-label">Sub Category</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="formData.subCategoryId"
        >
          <option selected value="default" disabled>Select Sub Category</option>
          <option
            v-for="(subCategory, index) in allSubCategories"
            :key="index"
            :value="subCategory.id"
          >
            {{ subCategory.name }}
          </option>
        </select>
      </div>

      <div class="mb-2">
        <label class="form-label">Price ($ USD)</label>
        <input type="number" class="form-control" min="1" v-model="formData.price" required />
      </div>
      <div class="mb-2">
        <label class="form-label">Time Limit (in mintues)</label>
        <input type="number" class="form-control" min="1" v-model="formData.timeLimit" required />
      </div>

      <div class="mb-1">
        <label class="form-label">Question list (csv/xml file only)</label>
        <a href="/questionFormat.csv" download="questionFormat.csv" class="btn btn-warning">
          Dowload template
        </a>
        <input type="file" @change="onChange" required />
      </div>
      <div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
    <div v-else>
      <div>
        <label><h2>Please create your stripe express seller account</h2></label>
      </div>
      <div class="mb-2">
        <button type="button " @click="stripeOnboardingLocal" class="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { mapActions, mapState } from 'vuex';
// import { Browser } from '@capacitor/browser';
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
      questionList: null,
      isAccountActive: false,
    };
  },
  watch: {
    // whenever question changes, this function will run
    'formData.categoryId'(newValue, _oldValue) {
      this.subCategoryId = 'default';
      const category = this.allCategories.find((category) => category.id === newValue);
      this.allSubCategories = category.sub_category.items;
    },
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  async mounted() {
    this.allCategories = await this.getAllCategories();
    if (this.user.stripe_seller_id) {
      this.getStripeIdStatus(this.user.stripe_seller_id);
    }
  },
  methods: {
    ...mapActions('testManagement', ['getAllCategories']),
    ...mapActions('seller', ['createTest', 'stripeOnboarding']),
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
      if (this.file) {
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
      }
    },
    pasreFileData(FileData) {
      // Removed first element of an array (It is a heading)
      const ActualData = FileData;
      FileData.shift();
      const optionsKey = ['optionA', 'optionB', 'optionC', 'optionD'];
      let dataError = false;
      try {
        this.questionList = FileData.map((data, index) => {
          const options = {
            optionA: data[1].replace(/\s+/g, ' ').trim(),
            optionB: data[2].replace(/\s+/g, ' ').trim(),
            optionC: data[3].replace(/\s+/g, ' ').trim(),
            optionD: data[4].replace(/\s+/g, ' ').trim(),
          };
          let answer = null;
          optionsKey.forEach((option, index2) => {
            if (option === data[5]) {
              answer = ActualData[index][index2 + 1].replace(/\s+/g, ' ').trim();
              return;
            }
          });
          if (!answer) {
            dataError = true;
          }
          const questionObj = {
            question: data[0].replace(/\s+/g, ' ').trim(),
            options: `{\"option_D\":\"${options.optionD}\",\"option_B\":\"${options.optionB}\",\"option_C\":\"${options.optionC}\",\"option_A\":\"${options.optionA}\"}`,
            answer,
            explanation: data[6].replace(/\s+/g, ' ').trim(),
          };
          return questionObj;
        });
        if (dataError) {
          this.questionList = [];
          alert('Please add your question as per we provided format');
          return;
        }
      } catch (err) {
        console.error(err);
        alert('Please add your question as per we provided format');
      }
    },
    async testSubmit() {
      if (this.formData.categoryId === 'default' || this.formData.subCategoryId === 'default') {
        alert('Please select category and sub category');
        return;
      }
      this.formData.title = this.formData.title.toLowerCase();
      const obj = {
        testDetail: this.formData,
        questionList: this.questionList,
      };
      const res = await this.createTest(obj);
      if (res) {
        this.$router.push('/dashboard');
      }
    },
    async stripeOnboardingLocal() {
      if (!this.isAccountActive && this.user.stripe_seller_id) {
        const res = await this.stripeOnboarding();
        window.open(res);
      } else if (!this.isAccountActive && !this.user.stripe_seller_id) {
        const res = await this.stripeOnboarding();
        window.open(res);
      }
    },

    async getStripeIdStatus(id) {
      let token =
        'sk_test_51LO8AEGrqGT9imAkAXWFCNjuhOiON3TuXe5JaTK7RhYT6p1mosPSK4PsPhm5TN6DfHCWbBaYayGaFJ44M1EIwGHJ002BKvTA4E';
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await this.$axios.get(`https://api.stripe.com/v1/accounts/${id}`, config);
      if (!result.data.details_submitted) {
        return false;
      } else {
        this.isAccountActive = true;
        return true;
      }
    },
  },
};
</script>
