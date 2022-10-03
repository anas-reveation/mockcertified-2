<template>
  <div v-if="balanceDetail" class="container">
    <p class="fw-bolder font_size_32">
      Your Account
      <br />
      Balance
    </p>
    <p class="font_size_36">
      <span class="fw-bolder">$</span> <span class="text-muted">{{ balanceDetail }}</span>
    </p>

    <div class="text-center">
      <button @click="getRedirectlink" class="btn border border-2 border-primary text-primary w-75">
        View your payout
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Browser } from '@capacitor/browser';

export default {
  middleware: ['authenticated'],

  data() {
    return {
      balanceDetail: null,
      url: null,
    };
  },

  async mounted() {
    await this.getBalanceLocal();
    const res = await this.redirectExpressDashboard();
    if (res) {
      this.url = res;
    }
  },

  methods: {
    ...mapActions('seller', ['getBalanceDetail', 'redirectExpressDashboard']),

    async getBalanceLocal() {
      const res = await this.getBalanceDetail();
      if (res) {
        this.balanceDetail = parseFloat(res.amount) / 100;
        this.balanceDetail = parseFloat(this.balanceDetail).toFixed(2);
      }
    },

    async getRedirectlink() {
      if (this.url) {
        await Browser.open({ url: this.url });
      }
    },
  },
};
</script>