<template>
  <div class="container">
    <div v-if="balanceDetail && isFetched">
      <div class="d-sm-flex align-items-center justify-content-around mt-3">
        <div class="">
          <p class="fw-bolder font_size_32">
            Your Account
            <br class="d-sm-none" />
            Balance
          </p>
          <p class="font_size_36">
            <span class="fw-bolder">$</span> <span class="text-muted">{{ balanceDetail }}</span>
          </p>
        </div>

        <div class="text-center">
          <button
            @click="getRedirectlink"
            class="btn border border-2 border-primary text-primary w-75 width_res"
          >
            View your payout
          </button>
        </div>
      </div>
      <!-- <div class="text-center mt-3">
      <button class="btn btn-danger border border-dark" type="button" @click="accountDeleteLocal">
        Delete Account
      </button>
    </div> -->
    </div>
    <div v-else-if="isFetched">
      <div class="d-sm-flex align-items-center justify-content-around mt-3">
        <div class="">
          <p class="fw-bolder font_size_32">
            Your Account Is
            <br class="d-sm-none" />
            Not Connected
          </p>
          <p class="font_size_36">
            <span class="fw-bolder">$</span> <span class="text-muted">0.00</span>
          </p>
        </div>

        <div class="text-center">
          <NuxtLink
            to="/protected/create-test"
            class="btn border border-2 border-primary text-primary w-75 width_res"
          >
            Create a Test
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Browser } from '@capacitor/browser';

export default {
  middleware: ['authenticated'],

  head() {
    return {
      title: 'Check Your Account Balance',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'View all your account balance of Mockcertified application.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Check Your Account Balance - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'View all your account balance of Mockcertified application.',
        },
        {
          name: 'keywords',
          content: 'Account Balance, View your payout',
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
          content: 'Check Your Account Balance - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'View all your account balance of Mockcertified application.',
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

  data() {
    return {
      balanceDetail: null,
      url: null,
      isAccountActive: null,
      isFetched: false,
    };
  },

  async mounted() {
    await this.getStripeIdStatusLocal();
    if (this.isAccountActive) {
      await this.getBalanceLocal();
      const res = await this.redirectExpressDashboard();
      if (res) {
        this.url = res;
      }
    }
    this.isFetched = true;
  },

  methods: {
    ...mapActions('seller', ['getBalanceDetail', 'redirectExpressDashboard', 'getStripeIdStatus']),
    ...mapActions('testManagement', ['accountDelete']),

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

    async accountDeleteLocal() {
      this.$swal
        .fire({
          title: 'Are you sure?',
          showCancelButton: true,
          confirmButtonText: 'Yes',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.accountDelete();
          }
        });
    },

    async getStripeIdStatusLocal() {
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

<style scoped lang="scss">
@import '~bootstrap/scss/_functions.scss';
@import '~bootstrap/scss/_variables.scss';
@import '~bootstrap/scss/mixins/_breakpoints';

@include media-breakpoint-up(sm) {
  .width_res {
    width: 100% !important;
  }
}
</style>
