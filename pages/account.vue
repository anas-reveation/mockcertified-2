<template>
  <div v-if="balanceDetail" class="container">
    <p class="fw-bolder font_size_32">
      Your Account
      <br />
      Balance
    </p>
    <span>Click on the button to know your current balance</span>

    <p class="font_size_36">
      <span class="fw-bolder">$</span> <span class="text-muted">{{ balanceDetail.amount }}</span>
    </p>

    <div class="text-center">
      <button class="btn border border-2 border-primary text-primary w-75">View your Payout</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  middleware: ['authenticated'],

  data() {
    return {
      balanceDetail: null,
    };
  },

  async mounted() {
    await this.getBalanceLocal();
  },

  methods: {
    ...mapActions('seller', ['getBalanceDetail']),

    async getBalanceLocal() {
      const res = await this.getBalanceDetail();
      if (res) {
        this.balanceDetail = res;
      }
    },
  },
};
</script>
