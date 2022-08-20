<template>
  <div class="container px-4">
    <div class="position-absolute top-0 end-0 p-2">
      <NuxtLink to="/">
        <img src="@/assets/images/logo.svg" alt="logo" />
      </NuxtLink>
    </div>

    <img class="position-absolute top-0 end-0 oval_img" src="@/assets/images/oval.jpg" alt="oval" />
    <h1 class="mt-5 mb-4 font_size_36">Register</h1>

    <form v-if="step === steps.register" class="wrapper" @submit.prevent="registerLocal">
      <div class="mb-4 input-data">
        <input
          type="text"
          id="firstName"
          class="border border-2 border-primary rounded"
          pattern="[a-zA-Z]*"
          title="It should contain only text"
          v-model="registerForm.first_name"
          required
        />
        <label>First Name</label>
      </div>

      <div class="mb-4 input-data">
        <input
          type="text"
          id="lastName"
          class="border border-2 border-primary rounded"
          pattern="[a-zA-Z]*"
          title="It should contain only text"
          v-model="registerForm.last_name"
          required
        />
        <label>Last Name</label>
      </div>

      <div class="mb-4 input-data">
        <input
          type="email"
          class="border border-2 border-primary rounded"
          v-model="registerForm.email"
          required
        />
        <label>Email</label>
      </div>

      <div class="mb-4 input-data">
        <input
          :type="isPasswordVisible ? 'text' : 'password'"
          class="border border-2 border-primary rounded"
          v-model="registerForm.password"
          @input="checkPasswordMatch"
          required
        />
        <label>Password</label>
        <div class="position-relative" @click="isPasswordVisible = !isPasswordVisible">
          <img
            class="position-absolute bottom-50 end-0 p-2"
            src="@/assets/images/password_visible.svg"
            alt="eye"
          />
        </div>
      </div>

      <div class="mb-4 input-data">
        <input
          :type="isPasswordVisible ? 'text' : 'password'"
          class="border border-2 border-primary rounded"
          :class="!passwordMatched && ' border-danger'"
          v-model="registerForm.confirmPassword"
          @input="checkPasswordMatch"
          required
        />
        <label>Confirm Password</label>
        <div class="position-relative" @click="isPasswordVisible = !isPasswordVisible">
          <img
            class="position-absolute bottom-50 end-0 p-2"
            src="@/assets/images/password_visible.svg"
            alt="eye"
          />
        </div>
      </div>

      <div class="text-center mt-2">
        <button
          type="submit"
          class="btn border border-2 border-dark fw-bold px-3"
          :class="isDisabled ? 'btn-gray' : 'btn-secondary'"
          :disabled="isDisabled"
        >
          Register
        </button>
      </div>

      <!-- <div class="mt-4 underline_hr"><span>or continue with</span></div> -->

      <div class="mt-2 row">
        <!-- <button
          type="button"
          class="col btn btn-secondary fw-bold border border-2 border-dark p-2 mx-3 text-start"
        >
          <span class="p-1 bg-white border border-2 rounded">
            <img src="@/assets/images/google.png" alt="google" width="20" />
          </span>
          Google
        </button>
        <button
          type="button"
          class="col btn btn-secondary fw-bold border border-2 border-dark p-2 mx-3 text-start"
        >
          <span class="p-1 bg-white border border-2 rounded">
            <img src="@/assets/images/facebook.png" alt="facebook" width="20" />
          </span>
          Facebook
        </button> -->

        <p class="mt-4 text-center">
          Already have an account ? <NuxtLink to="/auth/login" class="fw-bolder">Login</NuxtLink>
        </p>
      </div>
    </form>

    <form v-else class="wrapper" @submit.prevent="confirmLocal">
      <div class="mb-4 input-data">
        <input
          type="email"
          class="border border-2 border-primary rounded"
          v-model="confirmForm.email"
          required
        />
        <label>Email</label>
      </div>

      <div class="mb-4 input-data">
        <input
          type="text"
          class="border border-2 border-primary rounded"
          v-model="confirmForm.code"
          required
        />
        <label>Code</label>
      </div>

      <div class="text-center mt-2">
        <button type="submit" class="btn btn-secondary border border-2 border-dark fw-bold px-3">
          Confirm
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { API } from 'aws-amplify';
import { createUser } from '~/graphql/mutations';
const steps = {
  register: 'REGISTER',
  confirm: 'CONFIRM',
};

export default {
  layout: 'introLayout',

  middleware: ['authenticated'],

  data: () => ({
    steps: { ...steps },
    step: steps.register,
    registerForm: {
      email: null,
      password: null,
      first_name: null,
      last_name: null,
      confirmPassword: null,
    },
    confirmForm: {
      email: '',
      code: '',
    },
    userId: null,
    passwordMatched: false,
    isDisabled: true,
    isPasswordVisible: false,
  }),

  watch: {
    registerForm: {
      handler(newValue, oldValue) {
        if (
          newValue.first_name &&
          newValue.last_name &&
          newValue.email &&
          newValue.password &&
          newValue.password === newValue.confirmPassword
        ) {
          this.isDisabled = false;
        }
        // Note: `newValue` will be equal to `oldValue` here
        // on nested mutations as long as the object itself
        // hasn't been replaced.
      },
      deep: true,
    },
  },

  methods: {
    ...mapActions('auth', ['register', 'confirmRegistration', 'login']),

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
        alert('Check your email');
      } catch (err) {
        console.error('err', err);
      }
    },

    async confirmLocal() {
      try {
        const res = await this.confirmRegistration(this.confirmForm);
        if (!res) {
          alert(res.message);
          return;
        }
        const form = { email: this.registerForm.email, password: this.registerForm.password };
        await this.login(form);
        await this.createUserLocal();
        this.$router.push('/dashboard');
        alert('Successfully registered account');
      } catch (err) {
        console.error('err', err);
      }
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
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/auth.scss';
</style>
