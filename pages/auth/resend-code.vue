<template>
  <div class="container px-4">
    <NavbarLogo class="mt-4" />
    <form v-if="isFetched" class="wrapper width_res" @submit.prevent="confirmLocal">
      <h1 class="mt-5 mb-4 font_size_36">
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
          placeholder="Enter the Code"
          class="border border-2 border-primary rounded"
          v-model="confirmForm.code"
          required
        />
      </div>

      <div class="mt-2">
        <button type="submit" class="btn btn-primary text-white fw-bold px-3 login_btn_width">
          Confirm
        </button>
      </div>
      <div class="mt-2">
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
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  layout: 'introLayout',
  data: () => ({
    confirmForm: {
      email: '',
      code: '',
    },
    isFetched: false,
  }),

  computed: {
    ...mapState('auth', ['unconfirmedUserEmail']),
  },

  mounted() {
    // this.confirmForm.email = this.unconfirmedUserEmail;
    // if (!this.confirmForm.email) {
    //   this.$router.push('/auth/login');
    //   return;
    // }
    this.isFetched = true;
  },

  methods: {
    ...mapActions('auth', ['confirmRegistration', 'resendConfirmationCode']),
    ...mapMutations('auth', ['setUnconfirmedUserEmail']),

    async confirmLocal() {
      const res = await this.confirmRegistration(this.confirmForm);
      if (res) {
        this.setUnconfirmedUserEmail(null);
        this.$router.push('/auth/login');
      }
    },

    async resendCode() {
      await this.resendConfirmationCode(this.confirmForm.email);
    },
  },
};
</script>
