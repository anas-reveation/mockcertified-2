<template>
  <div class="container px-4">
    <div class="row">
      <div class="col-12">
        <p class="font-size-12 fw-light text-center color_grey">
          Enter the email address you use on Mockcertified. We'll send you a link to reset your
          password.
        </p>

        <form v-if="pageCount === 0" @submit.prevent="resetPassword" class="width_res">
          <p class="fw-bolder font-size-12 text-start mb-2">Email</p>
          <input
            type="email"
            class="border border-2 border-grey rounded py-1 px-3 font-size-14 form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Your Email ID"
            v-model="email"
            required
          />
          <div class="text-center mt-3">
            <button type="submit" class="btn btn-primary font-size-14 text-white w-100">
              Reset Password
            </button>
          </div>
        </form>

        <!-- PAGE 2 -->
        <form v-else class="wrapper" @submit.prevent="newPasswordSubmit">
          <div class="mb-4 input-data">
            <input
              type="text"
              class="border border-2 border-primary rounded py-3 font-size-14"
              v-model="code"
              required
              placeholder="Enter Verification Code"
            />
            <!-- <label class="font-size-14">Enter verification code</label> -->
          </div>

          <div class="mb-4 input-data">
            <input
              :type="isPasswordVisible ? 'text' : 'password'"
              class="border border-2 border-primary rounded py-3"
              v-model="password"
              @input="checkPasswordMatch"
              required
              placeholder="Enter New Password"
            />
            <label>
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
              placeholder="Confirm New Password"
            />
            <label>
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
              class="btn btn-primary text-white fw-bold px-3 w-100 font-size-14"
              :disabled="
                !code ||
                !password ||
                !confirmPassword ||
                password !== confirmPassword ||
                !errors.password.isValid
              "
            >
              <!-- :class="
                  !code || !password || !confirmPassword || !errors.password.isValid
                    ? 'btn-gray'
                    : 'btn-secondary'
                " -->
              Reset Password
            </button>
          </div>
        </form>

        <div class="py-2">
          <p class="mb-0 text-center font-size-12">
            Back to
            <span
              class="text-primary text-decoration-underline cursor_pointer"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal_0"
              >Login</span
            >
          </p>
        </div>
        <div class="pb-3">
          <p class="mb-0 text-center font-size-12">
            Edit
            <span class="text-primary text-decoration-underline cursor_pointer" @click="editEmail">
              Email
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import { mapMutations } from 'vuex';

export default {
  middleware: ['authenticated'],

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
        msg: 'Minimum password length required is 8 characters with at least 1 (upper & lower) case letter, 1 number and 1 special character (for security purposes)',
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
          timer: 7000,
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
          timer: 7000,
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
          timer: 7000,
        });
        this.pageCount = 0;
        this.email = '';
        this.password = null;
        this.confirmPassword = '';
        this.code = null;
        this.$router.push('/');
      } catch (err) {
        this.SET_LOADER(false);
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Invalid code',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
      }
    },

    editEmail() {
      // Add any logic here to handle editing the email
      // For example, you can reset this.pageCount to 0
      this.pageCount = 0;
      this.code = null;
      this.password = null;
      this.confirmPassword = null;
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
.color_grey {
  color: rgba(123, 135, 148, 1);
}
.cursor_pointer {
  cursor: pointer;
}
@include media-breakpoint-up(md) {
}

@include media-breakpoint-down(lg) {
}

@include media-breakpoint-up(lg) {
}
</style>
