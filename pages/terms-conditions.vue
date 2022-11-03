<template>
  <div class="container px-4">
    <!-- <img
      class="position-absolute top-0 end-0 d-sm-none oval_img"
      src="@/assets/images/oval.jpg"
      alt="oval"
    /> -->

    <h1 class="mt-5 mb-4 font_size_36">Terms and Conditions</h1>

    <div class="TC_and_PP_class" v-html="termsConditions"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  head() {
    return {
      title: 'Terms and Conditions',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Before using our application, please carefully read the MockCertified terms and conditions. You agreed to accept all of the terms and conditions listed here by using this website.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Terms and Conditions - Mockcertified App',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Before using our application, please carefully read the MockCertified terms and conditions. You agreed to accept all of the terms and conditions listed here by using this website.',
        },
        {
          name: 'keywords',
          content:
            'Terms and Condition, Mockcertified App, Agreements To Terms, Contact Us, Miscellaneous, User Guidelines',
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
          content: 'Terms and Conditions - Mockcertified App',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Before using our application, please carefully read the MockCertified terms and conditions. You agreed to accept all of the terms and conditions listed here by using this website.',
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

  computed: {
    ...mapState(['termsConditions']),
  },

  async mounted() {
    if (!this.termsConditions) {
      await this.getTC_and_PP();
    }
  },

  methods: {
    ...mapActions(['getTC_and_PP']),
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/css/auth.scss';

.TC_and_PP_class :deep() {
  h2 {
    font-size: 24px;
    font-weight: bold;
  }

  p {
    font-size: 16px;
  }

  ul {
    padding-left: 12px;
  }

  li {
    font-size: 16px;
  }

  .word_wrap {
    word-wrap: break-word;
  }
}
</style>
