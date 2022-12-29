<template>
  <div class="container px-4">
    <NavbarLogo />

    <div class="row">
      <div class="col-sm-6 d-flex flex-column align-items-center justify-content-center mt-5">
        <div>
          <img src="~/assets/images/Illustration.svg" class="me-4 w-100" alt="Illustration" />
        </div>
      </div>
      <div class="col-sm-6">
        <img
          class="position-absolute top-0 end-0 oval_img"
          src="@/assets/images/oval.jpg"
          alt="oval"
        />

        <form
          v-if="step === steps.register"
          class="wrapper width_res"
          @submit.prevent="registerLocal"
        >
          <h1 class="text-primary text-sm-center fw-bolder mt-5 mb-4 font_size_36">Register</h1>
          <div class="mb-4 input-data">
            <input
              type="text"
              id="firstName"
              class="border border-2 border-primary rounded py-3"
              pattern="[a-zA-Z]*"
              v-model="registerForm.first_name"
              required
            />
            <label>
              First Name
              <img
                v-if="!errors.firstName.isValid"
                src="@/assets/images/i_button.svg"
                alt="i-button"
                @click="errors.firstName.isVisiable = !errors.firstName.isVisiable"
              />
            </label>
            <div
              v-if="errors.firstName.isVisiable"
              class="position-absolute p-1 bg-white text-danger border border-2 border-danger rounded font_family_roboto font_size_14 password_format_position"
            >
              {{ errors.firstName.msg }}
            </div>
          </div>

          <div class="mb-4 input-data">
            <input
              type="text"
              id="lastName"
              class="border border-2 border-primary rounded py-3"
              pattern="[a-zA-Z]*"
              title="It should contain only text"
              v-model="registerForm.last_name"
              required
            />
            <label>
              Last Name
              <img
                v-if="!errors.lastName.isValid"
                src="@/assets/images/i_button.svg"
                alt="i-button"
                @click="errors.lastName.isVisiable = !errors.lastName.isVisiable"
              />
            </label>
            <div
              v-if="errors.lastName.isVisiable"
              class="position-absolute p-1 bg-white text-danger border border-2 border-danger rounded font_family_roboto font_size_14 password_format_position"
            >
              {{ errors.lastName.msg }}
            </div>
          </div>

          <div class="mb-4 input-data">
            <input
              type="text"
              class="border border-2 border-primary rounded py-3"
              v-model="registerForm.email"
              required
            />
            <label>
              Email
              <img
                v-if="!errors.email.isValid"
                src="@/assets/images/i_button.svg"
                alt="i-button"
                @click="errors.email.isVisiable = !errors.email.isVisiable"
              />
            </label>
            <div
              v-if="errors.email.isVisiable"
              class="position-absolute p-1 bg-white text-danger border border-2 border-danger rounded font_family_roboto font_size_14 password_format_position"
            >
              {{ errors.email.msg }}
            </div>
          </div>

          <div class="mb-4 input-data position-relative">
            <input
              :type="isPasswordVisible ? 'text' : 'password'"
              class="border border-2 border-primary rounded py-3"
              v-model="registerForm.password"
              @input="checkPasswordMatch"
              required
            />
            <label>
              Password
              <img
                v-if="!errors.password.isValid"
                src="@/assets/images/i_button.svg"
                alt="i-button"
                @click="errors.password.isVisiable = !errors.password.isVisiable"
              />
            </label>
            <div class="position-relative" @click="isPasswordVisible = !isPasswordVisible">
              <img
                v-if="isPasswordVisible"
                class="position-absolute bottom-50 end-0 p-2"
                src="@/assets/images/password_visible.svg"
                alt="eye"
              />
              <img
                v-else
                class="position-absolute bottom-50 end-0 p-2"
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

          <div class="mb-4 input-data">
            <input
              :type="isPasswordVisible ? 'text' : 'password'"
              class="border border-2 border-primary rounded py-3"
              :class="!passwordMatched && registerForm.confirmPassword.length && ' border-danger'"
              v-model="registerForm.confirmPassword"
              @input="checkPasswordMatch"
              required
            />
            <label>
              Confirm Password
              <img
                v-if="!errors.password.isValid"
                src="@/assets/images/i_button.svg"
                alt="i-button"
                @click="errors.password.isVisiable = !errors.password.isVisiable"
              />
            </label>
            <div class="position-relative" @click="isPasswordVisible = !isPasswordVisible">
              <img
                v-if="isPasswordVisible"
                class="position-absolute bottom-50 end-0 p-2"
                src="@/assets/images/password_visible.svg"
                alt="eye"
              />
              <img
                v-else
                class="position-absolute bottom-50 end-0 p-2"
                src="@/assets/images/password_not_visible.svg"
                alt="eye"
              />
            </div>
          </div>

          <div>
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

          <div class="text-center mt-2">
            <button
              type="submit"
              class="btn border border-2 fw-bold px-3 login_btn_width"
              :class="isDisabled ? 'border-primary' : 'btn-primary text-white'"
              :disabled="isDisabled"
            >
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

            <p class="mt-4 text-center">
              Already have an account ?
              <NuxtLink to="/auth/login" class="text-primary text-decoration-none fw-bolder">
                Login
              </NuxtLink>
            </p>
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

          <div class="mb-4 input-data">
            <input
              type="text"
              class="border border-2 border-primary rounded py-3"
              v-model="confirmForm.code"
              required
            />
            <label>Code</label>
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
              class="btn btn-secondary border border-2 border-primary fw-bold px-3 login_btn_width"
              @click="resendCode"
            >
              Resend the code
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { API } from 'aws-amplify';
import { createUser } from '~/graphql/mutations';
import { Browser } from '@capacitor/browser';
const steps = {
  register: 'REGISTER',
  confirm: 'CONFIRM',
};

export default {
  layout: 'introLayout',
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
        const form = { email: this.registerForm.email, password: this.registerForm.password };
        await this.login(form);
        this.$router.push('/dashboard');
        await this.createUserLocal();
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

    async createUserLocal() {
      const newUser = {
        id: this.userId,
        first_name: this.registerForm.first_name,
        last_name: this.registerForm.last_name,
        email: this.registerForm.email,
      };
      await API.graphql({
        query: createUser,
        variables: { input: newUser },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
    },

    async newWindowsOpen(params) {
      const domain = process.env.DOMAIN;
      if (params === 'pp') {
        await Browser.open({ url: `https://${domain}/privacy-policy` });
      } else {
        await Browser.open({ url: `https://${domain}/terms-conditions` });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/auth.scss';
@import '~/assets/css/bootstrapBreakpoint';

.password_format_position {
  left: 4.5rem;
  bottom: 2.5rem;
}

@include media-breakpoint-up(sm) {
  .width_res {
    width: 75%;
  }

  .login_btn_width {
    width: 100%;
  }
}
</style>
