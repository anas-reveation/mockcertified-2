<template>
  <div>
    <div class="background_color">
      <div class="container">
        <div class="row align-items-center justify-content-between min-vh-8-">
          <div class="col-12 py-3 px-4">
            <form
              v-if="step === steps.register"
              class="wrapper width_res"
              @submit.prevent="registerLocal"
            >
              <div class="my-3 input-data">
                <p class="fw-bolder font-size-12 text-start mb-2">First Name</p>

                <input
                  type="text"
                  id="firstName"
                  class="border border-2 border-grey rounded py-2 px-3 input"
                  pattern="[a-zA-Z]*"
                  v-model="registerForm.first_name"
                  required
                  placeholder="Enter First Name"
                />
                <div
                  v-if="errors.firstName.isVisiable"
                  class="position-absolute p-1 bg-white text-danger border border-2 border-danger rounded font_family_roboto font_size_14 password_format_position"
                >
                  {{ errors.firstName.msg }}
                </div>
              </div>

              <div class="mb-3 input-data">
                <p class="fw-bolder font-size-12 text-start mb-2">Last Name</p>

                <input
                  type="text"
                  id="lastName"
                  class="border border-2 border-grey rounded py-2 px-3 input"
                  pattern="[a-zA-Z]*"
                  title="It should contain only text"
                  v-model="registerForm.last_name"
                  required
                  placeholder="Enter Last Name"
                />
                <div
                  v-if="errors.lastName.isVisiable"
                  class="position-absolute p-1 bg-white text-danger border border-2 border-danger rounded font_family_roboto font_size_14 password_format_position"
                >
                  {{ errors.lastName.msg }}
                </div>
              </div>

              <div class="mb-3 input-data">
                <p class="fw-bolder font-size-12 text-start mb-2">Email</p>

                <input
                  type="text"
                  class="border border-2 border-grey rounded py-2 px-3 input"
                  v-model="registerForm.email"
                  required
                  placeholder="Enter Your Email ID"
                />

                <div
                  v-if="errors.email.isVisiable"
                  class="position-absolute p-1 bg-white text-danger border border-2 border-danger rounded font_family_roboto font_size_14 password_format_position"
                >
                  {{ errors.email.msg }}
                </div>
              </div>

              <div class="mb-3 input-data position-relative">
                <p class="fw-bolder font-size-12 text-start mb-2">Password</p>

                <input
                  :type="isPasswordVisible ? 'text' : 'password'"
                  class="border border-2 border-grey rounded py-2 px-3 input"
                  v-model="registerForm.password"
                  @input="checkPasswordMatch"
                  required
                  placeholder="Enter Your Password"
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
                <p class="fw-bolder font-size-12 text-start mb-2">Re-enter Password</p>

                <input
                  :type="isPasswordVisible ? 'text' : 'password'"
                  class="border border-2 border-grey rounded py-2 px-3 input"
                  :class="
                    !passwordMatched && registerForm.confirmPassword.length && ' border-danger'
                  "
                  v-model="registerForm.confirmPassword"
                  @input="checkPasswordMatch"
                  required
                  placeholder="Re-enter Your Password"
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

              <div class="text-center mt-4">
                <button
                  type="submit"
                  class="btn text-white fw-bold px-3 w-100 font-size-14"
                  :disabled="isDisabled"
                >
                  <!-- :class="isDisabled ? 'border-grey' : 'btn-primary text-white'" -->
                  Sign Up
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
              <div>
                <div class="py-2">
                  <p class="font_family_nunito mb-0 text-center">or</p>
                </div>
                <div class="social_icons pb-4">
                  <div
                    class="d-flex flex-column align-items-center justify-content-center font-szie-16"
                  >
                    <div
                      class="social_icon_container d-flex align-items-center justify-content-center border border-2 border-grey rounded py-2 px-3 my-2"
                    >
                      <img class="" src="~/assets/images/google_login_icon.png" alt="google" />
                      <p class="text-center font-size-12">Continue with Google</p>
                    </div>
                    <div
                      class="social_icon_container d-flex align-items-center justify-content-center border border-2 border-grey rounded py-2 px-3 my-2"
                    >
                      <img src="~/assets/images/apple_icon.svg" alt="apple" />
                      <p class="font-size-12">Continue with Apple</p>
                    </div>
                    <div
                      class="social_icon_container d-flex align-items-center justify-content-center border border-2 border-grey rounded py-2 px-3 my-2"
                    >
                      <img src="~/assets/images/fb_icon.svg" alt="fb" />
                      <p class="font-size-12">Continue with Facebook</p>
                    </div>
                  </div>
                  <p class="font-size-10 font_weight_300 my-2 text-center">
                    Already on Mockcertified?
                    <span
                      class="text-primary cursor_pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal_0"
                      >Login</span
                    >
                  </p>
                </div>
              </div>
            </form>

            <form v-else class="wrapper width_res" @submit.prevent="confirmLocal">
              <!-- <h1 class="mt-5 mb-4 text-sm-center font_size_36">
                Verification
                <br />
                Code
              </h1> -->

              <p class="font-size-12 fw-light text-center">
                Please enter the verification code sent to your email
              </p>

              <p for="verficationCode" class="fw-bolder mb-2 font-size-20 text-center">
                Enter Verification Code
              </p>

              <div class="mb-3 input-data">
                <input
                  type="text"
                  class="border border-2 border-primary rounded py-2 px-3 input font-size-14"
                  v-model="confirmForm.code"
                  required
                  placeholder="Enter Code"
                />
              </div>

              <div class="text-center mt-2">
                <button
                  type="submit"
                  class="btn btn-primary border border-2 border-secondary text-white fw-bold px-3 w-100 font-size-14"
                >
                  Confirm
                </button>
              </div>
              <div class="text-center mt-2">
                <button
                  type="button"
                  class="btn border border-2 border-primary text-white fw-bold px-3 w-100 font-size-14"
                  @click="resendCode"
                >
                  Resend the code
                </button>
              </div>
              <div class="text-center mt-2">
                <p type="button" class="fw-bold px-3 font-size-12 text-primary" @click="goToSignUp">
                  Edit your details
                </p>
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
  middleware: ['authenticated'],

  data: () => ({
    steps: { ...steps },
    step: steps.register,
    registerForm: {
      email: null,
      first_name: null,
      last_name: null,
      password: null,
      confirmPassword: '',
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

    changeBodyStyle() {
      // Get the body element
      const body = document.body;

      // Change the style property (e.g., overflow) as needed
      body.style.overflow = 'visible';
      const modal = document.querySelector('.modal-backdrop');
      if (modal) {
        // Check if the modal has the 'show' class
        if (modal.classList.contains('show')) {
          // Remove the 'show' class
          modal.classList.remove('show');

          // Add the 'hide' class
          modal.classList.add('hide');
          modal.remove();

          // Alternatively, you can use Bootstrap's modal method to hide the modal
          // $(modal).modal('hide');
        }
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
        this.changeBodyStyle();
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

    goToSignUp() {
      this.step = this.steps.register;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/bootstrapBreakpoint.scss';

form .input {
  width: 100%;
  font-size: 14px;
}

.eye {
  padding: 15px !important;
}

.social_icons img {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;
  margin-left: 2em;
}

.social_icons p {
  margin-bottom: 0;
  font-weight: 600;
}
.btn {
  background: #5271ff;
}
.social_icon_container {
  width: 100%;
  position: relative;
}
.font_weight_300 {
  font-weight: 300 !important;
}

.img_container {
  transform: scale(2.5);
}
.btn {
  background: #5271ff;
}
.cursor_pointer {
  cursor: pointer;
}

@include media-breakpoint-up(sm) {
}
@include media-breakpoint-up(md) {
}
@include media-breakpoint-up(lg) {
}
@include media-breakpoint-up(xl) {
}
@include media-breakpoint-up(xxl) {
}
</style>
