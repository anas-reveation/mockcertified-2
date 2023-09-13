<template>
  <div>
    <NavbarAuth />
    <div class="background_color">
      <div class="container">
        <div class="row align-items-center justify-content-between position-relative min_height">
          <div class="col-md-7 mt-5 mt-md-0">
            <div class="row align-items-center position-relative">
              <div class="col-8">
                <p class="span_blue_color text-center fw-bold font_family_aileron long_text">
                  Sign up, <br />
                  because <span class="text-dark">growth</span> <br />
                  starts here.
                </p>
              </div>
              <div class="col-4 img_container">
                <img class="w-100 h-100" src="~/assets/images/rocket.webp" alt="signup" />
              </div>
            </div>

            <div class="d-md-none mt-5">
              <p class="mockcertified_text font_family_aileron span_blue_color">Mockcertifed</p>
            </div>
            <div class="d-none d-md-block position-absolute bottom-0">
              <p class="mockcertified_text font_family_aileron span_blue_color">Mockcertifed</p>
            </div>
          </div>

          <div class="col-md-5 col-lg-4">
            <h1 class="text-center span_blue_color py-3 fw-bold font_family_aileron">Sign Up</h1>
            <form
              v-if="step === steps.register"
              class="wrapper width_res"
              @submit.prevent="registerLocal"
            >
              <div class="my-3 input-data">
                <input
                  type="text"
                  id="firstName"
                  class="border border-2 border-grey rounded py-2 px-3 input"
                  pattern="[a-zA-Z]*"
                  v-model="registerForm.first_name"
                  required
                  placeholder="First Name"
                />
                <div
                  v-if="errors.firstName.isVisiable"
                  class="position-absolute p-1 bg-white text-danger border border-2 border-danger rounded font_family_roboto font_size_14 password_format_position"
                >
                  {{ errors.firstName.msg }}
                </div>
              </div>

              <div class="mb-3 input-data">
                <input
                  type="text"
                  id="lastName"
                  class="border border-2 border-grey rounded py-2 px-3 input"
                  pattern="[a-zA-Z]*"
                  title="It should contain only text"
                  v-model="registerForm.last_name"
                  required
                  placeholder="Last Name"
                />
                <div
                  v-if="errors.lastName.isVisiable"
                  class="position-absolute p-1 bg-white text-danger border border-2 border-danger rounded font_family_roboto font_size_14 password_format_position"
                >
                  {{ errors.lastName.msg }}
                </div>
              </div>

              <div class="mb-3 input-data">
                <input
                  type="text"
                  class="border border-2 border-grey rounded py-2 px-3 input"
                  v-model="registerForm.email"
                  required
                  placeholder="Email"
                />

                <div
                  v-if="errors.email.isVisiable"
                  class="position-absolute p-1 bg-white text-danger border border-2 border-danger rounded font_family_roboto font_size_14 password_format_position"
                >
                  {{ errors.email.msg }}
                </div>
              </div>

              <div class="mb-3 input-data position-relative">
                <input
                  :type="isPasswordVisible ? 'text' : 'password'"
                  class="border border-2 border-grey rounded py-2 px-3 input"
                  v-model="registerForm.password"
                  @input="checkPasswordMatch"
                  required
                  placeholder="Password"
                />
                <div class="position-relative" @click="isPasswordVisible = !isPasswordVisible">
                  <img
                    v-if="isPasswordVisible"
                    class="position-absolute bottom-50 end-0 p-2 eye"
                    src="@/assets/images/password_visible.svg"
                    alt="eye"
                  />
                  <img
                    v-else
                    class="position-absolute bottom-50 end-0 p-2 eye"
                    src="@/assets/images/password_not_visible.svg"
                    alt="eye"
                  />
                </div>
                <div
                  v-if="errors.password.isVisiable"
                  class="position-absolute p-1 bg-white text-danger border border-2 border-danger rounded font_family_roboto font_size_14 password_format_position"
                >
                  {{ errors.password.msg }}
                </div>
              </div>

              <div class="mb-3 input-data">
                <input
                  :type="isPasswordVisible ? 'text' : 'password'"
                  class="border border-2 border-grey rounded py-2 px-3 input"
                  :class="
                    !passwordMatched && registerForm.confirmPassword.length && ' border-danger'
                  "
                  v-model="registerForm.confirmPassword"
                  @input="checkPasswordMatch"
                  required
                  placeholder="Confirm Password"
                />
                <div class="position-relative" @click="isPasswordVisible = !isPasswordVisible">
                  <img
                    v-if="isPasswordVisible"
                    class="position-absolute bottom-50 end-0 eye"
                    src="@/assets/images/password_visible.svg"
                    alt="eye"
                  />
                  <img
                    v-else
                    class="position-absolute bottom-50 end-0 eye"
                    src="@/assets/images/password_not_visible.svg"
                    alt="eye"
                  />
                </div>
              </div>

              <div class="font_size_16 auth_font_size">
                <input type="checkbox" v-model="registerForm.userAgreement" />
                I accept the
                <a
                  href="#"
                  @click="newWindowsOpen"
                  class="text-black fw-bolder text-decoration-underline"
                >
                  terms & conditions
                </a>
                and
                <a
                  href="#"
                  @click="newWindowsOpen('pp')"
                  class="text-black fw-bolder text-decoration-underline"
                >
                  privacy policies
                </a>
              </div>

              <div class="text-center mt-4">
                <button
                  type="submit"
                  class="btn text-white rounded-pill fw-bold px-3 login_btn_width auth_font_size"
                  :disabled="isDisabled"
                >
                  <!-- :class="isDisabled ? 'border-grey' : 'btn-primary text-white'" -->
                  Register
                </button>
              </div>

              <!-- <div class="mt-4 underline_hr"><span>or continue with</span></div> -->

              <div class="mt-2 row">
                <!-- <button
          type="button"
          class="col btn btn-secondary fw-bold border border-2 border-primary p-2 mx-3 text-start"
        >
          <span class="p-1 bg-white border border-2 rounded">
            <img src="@/assets/images/google.png" alt="google" width="20" />
          </span>
          Google
        </button>
        <button
          type="button"
          class="col btn btn-secondary fw-bold border border-2 border-primary p-2 mx-3 text-start"
        >
          <span class="p-1 bg-white border border-2 rounded">
            <img src="@/assets/images/facebook.png" alt="facebook" width="20" />
          </span>
          Facebook
        </button> -->

                <!-- <p class="mt-4 text-center auth_font_size">
                  Already have an account ?
                  <NuxtLink to="/auth/login" class="text-primary text-decoration-none fw-bolder">
                    Login
                  </NuxtLink>
                </p> -->
              </div>
            </form>

            <form v-else class="wrapper width_res" @submit.prevent="confirmLocal">
              <h1 class="mt-5 mb-4 text-sm-center font_size_36">
                Verification
                <br />
                Code
              </h1>

              <p>Please enter the verification code sent to your email</p>

              <label for="verficationCode" class="fw-bolder mb-2 font_size_24">
                Enter Verification Code :
              </label>

              <div class="mb-3 input-data">
                <input
                  type="text"
                  class="border border-2 border-primary rounded py-2 px-3 input"
                  v-model="confirmForm.code"
                  required
                  placeholder="Enter Code"
                />
              </div>

              <div class="text-center mt-2">
                <button
                  type="submit"
                  class="btn btn-primary border border-2 border-secondary text-white fw-bold px-3 login_btn_width"
                >
                  Confirm
                </button>
              </div>
              <div class="text-center mt-2">
                <button
                  type="button"
                  class="btn border border-2 border-primary text-primary fw-bold px-3 login_btn_width"
                  @click="resendCode"
                >
                  Resend the code
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Browser } from '@capacitor/browser';

