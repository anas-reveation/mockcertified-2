<template>
  <div class="container mt-3">
    <div v-if="isLoaderHidden">
      <AnimatedPlaceholder width="150px" height="16px" class="mt-3" />
      <br />
      <AnimatedPlaceholder width="200px" height="16px" class="mt-3" />
      <br />
      <AnimatedPlaceholder width="150px" height="16px" class="mt-3" />
      <br />
      <AnimatedPlaceholder width="200px" height="16px" class="mt-3" />
      <br />
      <AnimatedPlaceholder width="150px" height="16px" class="mt-3" />
      <br />
      <AnimatedPlaceholder width="300px" height="16px" class="mt-3" />
      <br />
      <TestCardsSkeleton class="mt-3" />
    </div>

    <div v-else-if="!isLoaderHidden && testDetail" data-aos="zoom-in">
      <TestDetail
        :title="testDetail.title"
        :shortDescription="`${testDetail.time_limit} min • ${testDetail.questions.items.length} questions •
      ${totalMarks} marks`"
        :description="testDetail.description"
        :price="testDetail.price"
        :fullName="`${testDetail.created_by.first_name} ${testDetail.created_by.last_name}`"
        :credit="testDetail.credit"
      />

      <div class="mt-4 pb-2" v-for="(question, index) in testQuestions" :key="index">
        <TestQuestion :question="question" :index="index + 1" />
      </div>

      <div class="pb-3 reject_title" v-if="testDetail.reject_description">
        <span class="fw-bolder"> Reject Description</span>:- {{ testDetail.reject_description }}
      </div>

      <div v-if="testDetail.status === 'IN_PROGRESS'">
        <div class="text-center">
          <button
            class="btn btn-primary text-white mb-1 w-50 width_res"
            type="button"
            @click="approveRejectTestLocal('approve')"
          >
            <span class="font_size_16">Approve</span>
          </button>

          <div class="d-sm-flex justify-content-center">
            <form class="wrapper my-3">
              <div class="mb-2 input-data">
                <input
                  type="text"
                  class="border border-dark rounded form-control"
                  :class="!rejectDescription.length && 'reject_clr'"
                  v-model="rejectDescription"
                  required
                />
                <label
                  class="form-label label_clr"
                  :class="!rejectDescription.length && 'reject_clr'"
                >
                  Reason of Rejection
                </label>
              </div>
            </form>
          </div>

          <button
            class="btn border border-2 border-danger text-danger w-50 mb-2 width_res"
            type="button"
            :disabled="!rejectDescription"
            @click="approveRejectTestLocal('reject')"
          >
            <span class="font_size_16">Reject</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var AWS = require('aws-sdk');
AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

import { mapState, mapActions, mapMutations } from 'vuex';

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
      rejectDescription: '',
      testId: null,
      SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
    };
  },

  async asyncData({ params }) {
    const testSlug = params.testId;
    return { testSlug };
  },

  computed: {
    ...mapState(['isLoaderHidden']),
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
    this.setIsLoaderHidden(true);
    this.testId = await this.getTestIdBySlug(this.testSlug);

    if (!this.allTests.length) {
      await this.getAllTests();
    }

    this.testDetail = this.allTests.find((test) => test.id === this.testId);

    if (!this.testDetail) {
      this.setIsLoaderHidden(false);
      this.$router.push('/');
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
    this.setIsLoaderHidden(false);
  },

  methods: {
    ...mapMutations(['setIsLoaderHidden']),
    ...mapActions('admin', ['getAllTests', 'approveRejectTest']),
    ...mapActions('testManagement', ['getTestIdBySlug']),

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
          timer: 7000,
        });
        return;
      } else if (status === 'reject' && this.rejectDescription) {
        const res = await this.$swal.fire({
          title: 'Do you want to reject the test?',
          showCancelButton: true,
          confirmButtonText: 'Yes',
        });
        this.sendEmail(this.testDetail.created_by.email, this.testDetail.title, false);
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
        this.sendEmail(this.testDetail.created_by.email, this.testDetail.title, true);
        if (!res.isConfirmed) {
          return;
        }
      }

      window.scrollTo(0, 0);
      const res = await this.approveRejectTest(params);
      if (res) {
        this.$router.push('/protected/admin');
      }
    },
    sendEmail(toEmail, name, status) {
      if (status) {
        var params = {
          Destination: {
            ToAddresses: [toEmail],
          },
          Message: {
            /* required */
            Body: {
              /* required */
              Html: {
                Charset: 'UTF-8',
                Data: '<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"> <div style="margin:50px auto;width:70%;padding:20px 20px"> <div style="border-bottom:1px solid #eee"> <img src="https://amplify-mobileappmarketplace-dev-123858-deployment.s3.amazonaws.com/logo_with_name.svg"></img> </div> <p style="font-size:1.1em">Hi,</p> <p>Thank you for creating a test in MockCertified. The test is now available in the app for purchase. Share the test as much as possilbe to earn and spread knowledge</p><p style="font-size:0.9em;">Regards,<br />MockCertified Team</p> <hr style="border:none;border-top:1px solid #eee" /> <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"> <img src="https://amplify-mobileappmarketplace-dev-123858-deployment.s3.amazonaws.com/logo_with_name.svg"></img> </div> </div> </div>',
              },
              Text: {
                Charset: 'UTF-8',
                Data: 'TEXT_FORMAT_BODY',
              },
            },
            Subject: {
              Charset: 'UTF-8',
              Data: `Your test ${name} is approved and available to users for purchase`,
            },
          },
          Source: this.SUPPORT_EMAIL,
        };
      } else {
        var params = {
          Destination: {
            ToAddresses: [toEmail],
          },
          Message: {
            /* required */
            Body: {
              /* required */
              Html: {
                Charset: 'UTF-8',
                Data: '<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"> <div style="margin:50px auto;width:70%;padding:20px 20px"> <div style="border-bottom:1px solid #eee"> <img src="https://amplify-mobileappmarketplace-dev-123858-deployment.s3.amazonaws.com/logo_with_name.svg"></img> </div> <p style="font-size:1.1em">Hi,</p> <p>Thank you for creating a test in MockCertified. The test is rejected please check the app for the reason and create the test agian.</p><p style="font-size:0.9em;">Regards,<br />MockCertified Team</p> <hr style="border:none;border-top:1px solid #eee" /> <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"> <img src="https://amplify-mobileappmarketplace-dev-123858-deployment.s3.amazonaws.com/logo_with_name.svg"></img> </div> </div> </div>',
              },
              Text: {
                Charset: 'UTF-8',
                Data: 'TEXT_FORMAT_BODY',
              },
            },
            Subject: {
              Charset: 'UTF-8',
              Data: `Your test ${name} is Rejected. Please try again. `,
            },
          },
          Source: this.SUPPORT_EMAIL,
        };
      }

      // Create the promise and SES service object
      var sendPromise = new AWS.SES().sendEmail(params).promise();

      // Handle promise's fulfilled/rejected states
      sendPromise
        .then(function (data) {})
        .catch(function (err) {
          console.error(err, err.stack);
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import '~bootstrap/scss/_functions.scss';
@import '~bootstrap/scss/_variables.scss';
@import '~bootstrap/scss/mixins/_breakpoints';

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

.label_clr {
  color: #797c7f !important;
}

.reject_clr {
  background-color: #f7f7f7 !important;
  color: #a2a3a5;
}

@include media-breakpoint-up(sm) {
  .width_res {
    width: 220px !important;
  }
}

@include media-breakpoint-down(lg) {
  .reject_title {
    font-size: 18px;
  }
}
</style>
