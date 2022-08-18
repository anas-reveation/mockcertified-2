<template>
  <div>
    <div class="container">
      <img
        class="position-absolute top-0 end-0 oval_img"
        src="@/assets/images/oval.jpg"
        alt="oval"
      />
      <h1 class="my-5 fw-bold font_size">
        Rest
        <br />
        Password
      </h1>
      <p>
        Enter the email associated with your account and we will send a verification code to reset
        your password
      </p>

      <form v-if="pageCount === 0" @submit.prevent="resetPassword">
        <label for="email" class="fw-bolder my-3 font_size2"> Email address: </label>
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
          <button type="submit" class="btn btn-secondary border border-2 border-dark w-50">
            Send
          </button>
        </div>
      </form>

      <!-- PAGE 2 -->
      <form v-else class="wrapper" @submit.prevent="newPasswordSubmit">
        <div class="mb-4 input-data">
          <input
            type="text"
            class="border border-2 border-primary rounded"
            v-model="code"
            required
          />
          <label>Code</label>
        </div>

        <div class="mb-4 input-data">
          <input
            type="password"
            class="border border-2 border-primary rounded"
            v-model="password"
            @input="checkPasswordMatch"
            required
          />
          <label>Enter new password</label>
        </div>

        <div class="mb-4 input-data">
          <input
            type="password"
            class="border border-2 border-primary rounded"
            :class="!passwordMatched && 'border-danger'"
            v-model="confirmPassword"
            @input="checkPasswordMatch"
            required
          />
          <label>Confirm new Password</label>
        </div>

        <div class="text-center mt-2">
          <button
            type="submit"
            class="btn border border-2 border-dark fw-bold px-3"
            :class="!code || !password || !confirmPassword ? 'btn-gray' : 'btn-secondary'"
            :disabled="!code || !password || !confirmPassword"
          >
            Rest Password
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import { mapMutations } from 'vuex';

export default {
  layout: 'introLayout',

  middleware: ['authenticated'],

  data: () => ({
    pageCount: 0,
    email: '',
    password: null,
    confirmPassword: null,
    code: null,
    passwordMatched: false,
  }),

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
        alert('Check your email');
        this.pageCount += 1;
      } catch (err) {
        this.SET_LOADER(false);
        console.error('ERR', err);
      }
    },

    async newPasswordSubmit() {
      this.SET_LOADER(true);
      // Collect confirmation code and new password, then
      try {
        await Auth.forgotPasswordSubmit(this.email, this.code, this.password);
        this.SET_LOADER(false);
        alert('Password successfully changed');
        this.$router.push('/auth/login');
      } catch (err) {
        this.SET_LOADER(false);
        console.error('ERR', err);
        alert('Something went wrong please try later');
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/auth.scss';

.font_size {
  font-size: 36px;
}

.font_size2 {
  font-size: 24px;
}
</style>

<style scoped>
/* .btn-color {
  background-color: #11a49b !important;
  color: white;
}
.background {
  background: rgb(226, 226, 226);
}
a {
  text-decoration: none;
  color: #11a49b;
}
.padding-top {
  padding-top: 30%;
}
.spinner-bg {
  background: #656565 !important;
} */
</style>
