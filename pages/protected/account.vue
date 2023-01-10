<template>
  <div class="container">
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

        <button @click="getRedirectlink" class="btn btn-primary text-white mt-4">
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

  computed: {
    ...mapState(['isLoaderHidden']),
  },

  async mounted() {
    this.setIsLoaderHidden(true);
    await this.getStripeIdStatusLocal();
    if (this.isAccountActive) {
      await this.getBalanceLocal();
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
    ...mapActions('testManagement', ['accountDelete']),
    ...mapMutations(['setIsLoaderHidden']),

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

.bg_grey {
  background: #f3f3f3;
}

.boy_illustration {
  object-fit: contain;
  height: 230px;
  width: 230px;
}

@include media-breakpoint-down(sm) {
  .account_font_size {
    font-size: 20px;
  }
}

@include media-breakpoint-down(lg) {
  .boy_illustration {
    width: 200px;
  }
}

@include media-breakpoint-up(sm) {
  .width_res {
    width: 100% !important;
  }
}
</style>
