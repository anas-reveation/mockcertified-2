<template>
  <div class="container">
    <NavbarLogo />

    <div class="row">
      <div class="col-sm-6 d-none d-sm-flex flex-column align-items-center justify-content-center">
        <div>
          <img src="~/assets/images/Illustration.svg" class="me-4" alt="Illustration" />
        </div>
      </div>
      <div class="col-sm-6">
        <img
          class="position-absolute top-0 end-0 oval_img"
          src="@/assets/images/oval.jpg"
          alt="oval"
        />
        <h1 class="my-5 fw-bold font_size_36 text-sm-center">
          Reset
          <br class="d-sm-none" />
          Password
        </h1>
        <p class="text-sm-center">
          Enter the email associated with your account and we will send a verification code to reset
          your password
        </p>

        <form v-if="pageCount === 0" @submit.prevent="resetPassword" class="width_res">
          <label for="email" class="fw-bolder my-3 font_size_24"> Email address: </label>
          <input
            type="email"
            class="border border-2 border-primary rounded form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
            v-model="email"
            required
          />
          <div class="text-center mt-3">
            <button type="submit" class="btn btn-secondary border border-2 border-primary w-100">
              Send
            </button>
          </div>
        </form>

        <!-- PAGE 2 -->
        <form v-else class="wrapper" @submit.prevent="newPasswordSubmit">
          <div class="mb-4 input-data">
            <input
              type="text"
              class="border border-2 border-primary rounded py-3"
              v-model="code"
              required
            />
            <label>Enter verification code</label>
          </div>

          <div class="mb-4 input-data">
            <input
              :type="isPasswordVisible ? 'text' : 'password'"
              class="border border-2 border-primary rounded py-3"
              v-model="password"
              @input="checkPasswordMatch"
              required
            />
            <label>
              Enter new password
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
              :class="!passwordMatched && confirmPassword.length && 'border-danger'"
              v-model="confirmPassword"
              @input="checkPasswordMatch"
              required
            />
            <label>
              Confirm new Password
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

          <div class="text-center mt-2">
            <button
              type="submit"
              class="btn border border-2 border-primary fw-bold px-3 w-100"
              :class="
                !code || !password || !confirmPassword || !errors.password.isValid
                  ? 'btn-gray'
                  : 'btn-secondary'
              "
              :disabled="
                !code ||
                !password ||
                !confirmPassword ||
                password !== confirmPassword ||
                !errors.password.isValid
              "
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import { mapMutations } from 'vuex';

export default {
  layout: 'introLayout',
  middleware: ['authenticated'],

  head() {
    return {
      title: 'Forgot Your Password',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Reset your password by entering your registered email address. We will send the verification code at your email.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Forgot Your Password - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Reset your password by entering your registered email address. We will send the verification code at your email.',
        },
        {
          name: 'keywords',
          content: 'Reset Password, Forgot Your Password, Mockcertified App',
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
          content: 'Forgot Your Password - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Reset your password by entering your registered email address. We will send the verification code at your email.',
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
    pageCount: 0,
    email: '',
    password: null,
    confirmPassword: '',
    code: null,
    passwordMatched: false,
    isPasswordVisible: false,
    errors: {
      password: {
        isValid: true,
        isVisiable: false,
        msg: 'Minimum password length required is 8 characters with at least 1 capital letter, 1 number and 1 special character (for security purposes)',
      },
    },
  }),

  watch: {
    password(newValue, _oldValue) {
      // if (!newValue) {
      //   this.errors.password.isValid = true;
      //   return;
      // }
      this.errors.password.isValid =
        /^(?=.*\d)(?=.*[- ?_!@()`#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(newValue);

      if (this.errors.password.isValid) {
        this.errors.password.isVisiable = false;
      }
    },
  },

  methods: {
    ...mapMutations(['SET_LOADER']),

    checkPasswordMatch() {
      if (this.password === this.confirmPassword) {
        this.passwordMatched = true;
      } else {
        this.passwordMatched = false;
      }
    },

    async resetPassword() {
      this.SET_LOADER(true);
      // Send confirmation code to user's email
      try {
        await Auth.forgotPassword(this.email);
        this.SET_LOADER(false);
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Check your email for the verification code',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
        this.pageCount += 1;
      } catch (err) {
        this.SET_LOADER(false);
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Email is not registered',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
      }
    },

    async newPasswordSubmit() {
      this.SET_LOADER(true);
      // Collect confirmation code and new password, then
      try {
        await Auth.forgotPasswordSubmit(this.email, this.code, this.password);
        this.SET_LOADER(false);
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Password successfully changed',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
        this.$router.push('/auth/login');
      } catch (err) {
        this.SET_LOADER(false);
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Invalid code',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
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
}
</style>
