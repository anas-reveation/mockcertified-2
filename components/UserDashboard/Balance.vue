<template>
  <div>
    <div class="mt-5" v-if="!isFetched">
      <AnimatedPlaceholder class="rounded-3 p-2 me-2" width="300px" />
      <br />
      <AnimatedPlaceholder class="btn mt-4" width="200px" />
    </div>
    <div v-if="balanceDetail && isFetched">
      <div class="mt-5">
        <div>
          <span
            class="text-dark rounded-3 fw-bold p-2 me-2 d-inline-block font_size_24 account_font_size bg_grey"
          >
            Your Account Balance ${{ balanceDetail }}
          </span>
        </div>

        <button @click="getRedirectlink1" class="btn btn-primary text-white mt-4">
          <span class="font_size_16"> View your payout </span>
        </button>
      </div>
    </div>
    <div v-else-if="isFetched">
      <div class="mt-5 text-center">
        <img
          src="@/assets/images/not_connected.svg"
          alt="boy_illustration"
          class="boy_illustration"
        />
        <div class="fw-bolder font_size_24 account_font_size">
          Your Account Is Not Connected $0.00
        </div>

        <NuxtLink to="/protected/create-test" class="btn btn-primary text-white mt-4">
          <span class="font_size_16"> Create a Test </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { Browser } from '@capacitor/browser';

export default {
  middleware: ['authenticated'],

  data() {
    return {
      balanceDetail: null,
      isFetched: false,
      url: null,
    };
  },

  computed: {
    ...mapState(['isLoaderHidden']),
  },

  async mounted() {
    this.setIsLoaderHidden(true);

    await this.getStripeIdStatusLocal1();
    if (this.isAccountActive) {
      await this.getBalanceLocal1();
      const res = await this.redirectExpressDashboard();
      if (res) {
        this.url = res;
      }
    }
    this.isFetched = true;
    this.setIsLoaderHidden(false);
  },

  methods: {
    ...mapActions('seller', ['getBalanceDetail', 'redirectExpressDashboard', 'getStripeIdStatus']),
    ...mapMutations(['setIsLoaderHidden']),

    async getBalanceLocal1() {
      const res = await this.getBalanceDetail();
      if (res) {
        this.balanceDetail = parseFloat(res.amount) / 100;
        this.balanceDetail = parseFloat(this.balanceDetail).toFixed(2);
      }
    },
    async getRedirectlink1() {
      if (this.url) {
        await Browser.open({ url: this.url });
      }
    },
    async getStripeIdStatusLocal1() {
      const res = await this.getStripeIdStatus();
      if (res == 'active') {
        this.isAccountActive = true;
      } else if (res == 'notActive') {
        this.isAccountActive = false;
      }
    },
  },
};
</script>