var AWS = require('aws-sdk');
AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const steps = {
  register: 'REGISTER',
  confirm: 'CONFIRM',
};

export default {
  layout: 'authLayout',
  middleware: ['authenticated'],

  head() {
    return {
      title: 'Signup',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Create an account on our Mockcertified App and browse different categories of mock exams to suit your preferences, and begin your test.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Signup - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Create an account on our Mockcertified App and browse different categories of mock exams to suit your preferences, and begin your test.',
        },
        {
          name: 'keywords',
          content: 'Signup, Mockcertified App',
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
          content: 'Signup - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Create an account on our Mockcertified App and browse different categories of mock exams to suit your preferences, and begin your test.',
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

  data: () => ({
    steps: { ...steps },
    step: steps.register,
    registerForm: {
      email: null,
      first_name: null,
      last_name: null,
      password: null,
      confirmPassword: '',
      userAgreement: false,
    },
    confirmForm: {
      email: '',
      code: '',
    },
    userId: null,
    passwordMatched: false,
    isDisabled: true,
    isPasswordVisible: false,
    passwordDetail: false,

    SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,

    errors: {
      firstName: {
        isValid: true,
        isVisiable: false,
        msg: 'Avoid using spaces or numericals',
      },
      lastName: {
        isValid: true,
        isVisiable: false,
        msg: 'Avoid using spaces or numericals',
      },
      email: {
        isValid: true,
        isVisiable: false,
        msg: 'Invalid email address',
      },
      password: {
        isValid: true,
        isVisiable: false,
        msg: 'Minimum password length required is 8 characters with at least 1 (upper & lower) case letter, 1 number and 1 special character (for security purposes)',
      },
    },
  }),

  watch: {
    registerForm: {
      handler(newValue, oldValue) {
        if (
          newValue.first_name &&
          newValue.last_name &&
          newValue.email &&
          newValue.password &&
          newValue.userAgreement &&
          newValue.password === newValue.confirmPassword &&
          this.errors.firstName.isValid &&
          this.errors.lastName.isValid &&
          this.errors.password.isValid
        ) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
        // Note: `newValue` will be equal to `oldValue` here
        // on nested mutations as long as the object itself
        // hasn't been replaced.
      },
      deep: true,
    },

    'registerForm.first_name'(newValue, _oldValue) {
      this.errors.firstName.isValid = this.checkFirstLastName(newValue);
      if (this.errors.firstName.isValid) {
        this.errors.firstName.isVisiable = false;
      }
    },

    'registerForm.last_name'(newValue, _oldValue) {
      this.errors.lastName.isValid = this.checkFirstLastName(newValue);
      if (this.errors.lastName.isValid) {
        this.errors.lastName.isVisiable = false;
      }
    },

    'registerForm.email'(newValue, _oldValue) {
      // if (!newValue) {
      //   this.errors.email.isValid = true;
      //   return;
      // }

      // trimmed whitespace
      this.registerForm.email = newValue.trim();

      this.errors.email.isValid =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
          newValue,
        );

      if (this.errors.email.isValid) {
        this.errors.email.isVisiable = false;
      }
    },

    'registerForm.password'(newValue, _oldValue) {
      // if (!newValue) {
      //   this.errors.password.isValid = true;
      //   return;
      // }
      this.errors.password.isValid =
        /^(?=.*\d)(?=.*[- ?_!@()`#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(newValue);

      if (this.errors.password.isValid) {
        this.errors.password.isVisiable = false;
      } else {
        this.isDisabled = true;
      }
    },
  },

  methods: {
    ...mapActions('auth', ['register', 'confirmRegistration', 'login', 'resendConfirmationCode']),

    checkFirstLastName(newValue) {
      let res = /^[a-zA-Z]+$/.test(newValue);
      // if (!newValue) return true;
      if (res) return true;
      return false;
    },

    checkPasswordMatch() {
      if (this.registerForm.password === this.registerForm.confirmPassword) {
        this.passwordMatched = true;
      } else {
        this.passwordMatched = false;
        this.isDisabled = true;
      }
    },

    async registerLocal() {
      try {
        this.sendEmail();
        const userData = await this.register(this.registerForm);
        if (!userData) {
          return;
        }
        this.userId = userData.userSub;
        this.confirmForm.email = this.registerForm.email;
        this.step = this.steps.confirm;
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Check your email for the verification code',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
      } catch (err) {
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Something went wrong',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
      }
    },

    async confirmLocal() {
      try {
        const res = await this.confirmRegistration(this.confirmForm);
        if (!res) {
          this.$swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Something went wrong',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 7000,
          });
          return;
        }
        // Till now User is present only in cognito is not in DB. In login function (action file) we are making user object in DB
        const form = { email: this.registerForm.email, password: this.registerForm.password };
        await this.login(form);
        this.$router.push('/homepage');
        // await this.createUserLocal();
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Successfully registered account',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
      } catch (err) {
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Something went wrong',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
      }
    },

    async resendCode() {
      await this.resendConfirmationCode(this.confirmForm.email);
    },

    async newWindowsOpen(params) {
      const domain = process.env.DOMAIN;
      if (params === 'pp') {
        await Browser.open({ url: `https://${domain}/privacy-policy` });
      } else {
        await Browser.open({ url: `https://${domain}/terms-conditions` });
      }
    },

    sendEmail() {
      var params = {
        Destination: {
          ToAddresses: [this.ADMIN_EMAIL],
        },
        Message: {
          /* required */
          Body: {
            /* required */
            Html: {
              Charset: 'UTF-8',
              Data: `<div
      style="
        font-family: Helvetica, Arial, sans-serif;
        min-width: 1000px;
        overflow: auto;
        line-height: 2;
      "
    >
      <div style="margin: 50px auto; width: 70%; padding: 20px 20px">
        <div style="border-bottom: 1px solid #eee">
          <img
            src="https://amplify-mobileappmarketplace-dev-123858-deployment.s3.amazonaws.com/logo_with_name.svg"
          />
        </div>
        <p style="font-size: 1.1em">New User</p>
        <p>First Name: ${this.registerForm.first_name}</p>
        <p>Last Name: ${this.registerForm.last_name}</p>
        <p>Email: ${this.registerForm.email}</p>

        <p style="font-size: 0.9em">Regards,<br />MockCertified Team</p>
        <hr style="border: none; border-top: 1px solid #eee" />
        <div
          style="
            float: right;
            padding: 8px 0;
            color: #aaa;
            font-size: 0.8em;
            line-height: 1;
            font-weight: 300;
          "
        >
          <img
            src="https://amplify-mobileappmarketplace-dev-123858-deployment.s3.amazonaws.com/logo_with_name.svg"
          />
        </div>
      </div>
    </div>`,
            },
            Text: {
              Charset: 'UTF-8',
              Data: 'TEXT_FORMAT_BODY',
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: `New user is created: ${this.registerForm.first_name} ${this.registerForm.last_name}`,
          },
        },
        Source: this.SUPPORT_EMAIL,
      };

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
@import '~/assets/css/bootstrapBreakpoint.scss';
.background_color {
  background: linear-gradient(to right, #dee2fb, #fafafa);
}
.long_text {
  font-size: 25px;
}

form .input {
  background: #e2e3e8;
  width: 100%;
  color: #7b7777;
}

input[type='checkbox'] {
  accent-color: #f5f5f5;
}

.eye {
  padding: 15px !important;
}
.social_icon_container {
  width: 35px;
  height: 35px;
  cursor: pointer;
}

.img_container {
  transform: scale(2.5);
}

.mockcertified_text {
  font-size: 30px;
  background-color: linear-gradient(to right, #1abe36, #fafafa);
}
.btn {
  background: #5271ff;
}

@include media-breakpoint-up(sm) {
  .social_icon_container {
    width: 45px;
    height: 45px;
  }
}
@include media-breakpoint-up(md) {
  .social_icon_container {
    width: 55px;
    height: 55px;
  }
  .long_text {
    font-size: 26px;
  }
  .mockcertified_text {
    font-size: 40px;
  }
}
@include media-breakpoint-up(lg) {
  .social_icon_container {
    width: 65px;
    height: 65px;
  }
  .long_text {
    font-size: 36px;
  }
  .mockcertified_text {
    font-size: 40px;
  }
}
@include media-breakpoint-up(xl) {
  .long_text {
    font-size: 43px;
  }
}
@include media-breakpoint-up(xxl) {
  .long_text {
    font-size: 50px;
  }
}
</style>
