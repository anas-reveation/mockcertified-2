<template>
  <div class="container px-4">
    <NavbarLogo />

    <img class="position-absolute top-0 end-0 oval_img" src="@/assets/images/oval.jpg" alt="oval" />
    <h1 class="my-5 text-center font_size_32">Payment Status</h1>
    <div class="text-center">
      <img src="@/assets/images/done_icon.svg" alt="done-icon" />

      <p class="mt-3 font_size_24">Your payment was successful</p>

      <div class="d-lg-flex justify-content-around">
        <NuxtLink class="btn btn-primary text-white width_res mt-3" to="/category">
          <span class="font_size_18"> Buy more tests </span>
        </NuxtLink>
        <NuxtLink
          class="btn btn-white border-2 border-primary text-primary width_res mt-3"
          to="/protected/purchased-test"
        >
          <span class="font_size_18"> Go to purchased test </span>
        </NuxtLink>
      </div>

      <div class="mt-3">
        <p class="text-success font_size_18">Congratulations for purchasing our test !!</p>
        <p class="font_size_18">Get our Mockcertified app in</p>

        <div class="row align-items-center">
          <a :href="playstoreLink" target="_blank" class="col m-1">
            <img src="@/assets/images/GooglePlay.svg" alt="GooglePlayStore" />
          </a>
          <a :href="appleAppStoreLink" target="_blank" class="col m-1">
            <img src="@/assets/images/AppStore.svg" alt="AppStore" />
          </a>
          <a :href="alexaSkillLink" target="_blank" class="col m-1">
            <img src="@/assets/images/alexa2.svg" alt="alexa" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  layout: 'introLayout',

  head() {
    return {
      title: 'Payment Success',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Your transaction was successful. You can access the purchased test and begin your mock test there.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Payment Success - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Your transaction was successful. You can access the purchased test and begin your mock test there.',
        },
        {
          name: 'keywords',
          content: 'Payment Success, Purchased Test, Mockcertified App',
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
          content: 'Payment Success - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Your transaction was successful. You can access the purchased test and begin your mock test there.',
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
      playstoreLink: `https://play.google.com/store/apps/details?id=${process.env.GOOGLE_PLAYSTORE_ID}`,
      appleAppStoreLink: `https://apps.apple.com/in/app/MockCertified/${process.env.APPLE_APP_STORE_ID}`,
      alexaSkillLink: `https://alexa-skills.amazon.com/apis/custom/skills/${process.env.ALEXA_SKILL_ID}/launch`,
    };
  },

  computed: {
    ...mapState('auth', ['isAuthenticated']),
  },

  async mounted() {
    if (this.isAuthenticated) {
      await this.getUserTests();
    }
  },

  methods: {
    ...mapActions('testManagement', ['getUserTests']),
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/auth.scss';
@import '~/assets/css/bootstrapBreakpoint.scss';

@include media-breakpoint-up(sm) {
  .width_res {
    width: 400px !important;
  }
}
</style>
